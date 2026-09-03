"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Trophy, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VocabWord } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { useAuth } from "@/hooks/use-auth";

type QuizMode = "han-to-vi" | "vi-to-han" | "pinyin-to-han" | "pinyin-to-vi" | "fill-blank";
type QuizDifficulty = "easy" | "normal" | "hard";

// Hệ số điểm theo độ khó:
// - easy: 0.5X (chỉ Pinyin→Nghĩa, dễ nhất - đọc pinyin chọn nghĩa)
// - normal: 1X (mix 3 dạng: Hán→Nghĩa, Nghĩa→Hán, Pinyin→Hán)
// - hard: 2X (chỉ dạng điền chỗ trống, khó nhất)
function getDifficultyMultiplier(difficulty: QuizDifficulty): number {
  if (difficulty === "easy") return 0.5;
  if (difficulty === "hard") return 2;
  return 1;
}

function getModesForDifficulty(difficulty: QuizDifficulty): QuizMode[] {
  if (difficulty === "easy") return ["pinyin-to-vi"];
  if (difficulty === "hard") return ["fill-blank"];
  return ["han-to-vi", "vi-to-han", "pinyin-to-han"]; // normal
}

interface QuizProps {
  questionCount?: number;
  onQuizComplete?: (score: number, total: number) => void;
  onScoreComputed?: (points: number, detail: { correct: number; total: number; time: number }) => void;
}

interface Question {
  word: VocabWord;
  options: string[];
  correct: string;
  mode: QuizMode;
  blankSentence?: string;
  blankPinyin?: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUESTION_COUNT = 10;
const TIME_LIMIT = 15; // giây / câu

// Tính điểm quiz - Phương án 1:
// - Chỉ câu đúng mới tính điểm (correct × 100)
// - Thời gian nhanh được bonus (trừ điểm theo thời gian)
// - Perfect (đúng hết) +200 bonus
// - Câu sai = 0 điểm (không tính thời gian)
// - Nhân hệ số độ khó (0.5X / 1X / 2X)
function computeQuizPoints(correct: number, total: number, totalSeconds: number, difficulty: QuizDifficulty = "normal"): number {
  const perfectBonus = correct === total ? 200 : 0;
  const raw = Math.max(0, correct * 100 - totalSeconds * 3 + perfectBonus);
  const multiplier = getDifficultyMultiplier(difficulty);
  return Math.floor(raw * multiplier * 10) / 10;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const zh = voices.find(v => v.lang.startsWith("zh"));
  if (zh) utter.voice = zh;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export function Quiz({ questionCount = QUESTION_COUNT, onQuizComplete, onScoreComputed }: QuizProps) {
  const { user, loading: authLoading, submitScore } = useAuth();
  const vocab = useVocab();
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("normal");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const submittedRef = useRef(false);

  const generateQuiz = useCallback(() => {
    let poolWords = vocab;
    if (difficulty === "hard") {
      poolWords = vocab.filter(w => {
        const ex = w.example || "";
        return ex && ex.includes(w.han) && ex.length > w.han.length;
      });
    }
    const pool = shuffle(poolWords).slice(0, Math.min(questionCount, poolWords.length));
    const modes = getModesForDifficulty(difficulty);
    const qs: Question[] = pool.map(word => {
      const mode = modes[Math.floor(Math.random() * modes.length)];
      // Lấy distractors nhưng loại bỏ những từ có đáp án trùng với câu hỏi
      // Lọc KÉP: cả Hán tự trùng VÀ nghĩa trùng đều bị loại
      const allDistractors = vocab.filter(w => {
        if (w.id === word.id) return false;
        // Luôn loại bỏ từ có Hán tự trùng (để không có đáp án y hệt câu hỏi)
        if (w.han === word.han) return false;
        // Luôn loại bỏ từ có nghĩa trùng (để không có đáp án cùng nghĩa)
        if (w.meaning === word.meaning) return false;
        return true;
      });
      const distractors = shuffle(allDistractors).slice(0, 3);
      let correct: string;
      let options: string[];
      let blankSentence: string | undefined;
      let blankPinyin: string | undefined;
      if (mode === "han-to-vi") {
        correct = word.meaning;
        options = shuffle([correct, ...distractors.map(d => d.meaning)]);
      } else if (mode === "vi-to-han") {
        correct = word.han;
        options = shuffle([correct, ...distractors.map(d => d.han)]);
      } else if (mode === "pinyin-to-vi") {
        correct = word.meaning;
        options = shuffle([correct, ...distractors.map(d => d.meaning)]);
      } else if (mode === "fill-blank") {
        correct = word.han;
        options = shuffle([correct, ...distractors.map(d => d.han)]);
        const ex = word.example || "";
        if (ex && ex.includes(word.han)) {
          blankSentence = ex.replace(word.han, "＿＿＿");
          blankPinyin = word.examplePinyin || "";
        } else {
          blankSentence = undefined;
        }
      } else {
        correct = word.han;
        options = shuffle([correct, ...distractors.map(d => d.han)]);
      }
      // Deduplicate options - đảm bảo 4 đáp án khác nhau hoàn toàn
      const uniqueOptions = [...new Set(options)];
      // Nếu không đủ 4 options, bổ sung thêm
      while (uniqueOptions.length < 4) {
        const extra = shuffle(vocab.filter(w => {
          if (w.id === word.id) return false;
          if (w.han === word.han) return false;
          if (w.meaning === word.meaning) return false;
          return true;
        })).find(w => {
          if (mode === "han-to-vi" || mode === "pinyin-to-vi") {
            return !uniqueOptions.includes(w.meaning);
          } else {
            return !uniqueOptions.includes(w.han);
          }
        });
        if (extra) {
          if (mode === "han-to-vi" || mode === "pinyin-to-vi") {
            uniqueOptions.push(extra.meaning);
          } else {
            uniqueOptions.push(extra.han);
          }
        } else break;
      }
      options = shuffle(uniqueOptions);
      return { word, options, correct, mode, blankSentence, blankPinyin };
    });
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnsweredCount(0);
    setTimeLeft(TIME_LIMIT);
    setTotalSeconds(0);
    completedRef.current = false;
    submittedRef.current = false;
  }, [questionCount, vocab, difficulty]);

  const start = () => {
    generateQuiz();
    startTimeRef.current = Date.now();
    setTotalSeconds(0);
    setPhase("playing");
  };

  // Cập nhật totalSeconds mỗi 10ms
  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setTotalSeconds((Date.now() - startTimeRef.current) / 1000);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [phase]);

  // Timer đếm ngược mỗi câu
  useEffect(() => {
    if (phase !== "playing") return;
    if (selected !== null) return;
    if (timeLeft <= 0) {
      setSelected("__timeout__");
      return;
    }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, selected, timeLeft]);

  // Phím Enter để qua câu tiếp theo
  useEffect(() => {
    if (phase !== "playing" || selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, selected, current, questions.length]);

  const handleSelect = (opt: string) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === questions[current].correct) {
      setScore(s => s + 1);
    }
    setAnsweredCount(c => c + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
  };

  useEffect(() => {
    if (phase === "result" && !completedRef.current && questions.length > 0) {
      completedRef.current = true;
      onQuizComplete?.(score, questions.length);
    }
    if (phase !== "result") {
      completedRef.current = false;
    }
  }, [phase, score, questions.length, onQuizComplete]);

  useEffect(() => {
    if (phase !== "result" || questions.length === 0) return;
    if (authLoading) return;
    if (submittedRef.current) return;
    if (!user) return;

    submittedRef.current = true;
    const points = computeQuizPoints(score, questions.length, totalSeconds, difficulty);
    const detail = { correct: score, total: questions.length, time: totalSeconds, difficulty };
    submitScore("quiz", points, detail).catch(() => {});
    onScoreComputed?.(points, detail);
  }, [phase, questions.length, authLoading, user, score, totalSeconds, difficulty, submitScore, onScoreComputed]);

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 border-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
          <Trophy className="h-10 w-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Quiz trắc nghiệm</h3>
          <p className="text-muted-foreground max-w-md">
            {questionCount} câu hỏi • {TIME_LIMIT} giây/câu • Chọn độ khó bên dưới
          </p>
        </div>

        {/* Difficulty picker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-md">
          {([
            { id: "easy", label: "Dễ", desc: "Pinyin → Nghĩa (đọc pinyin chọn nghĩa) • 0.5X điểm", emoji: "🟢" },
            { id: "normal", label: "Thường", desc: "Mix 3 dạng: Hán→Nghĩa, Nghĩa→Hán, Pinyin→Hán • 1X điểm", emoji: "🟡" },
            { id: "hard", label: "Khó", desc: "Điền chỗ trống trong câu • 2X điểm", emoji: "🔴" },
          ] as { id: QuizDifficulty; label: string; desc: string; emoji: string }[]).map(opt => (
            <button
              key={opt.id}
              onClick={() => setDifficulty(opt.id)}
              className={`p-3 rounded-xl text-left transition-all border-2 ${
                difficulty === opt.id
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-violet-600 shadow"
                  : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-sm"
              }`}
            >
              <div className="font-semibold text-sm flex items-center gap-1">
                <span>{opt.emoji}</span> {opt.label}
              </div>
              <div className={`text-xs mt-1 ${difficulty === opt.id ? "text-white/80" : "text-muted-foreground"}`}>
                {opt.desc}
              </div>
            </button>
          ))}
        </div>
        {!user && !authLoading && (
          <div className="w-full p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-sm flex items-center gap-2 justify-center">
            <span>⚠️</span>
            <span>Bạn chưa đăng nhập. Điểm sẽ <b>không lưu</b> lên bảng xếp hạng.</span>
          </div>
        )}
        <Button size="lg" onClick={start} className="gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90">
          Bắt đầu quiz <RotateCcw className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  // ===== RESULT =====
  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const title = pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Tốt lắm!" : pct >= 40 ? "Cố lên!" : "Cần luyện thêm!";
    const points = computeQuizPoints(score, questions.length, totalSeconds, difficulty);
    const perfect = score === questions.length;
    const multiplier = getDifficultyMultiplier(difficulty);
    const multiplierLabel = multiplier === 2 ? "2X" : multiplier === 0.5 ? "0.5X" : "1X";
    const difficultyLabel = difficulty === "easy" ? "Dễ" : difficulty === "hard" ? "Khó" : "Thường";
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-0">
        <div className="text-7xl">{emoji}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground">Bạn đã trả lời đúng</p>
        </div>
        <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          {score}/{questions.length}
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác • {totalSeconds.toFixed(1)}s</Badge>

        <div className="w-full p-4 rounded-2xl bg-white/70 border border-emerald-200">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Điểm chăm chỉ nhận được</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            +{points.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {perfect ? "Perfect bonus +200 • " : ""}
            Hệ số {multiplierLabel} (độ khó {difficultyLabel}) • {user ? "Đã lưu vào bảng xếp hạng 🎉" : "Đăng nhập để lưu điểm lên bảng xếp hạng"}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={start} className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <RotateCcw className="h-4 w-4" /> Làm lại
          </Button>
          <Button variant="outline" onClick={() => setPhase("intro")}>
            Về trang quiz
          </Button>
        </div>
      </Card>
    );
  }

  // ===== PLAYING =====
  const q = questions[current];
  if (!q) return null;
  const effectiveMode = q.mode === "fill-blank" && !q.blankSentence ? "han-to-vi" : q.mode;

  const promptLabel = effectiveMode === "han-to-vi"
    ? "Chọn nghĩa tiếng Việt"
    : effectiveMode === "vi-to-han"
    ? "Chọn Hán tự đúng"
    : effectiveMode === "pinyin-to-han"
    ? "Chọn Hán tự theo pinyin"
    : effectiveMode === "pinyin-to-vi"
    ? "Đọc pinyin chọn nghĩa tiếng Việt"
    : "Chọn Hán tự điền vào chỗ trống";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Badge variant="secondary">Câu {current + 1} / {questions.length}</Badge>
        <div className="flex items-center gap-2">
          <Badge className="gap-1 bg-amber-100 text-amber-700 border-0 hover:bg-amber-100">
            <Clock className="h-3.5 w-3.5" /> {timeLeft}s
          </Badge>
          <Badge className="gap-1 bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-100">
            <Trophy className="h-3.5 w-3.5" /> {score}
          </Badge>
        </div>
      </div>

      <Progress value={(timeLeft / TIME_LIMIT) * 100} className="h-1.5" />

      {/* Question card */}
      <Card className="p-6 md:p-8 flex flex-col items-center gap-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 border-2 border-violet-100">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{promptLabel}</div>
        {effectiveMode === "fill-blank" && q.blankSentence ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl md:text-4xl font-bold text-center leading-relaxed text-foreground">
              {q.blankSentence}
            </div>
            <Button variant="ghost" size="icon" onClick={() => speak(q.word.example || q.word.han)}>
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-5xl md:text-6xl font-bold text-foreground">
              {effectiveMode === "han-to-vi" && q.word.han}
              {effectiveMode === "vi-to-han" && q.word.meaning}
              {effectiveMode === "pinyin-to-han" && <span className="italic">{q.word.pinyin}</span>}
              {effectiveMode === "pinyin-to-vi" && <span className="italic">{q.word.pinyin}</span>}
            </div>
            {(effectiveMode === "han-to-vi" || effectiveMode === "pinyin-to-vi") && (
              <Button variant="ghost" size="icon" onClick={() => speak(q.word.han)}>
                <Volume2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        {effectiveMode === "vi-to-han" && (
          <div className="text-sm text-muted-foreground">{q.word.emoji} {q.word.pos}</div>
        )}
      </Card>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map(opt => {
          const isCorrect = opt === q.correct;
          const isSelected = opt === selected;
          let cls = "border-2 hover:border-violet-300 hover:bg-violet-50 transition-all justify-start text-left";
          if (selected !== null) {
            if (isCorrect) cls = "border-2 border-emerald-400 bg-emerald-50 text-emerald-700 justify-start text-left";
            else if (isSelected) cls = "border-2 border-rose-400 bg-rose-50 text-rose-700 justify-start text-left";
            else cls = "border-2 border-muted opacity-60 justify-start text-left";
          }
          return (
            <Button
              key={opt}
              variant="outline"
              className={`h-auto py-4 px-4 text-lg ${cls}`}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
            >
              <span className="flex-1">{opt}</span>
              {selected !== null && isCorrect && <Check className="h-5 w-5" />}
              {selected !== null && isSelected && !isCorrect && <X className="h-5 w-5" />}
            </Button>
          );
        })}
      </div>

      {/* Next */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button size="lg" onClick={next} className="gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
            {current + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo (Enter)"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

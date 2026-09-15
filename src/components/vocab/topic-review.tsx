"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Trophy, RotateCcw, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VocabWord, TopicId, getTopic } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { useAuth } from "@/hooks/use-auth";
import { TopicLeaderboard } from "./topic-leaderboard";

interface TopicReviewProps {
  topicId: TopicId;
  onExit: () => void;
  onServerSubmit?: (points: number, detail: { correct: number; total: number; topic: string }) => Promise<unknown>;
  onComplete?: (points: number) => void;
}

type QuizMode = "han-to-pinyin" | "han-to-meaning" | "meaning-to-han" | "fill-blank";

interface Question {
  word: VocabWord;
  options: string[];
  correct: string;
  mode: QuizMode;
  blankSentence?: string;
  blankPinyin?: string;
}

const QUESTION_COUNT = 10;
const TIME_LIMIT = 20; // giây/câu

// Phương án 1: Chỉ câu đúng mới tính điểm, câu sai = 0
function computeReviewPoints(correct: number, total: number, totalSeconds: number): number {
  const perfectBonus = correct === total ? 200 : 0;
  const raw = Math.max(0, correct * 100 - totalSeconds * 3 + perfectBonus);
  return Math.floor(raw * 10) / 10;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

export function TopicReview({ topicId, onExit, onServerSubmit, onComplete }: TopicReviewProps) {
  const { user, loading: authLoading, submitScore } = useAuth();
  const vocab = useVocab();
  const topic = getTopic(topicId);
  const allTopicWords = vocab.filter(w => w.topic === topicId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const submittedRef = useRef(false);
  const [lbRefresh, setLbRefresh] = useState(0);

  // Wrapper exit: reset state trước khi gọi onExit để lần sau mở lại không bị lỗi
  const handleExit = useCallback(() => {
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setTotalSeconds(0);
    startTimeRef.current = null;
    setPhase("intro");
    completedRef.current = false;
    submittedRef.current = false;
    onExit();
  }, [onExit]);

  const generateQuiz = useCallback(() => {
    if (allTopicWords.length === 0) return;

    // Lấy pool = từ trong chủ đề. Nếu ít hơn QUESTION_COUNT, ghép thêm từ random khác
    let pool = shuffle(allTopicWords);
    if (pool.length < QUESTION_COUNT) {
      const others = shuffle(vocab.filter(w => w.topic !== topicId)).slice(0, QUESTION_COUNT - pool.length);
      pool = shuffle([...pool, ...others]);
    }
    pool = pool.slice(0, Math.min(QUESTION_COUNT, pool.length));

    const modes: QuizMode[] = ["han-to-pinyin", "han-to-meaning", "meaning-to-han", "fill-blank"];
    const qs: Question[] = pool.map(word => {
      const mode = modes[Math.floor(Math.random() * modes.length)];
      // Lọc distractors: loại bỏ từ có đáp án trùng với câu hỏi
      // Lọc KÉP: cả Hán tự trùng VÀ nghĩa trùng đều bị loại
      const allDistractors = vocab.filter(w => {
        if (w.id === word.id) return false;
        // Luôn loại bỏ từ có Hán tự trùng
        if (w.han === word.han) return false;
        // Luôn loại bỏ từ có nghĩa trùng
        if (w.meaning === word.meaning) return false;
        // Loại bỏ từ có pinyin trùng (cho mode han-to-pinyin)
        if (mode === "han-to-pinyin" && w.pinyin === word.pinyin) return false;
        // Loại bỏ từ có Hán tự bao chứa nhau (substring)
        // vd: "他们" chứa "他" → loại, để chỉ có 1 đáp án đúng
        if (mode === "fill-blank" || mode === "meaning-to-han") {
          if (w.han.includes(word.han) || word.han.includes(w.han)) return false;
        }
        return true;
      });
      const distractors = shuffle(allDistractors).slice(0, 3);
      let correct: string;
      let options: string[];
      let blankSentence: string | undefined;
      let blankPinyin: string | undefined;
      if (mode === "han-to-pinyin") {
        correct = word.pinyin;
        options = shuffle([correct, ...distractors.map(d => d.pinyin)]);
      } else if (mode === "han-to-meaning") {
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
      while (uniqueOptions.length < 4) {
        const extra = shuffle(vocab.filter(w => {
          if (w.id === word.id) return false;
          if (w.han === word.han) return false;
          if (w.meaning === word.meaning) return false;
          if (mode === "han-to-pinyin" && w.pinyin === word.pinyin) return false;
          // Loại bỏ từ có Hán tự bao chứa nhau (substring)
          if (mode === "fill-blank" || mode === "meaning-to-han") {
            if (w.han.includes(word.han) || word.han.includes(w.han)) return false;
          }
          return true;
        })).find(w => {
          if (mode === "han-to-pinyin") return !uniqueOptions.includes(w.pinyin);
          if (mode === "han-to-meaning") return !uniqueOptions.includes(w.meaning);
          return !uniqueOptions.includes(w.han);
        });
        if (extra) {
          if (mode === "han-to-pinyin") uniqueOptions.push(extra.pinyin);
          else if (mode === "han-to-meaning") uniqueOptions.push(extra.meaning);
          else uniqueOptions.push(extra.han);
        } else break;
      }
      options = shuffle(uniqueOptions);
      return { word, options, correct, mode, blankSentence, blankPinyin };
    });
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setTotalSeconds(0);
    completedRef.current = false;
    submittedRef.current = false;
  }, [allTopicWords, topicId, vocab]);

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

  // Submit lên server khi vào phase result
  useEffect(() => {
    if (phase !== "result" || questions.length === 0) return;
    if (authLoading) return;
    if (completedRef.current) return;
    completedRef.current = true;

    const points = computeReviewPoints(score, questions.length, totalSeconds);
    const detail = { correct: score, total: questions.length, time: totalSeconds, topic: topicId };
    onComplete?.(points);
    setLbRefresh(k => k + 1);
    if (user && onServerSubmit) {
      // Submit qua prop callback (sẽ tự gọi submitScore)
      onServerSubmit(points, detail).catch(() => {});
    } else if (user) {
      submitScore("flashcard_review", points, detail).catch(() => {});
    }
  }, [phase, questions.length, authLoading, user, score, totalSeconds, topicId, onServerSubmit, onComplete, submitScore]);

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-indigo-100 via-violet-50 to-fuchsia-100 border-0">
        <button
          onClick={handleExit}
          className="self-start text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </button>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg text-4xl">
          {topic.emoji}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Ôn tập: {topic.name}
          </h3>
          <p className="text-muted-foreground max-w-md">
            {QUESTION_COUNT} câu trắc nghiệm • {TIME_LIMIT}s/câu • 4 dạng: Hán→Pinyin, Hán→Nghĩa, Nghĩa→Hán, Điền chỗ trống
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-sm">
            <Trophy className="h-4 w-4" />
            Càng đúng nhiều & làm nhanh càng nhiều điểm • Perfect +200
          </div>
        </div>
        {!user && !authLoading && (
          <div className="w-full p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-sm flex items-center gap-2 justify-center">
            <span>⚠️</span>
            <span>Bạn chưa đăng nhập. Điểm sẽ <b>không lưu</b> lên bảng xếp hạng.</span>
          </div>
        )}
        <Button size="lg" onClick={start} className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90">
          Bắt đầu ôn tập <RotateCcw className="h-4 w-4" />
        </Button>

        {/* Bảng xếp hạng chủ đề này */}
        <div className="w-full">
          <TopicLeaderboard topicId={topicId} refreshKey={lbRefresh} />
        </div>
      </Card>
    );
  }

  // ===== RESULT =====
  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const points = computeReviewPoints(score, questions.length, totalSeconds);
    const perfect = score === questions.length;
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const title = pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Tốt lắm!" : pct >= 40 ? "Cố lên!" : "Cần luyện thêm!";
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
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác • {totalSeconds.toFixed(1)}s • {topic.emoji} {topic.name}</Badge>

        <div className="w-full p-4 rounded-2xl bg-white/70 border border-emerald-200">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Điểm chăm chỉ nhận được</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            +{points.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {perfect ? "Perfect bonus +200 • " : ""}
            {user ? "Đã lưu vào bảng xếp hạng 🎉" : "Đăng nhập để lưu điểm"}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={start} className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <RotateCcw className="h-4 w-4" /> Làm lại
          </Button>
          <Button variant="outline" onClick={handleExit} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Button>
        </div>

        {/* Bảng xếp hạng chủ đề này */}
        <div className="w-full">
          <TopicLeaderboard topicId={topicId} refreshKey={lbRefresh} />
        </div>
      </Card>
    );
  }

  // ===== PLAYING =====
  const q = questions[current];
  if (!q) return null;
  const effectiveMode = q.mode === "fill-blank" && !q.blankSentence ? "han-to-meaning" : q.mode;
  const promptLabel = effectiveMode === "han-to-pinyin"
    ? "Chọn phiên âm pinyin"
    : effectiveMode === "han-to-meaning"
    ? "Chọn nghĩa tiếng Việt"
    : effectiveMode === "meaning-to-han"
    ? "Chọn Hán tự"
    : "Chọn Hán tự điền vào chỗ trống";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleExit}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Thoát
        </button>
        <Badge variant="secondary">Câu {current + 1} / {questions.length}</Badge>
        <div className="flex items-center gap-2">
          <Badge className="gap-1 bg-indigo-100 text-indigo-700 border-0 hover:bg-indigo-100">
            {topic.emoji} {topic.name}
          </Badge>
          <Badge className="gap-1 bg-amber-100 text-amber-700 border-0 hover:bg-amber-100">
            <Clock className="h-3.5 w-3.5" /> {timeLeft}s
          </Badge>
          <Badge className="gap-1 bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-100">
            <Trophy className="h-3.5 w-3.5" /> {score} đúng
          </Badge>
        </div>
      </div>

      <Progress value={(timeLeft / TIME_LIMIT) * 100} className="h-1.5" />

      {/* Question */}
      <Card className="p-6 md:p-8 flex flex-col items-center gap-4 bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-100">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{promptLabel}</div>
        {effectiveMode === "fill-blank" && q.blankSentence ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl md:text-4xl font-bold text-center leading-relaxed">
              {q.blankSentence}
            </div>
            <Button variant="ghost" size="icon" onClick={() => speak(q.word.example || q.word.han)}>
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-5xl md:text-6xl font-bold">
              {effectiveMode === "han-to-pinyin" && q.word.han}
              {effectiveMode === "han-to-meaning" && q.word.han}
              {effectiveMode === "meaning-to-han" && q.word.meaning}
            </div>
            {(effectiveMode === "han-to-pinyin" || effectiveMode === "han-to-meaning") && (
              <Button variant="ghost" size="icon" onClick={() => speak(q.word.han)}>
                <Volume2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        {effectiveMode === "meaning-to-han" && (
          <div className="text-sm text-muted-foreground">{q.word.emoji} {q.word.pos}</div>
        )}
      </Card>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map(opt => {
          const isCorrect = opt === q.correct;
          const isSelected = opt === selected;
          let cls = "border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all justify-start text-left";
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
          className="flex justify-end"
        >
          <Button onClick={next} className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
            {current + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

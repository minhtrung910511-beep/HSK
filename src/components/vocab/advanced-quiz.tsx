"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Trophy, RotateCcw, Volume2, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VocabWord } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { useAuth } from "@/hooks/use-auth";

type QuizMode = "fill-blank";

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
const TIME_LIMIT = 20;
const POINTS_MULTIPLIER = 2;

// Phương án 1: Chỉ câu đúng mới tính điểm, câu sai = 0. Sau đó nhân 2X
function computeAdvancedPoints(correct: number, total: number, totalSeconds: number): number {
  const perfectBonus = correct === total ? 200 : 0;
  const raw = Math.max(0, correct * 100 - totalSeconds * 3 + perfectBonus);
  const base = Math.floor(raw * 10) / 10;
  return Math.floor(base * POINTS_MULTIPLIER * 10) / 10;
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

export function AdvancedQuiz({ questionCount = QUESTION_COUNT, onQuizComplete, onScoreComputed }: QuizProps) {
  const { user, loading: authLoading, submitScore } = useAuth();
  const vocab = useVocab();
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
    const eligibleWords = vocab.filter(w => {
      const ex = w.example || "";
      return ex && ex.includes(w.han) && ex.length > w.han.length;
    });
    const pool = shuffle(eligibleWords).slice(0, Math.min(questionCount, eligibleWords.length));

    const qs: Question[] = pool.map(word => {
      const distractors = shuffle(vocab.filter(w => w.id !== word.id)).slice(0, 3);
      const correct = word.han;
      const options = shuffle([correct, ...distractors.map(d => d.han)]);
      const blankSentence = (word.example || "").replace(word.han, "＿＿＿");
      const blankPinyin = word.examplePinyin || "";
      return { word, options, correct, mode: "fill-blank", blankSentence, blankPinyin };
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
  }, [questionCount, vocab]);

  const start = () => {
    generateQuiz();
    startTimeRef.current = Date.now();
    setTotalSeconds(0);
    setPhase("playing");
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setTotalSeconds((Date.now() - startTimeRef.current) / 1000);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [phase]);

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
    const points = computeAdvancedPoints(score, questions.length, totalSeconds);
    const detail = { correct: score, total: questions.length, time: totalSeconds, mode: "advanced" };
    submitScore("advanced_quiz", points, detail).catch(() => {});
    onScoreComputed?.(points, detail);
  }, [phase, questions.length, authLoading, user, score, totalSeconds, submitScore, onScoreComputed]);

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 border-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Zap className="h-10 w-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            Quiz Nâng Cao <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white">2X ĐIỂM</span>
          </h3>
          <p className="text-muted-foreground max-w-md">
            {questionCount} câu hỏi • {TIME_LIMIT} giây/câu • Chỉ dạng điền Hán tự vào chỗ trống trong câu
          </p>
          <p className="text-sm text-rose-600 font-medium mt-2">
            ⚡ Khó hơn • Điểm nhân đôi so với quiz thường
          </p>
        </div>
        {!user && !authLoading && (
          <div className="w-full p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-sm flex items-center gap-2 justify-center">
            <span>⚠️</span>
            <span>Bạn chưa đăng nhập. Điểm sẽ <b>không lưu</b> lên bảng xếp hạng.</span>
          </div>
        )}
        <Button size="lg" onClick={start} className="gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:opacity-90">
          Bắt đầu Quiz Nâng Cao <RotateCcw className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  // ===== RESULT =====
  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const title = pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Tốt lắm!" : pct >= 40 ? "Cố lên!" : "Cần luyện thêm!";
    const points = computeAdvancedPoints(score, questions.length, totalSeconds);
    const perfect = score === questions.length;
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 border-0">
        <div className="text-7xl">{emoji}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground">Bạn đã trả lời đúng</p>
        </div>
        <div className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
          {score}/{questions.length}
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác • {totalSeconds.toFixed(1)}s</Badge>

        <div className="w-full p-4 rounded-2xl bg-white/70 border border-rose-200">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center justify-center gap-1">
            <Zap className="h-3 w-3 text-rose-500" /> Điểm chăm chỉ (2X)
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            +{points.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {perfect ? "Perfect bonus +400 (2X) • " : ""}
            {user ? "Đã lưu vào bảng xếp hạng 🎉" : "Đăng nhập để lưu điểm lên bảng xếp hạng"}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={start} className="gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white">
            <RotateCcw className="h-4 w-4" /> Làm lại
          </Button>
          <Button variant="outline" onClick={() => setPhase("intro")}>
            Về trang Quiz Nâng Cao
          </Button>
        </div>
      </Card>
    );
  }

  // ===== PLAYING =====
  const q = questions[current];
  if (!q) return null;

  const promptLabel = "Chọn Hán tự điền vào chỗ trống";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <Badge variant="secondary">Câu {current + 1} / {questions.length}</Badge>
        <Badge className="gap-1 bg-rose-100 text-rose-700 border-0 hover:bg-rose-100">
          <Zap className="h-3.5 w-3.5" /> 2X điểm
        </Badge>
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

      <Card className="p-6 md:p-8 flex flex-col items-center gap-4 bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-100">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{promptLabel}</div>
        {q.blankSentence ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl md:text-4xl font-bold text-center leading-relaxed text-foreground">
              {q.blankSentence}
            </div>
            <Button variant="ghost" size="icon" onClick={() => speak(q.word.example || q.word.han)}>
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
        ) : null}
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map(opt => {
          const isCorrect = opt === q.correct;
          const isSelected = opt === selected;
          let cls = "border-2 hover:border-rose-300 hover:bg-rose-50 transition-all justify-start text-left";
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

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button size="lg" onClick={next} className="gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white">
            {current + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo"} <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

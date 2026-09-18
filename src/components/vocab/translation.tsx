"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Trophy, RotateCcw, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VocabWord } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { useAuth } from "@/hooks/use-auth";

interface TranslationProps {
  questionCount?: number;
  onComplete?: (score: number) => void;
  onServerSubmit?: (score: number, detail: { time: number; correct: number; total: number }) => Promise<unknown>;
}

interface Question {
  word: VocabWord;
  correct: string;
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
const TIME_LIMIT = 30;

// Hệ số 1X (như quiz normal)
function computeTranslationScore(correct: number, total: number, totalSeconds: number): number {
  const perfectBonus = correct === total ? 200 : 0;
  const raw = Math.max(0, correct * 100 - totalSeconds * 3 + perfectBonus);
  const multiplier = 1; // Hệ số 1X
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

export function Translation({ questionCount = QUESTION_COUNT, onComplete, onServerSubmit }: TranslationProps) {
  const { user, loading: authLoading, submitScore } = useAuth();
  const vocab = useVocab();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const completedRef = useRef(false);
  const submittedRef = useRef(false);

  const generateQuiz = useCallback(() => {
    const pool = shuffle(vocab).slice(0, Math.min(questionCount, vocab.length));
    const qs: Question[] = pool.map(word => ({ word, correct: word.han }));
    setQuestions(qs);
    setCurrent(0);
    setUserInput("");
    setChecked(false);
    setScore(0);
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

  // Timer tổng
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
    if (checked) return;
    if (timeLeft <= 0) {
      setChecked(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, checked, timeLeft]);

  // Focus input khi sang câu mới
  useEffect(() => {
    if (phase === "playing" && !checked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, checked, current]);

  // Phím Enter
  useEffect(() => {
    if (phase !== "playing") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!checked && userInput.trim()) {
          handleCheck();
        } else if (checked) {
          next();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, userInput, checked, current, questions.length]);

  const handleCheck = () => {
    if (!userInput.trim()) return;
    setChecked(true);
    // So sánh: bỏ khoảng trắng, so sánh chính xác
    const answer = userInput.trim();
    const correct = questions[current].correct;
    if (answer === correct) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setCurrent(c => c + 1);
    setUserInput("");
    setChecked(false);
    setTimeLeft(TIME_LIMIT);
  };

  // Submit điểm
  useEffect(() => {
    if (phase !== "result" || questions.length === 0) return;
    if (authLoading) return;
    if (completedRef.current) return;
    completedRef.current = true;

    const points = computeTranslationScore(score, questions.length, totalSeconds);
    onComplete?.(points);
    if (user) {
      submitScore("quiz", points, { time: totalSeconds, correct: score, total: questions.length, difficulty: "translation" }).catch(() => {});
    }
    if (onServerSubmit) {
      onServerSubmit(points, { time: totalSeconds, correct: score, total: questions.length }).catch(() => {});
    }
  }, [phase, questions.length, authLoading, user, score, totalSeconds, onComplete, onServerSubmit, submitScore]);

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-teal-100 via-cyan-50 to-sky-100 border-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <Check className="h-10 w-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Dịch nghĩa</h3>
          <p className="text-muted-foreground max-w-md">
            {questionCount} câu • {TIME_LIMIT}s/câu • Thấy nghĩa tiếng Việt → <b>tự gõ chữ Hán</b> vào ô trống • Có nút kiểm tra!
          </p>
          <p className="text-sm text-teal-600 font-medium mt-2">
            ✍️ Gõ chữ Hán vào ô trống → bấm "Kiểm tra" để xem đúng/sai
          </p>
        </div>
        {!user && !authLoading && (
          <div className="w-full p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-sm flex items-center gap-2 justify-center">
            <span>⚠️</span>
            <span>Bạn chưa đăng nhập. Điểm sẽ <b>không lưu</b> lên bảng xếp hạng.</span>
          </div>
        )}
        <Button size="lg" onClick={start} className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90">
          Bắt đầu dịch nghĩa <RotateCcw className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  // ===== RESULT =====
  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const title = pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Tốt lắm!" : pct >= 40 ? "Cố lên!" : "Cần luyện thêm!";
    const points = computeTranslationScore(score, questions.length, totalSeconds);
    const perfect = score === questions.length;
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-0">
        <div className="text-7xl">{emoji}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground">Bạn đã dịch đúng</p>
        </div>
        <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          {score}/{questions.length}
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác • {totalSeconds.toFixed(1)}s</Badge>
        <div className="w-full p-4 rounded-2xl bg-white/70 border border-emerald-200">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Điểm nhận được</div>
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
          <Button variant="outline" onClick={() => setPhase("intro")}>
            Về trang dịch nghĩa
          </Button>
        </div>
      </Card>
    );
  }

  // ===== PLAYING =====
  const q = questions[current];
  if (!q) return null;

  const isCorrect = userInput.trim() === q.correct;
  const isEmpty = !userInput.trim() && timeLeft <= 0;

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
            <Trophy className="h-3.5 w-3.5" /> {score} đúng
          </Badge>
        </div>
      </div>

      <Progress value={(timeLeft / TIME_LIMIT) * 100} className="h-1.5" />

      {/* Question - hiển thị nghĩa tiếng Việt */}
      <Card className="p-6 md:p-8 flex flex-col items-center gap-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Gõ chữ Hán đúng với nghĩa sau</div>
        <div className="text-3xl md:text-4xl font-bold text-center text-foreground">
          {q.word.meaning}
        </div>
        {q.word.pos && (
          <div className="text-sm text-muted-foreground">{q.word.pos}</div>
        )}
        {q.word.pinyin && checked && (
          <div className="text-base text-teal-600 italic">{q.word.pinyin}</div>
        )}
      </Card>

      {/* Input - ô để gõ chữ Hán */}
      <div className="flex flex-col gap-3">
        {!checked ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (userInput.trim()) handleCheck();
                }
              }}
              placeholder="Gõ chữ Hán vào đây..."
              className="w-full text-3xl md:text-4xl text-center font-bold py-6 px-4 rounded-2xl border-2 border-teal-200 bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
              autoFocus
              disabled={checked}
            />
            <Button
              size="lg"
              onClick={handleCheck}
              disabled={!userInput.trim()}
              className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
            >
              Kiểm tra (Enter)
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            {/* Hiện đáp án user gõ */}
            <div className="p-4 rounded-xl bg-white border-2 border-slate-200 text-center">
              <div className="text-xs text-muted-foreground mb-1">Bạn đã gõ:</div>
              <div className="text-3xl font-bold text-foreground">
                {userInput.trim() || "(trống)"}
              </div>
            </div>

            {/* Kết quả kiểm tra */}
            <div className={`p-4 rounded-xl text-center font-semibold ${
              isCorrect
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              {isCorrect ? (
                <>✅ Chính xác!</>
              ) : isEmpty ? (
                <>⏰ Hết giờ!</>
              ) : (
                <>❌ Chưa đúng!</>
              )}
              <div className="mt-2 text-lg">
                Đáp án đúng: <span className="text-2xl font-bold">{q.correct}</span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => speak(q.word.han)}>
                  <Volume2 className="h-4 w-4" /> Nghe phát âm
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              onClick={next}
              className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
            >
              {current + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo (Enter)"} <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

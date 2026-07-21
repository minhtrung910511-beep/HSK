"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Trophy, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VOCAB, VocabWord } from "@/lib/vocab-data";

type QuizMode = "han-to-vi" | "vi-to-han" | "pinyin-to-han";

interface QuizProps {
  questionCount?: number;
  onQuizComplete?: (score: number, total: number) => void;
}

interface Question {
  word: VocabWord;
  options: string[];
  correct: string;
  mode: QuizMode;
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

export function Quiz({ questionCount = QUESTION_COUNT, onQuizComplete }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [answeredCount, setAnsweredCount] = useState(0);

  const generateQuiz = useCallback(() => {
    const pool = shuffle(VOCAB).slice(0, questionCount);
    const modes: QuizMode[] = ["han-to-vi", "vi-to-han", "pinyin-to-han"];
    const qs: Question[] = pool.map(word => {
      const mode = modes[Math.floor(Math.random() * modes.length)];
      // Lấy 3 đáp án sai ngẫu nhiên
      const distractors = shuffle(VOCAB.filter(w => w.id !== word.id)).slice(0, 3);
      let correct: string;
      let options: string[];
      if (mode === "han-to-vi") {
        correct = word.meaning;
        options = shuffle([correct, ...distractors.map(d => d.meaning)]);
      } else if (mode === "vi-to-han") {
        correct = word.han;
        options = shuffle([correct, ...distractors.map(d => d.han)]);
      } else {
        correct = word.han;
        options = shuffle([correct, ...distractors.map(d => d.han)]);
      }
      return { word, options, correct, mode };
    });
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnsweredCount(0);
    setTimeLeft(TIME_LIMIT);
  }, [questionCount]);

  const start = () => {
    generateQuiz();
    setPhase("playing");
  };

  // Timer
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
      // Hoàn thành
      setPhase("result");
      const finalScore = score; // score đã được cập nhật
      onQuizComplete?.(finalScore, questions.length);
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
  };

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
            {questionCount} câu hỏi • {TIME_LIMIT} giây/câu • 3 dạng: Hán → Việt, Việt → Hán, Pinyin → Hán
          </p>
        </div>
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
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác</Badge>
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

  const promptLabel = q.mode === "han-to-vi"
    ? "Chọn nghĩa tiếng Việt"
    : q.mode === "vi-to-han"
    ? "Chọn Hán tự đúng"
    : "Chọn Hán tự theo pinyin";

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
        <div className="flex items-center gap-3">
          <div className="text-5xl md:text-6xl font-bold text-foreground">
            {q.mode === "han-to-vi" && q.word.han}
            {q.mode === "vi-to-han" && q.word.meaning}
            {q.mode === "pinyin-to-han" && <span className="italic">{q.word.pinyin}</span>}
          </div>
          {q.mode === "han-to-vi" && (
            <Button variant="ghost" size="icon" onClick={() => speak(q.word.han)}>
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
        </div>
        {q.mode === "han-to-vi" && (
          <div className="text-base italic text-muted-foreground">{q.word.pinyin}</div>
        )}
        {q.mode === "vi-to-han" && (
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

      {/* Next button */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-end"
          >
            <Button onClick={next} className="gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              {current + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp theo"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

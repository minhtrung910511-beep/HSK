"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Volume2, Pause, Play, ChevronLeft, ChevronRight, Trophy, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";

type ExamCode = "H10901" | "H11005";
type Phase = "select" | "playing" | "result";

const EXAMS: { code: ExamCode; title: string }[] = [
  { code: "H10901", title: "Đề thi HSK1 - H10901" },
  { code: "H11005", title: "Đề thi HSK1 - H11005" },
];

const ANSWER_KEYS: Record<ExamCode, Record<number, string>> = {
  H10901: {
    1: "√", 2: "×", 3: "√", 4: "×", 5: "√",
    6: "B", 7: "C", 8: "A", 9: "B", 10: "C",
    11: "C", 12: "A", 13: "D", 14: "F", 15: "E",
    16: "A", 17: "C", 18: "B", 19: "A", 20: "C",
    21: "×", 22: "√", 23: "×", 24: "√", 25: "×",
    26: "D", 27: "B", 28: "F", 29: "A", 30: "E",
    31: "D", 32: "F", 33: "A", 34: "E", 35: "C",
    36: "D", 37: "F", 38: "B", 39: "A", 40: "E",
  },
  H11005: {
    1: "×", 2: "√", 3: "√", 4: "×", 5: "×",
    6: "C", 7: "A", 8: "B", 9: "C", 10: "A",
    11: "E", 12: "C", 13: "A", 14: "D", 15: "F",
    16: "B", 17: "C", 18: "A", 19: "B", 20: "C",
    21: "√", 22: "×", 23: "√", 24: "×", 25: "√",
    26: "C", 27: "A", 28: "E", 29: "D", 30: "B",
    31: "F", 32: "A", 33: "E", 34: "B", 35: "D",
    36: "E", 37: "A", 38: "F", 39: "C", 40: "B",
  },
};

interface QPart {
  section: string;
  part: string;
  sectionLabel: string;
  startQ: number;
  endQ: number;
  options: string[];
  page: number; // PDF page for this section
  hasImages: boolean;
}

const QUESTION_PARTS: QPart[] = [
  { section: "听力", part: "第一部分", sectionLabel: "一、听力", startQ: 1, endQ: 5, options: ["√", "×"], page: 2, hasImages: true },
  { section: "听力", part: "第二部分", sectionLabel: "一、听力", startQ: 6, endQ: 8, options: ["A", "B", "C"], page: 3, hasImages: true },
  { section: "听力", part: "第二部分", sectionLabel: "一、听力", startQ: 9, endQ: 10, options: ["A", "B", "C"], page: 4, hasImages: true },
  { section: "听力", part: "第三部分", sectionLabel: "一、听力", startQ: 11, endQ: 15, options: ["A", "B", "C", "D", "E", "F"], page: 5, hasImages: true },
  { section: "听力", part: "第四部分", sectionLabel: "一、听力", startQ: 16, endQ: 20, options: ["A", "B", "C"], page: 6, hasImages: false },
  { section: "阅读", part: "第一部分", sectionLabel: "二、阅读", startQ: 21, endQ: 25, options: ["√", "×"], page: 7, hasImages: true },
  { section: "阅读", part: "第二部分", sectionLabel: "二、阅读", startQ: 26, endQ: 30, options: ["A", "B", "C", "D", "E", "F"], page: 8, hasImages: true },
  { section: "阅读", part: "第三部分", sectionLabel: "二、阅读", startQ: 31, endQ: 35, options: ["A", "B", "C", "D", "E", "F"], page: 9, hasImages: false },
  { section: "阅读", part: "第四部分", sectionLabel: "二、阅读", startQ: 36, endQ: 40, options: ["A", "B", "C", "D", "E", "F"], page: 10, hasImages: false },
];

export function RealExamPage() {
  const { user, submitScore } = useAuth();
  const [phase, setPhase] = useState<Phase>("select");
  const [examCode, setExamCode] = useState<ExamCode | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startExam = (code: ExamCode) => {
    setExamCode(code);
    setAnswers({});
    setCurrentQ(0);
    setPhase("playing");
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const setAnswer = (answer: string) => {
    const qNum = currentQ + 1;
    setAnswers(prev => ({ ...prev, [qNum]: answer }));
    // Auto next after selecting
    setTimeout(() => {
      if (currentQ < 39) setCurrentQ(c => c + 1);
    }, 300);
  };

  const calculateScore = () => {
    if (!examCode) return 0;
    const key = ANSWER_KEYS[examCode];
    let correct = 0;
    for (let i = 1; i <= 40; i++) {
      if (answers[i] === key[i]) correct++;
    }
    return correct;
  };

  const submitExam = () => {
    setPhase("result");
    if (user && submitScore && examCode) {
      const correct = calculateScore();
      submitScore("flashcard_review", correct * 10, { exam: true, examCode, correct, total: 40 }).catch(() => {});
    }
  };

  const answeredCount = Object.keys(answers).length;
  const qNum = currentQ + 1;
  const currentPart = QUESTION_PARTS.find(p => qNum >= p.startQ && qNum <= p.endQ) || QUESTION_PARTS[0];
  const isListeningPart = currentPart.section === "听力";
  const userAnswer = answers[qNum];

  // ===== SELECT EXAM =====
  if (phase === "select") {
    return (
      <div className="flex flex-col gap-4">
        <Card className="p-6 md:p-8 border-0 bg-gradient-to-br from-rose-100 via-fuchsia-50 to-violet-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-violet-500 flex items-center justify-center shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Đề thi HSK1 thật</h2>
              <p className="text-sm text-muted-foreground">2 đề thi thật • 40 câu • Có ảnh + audio</p>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMS.map((exam, i) => (
            <motion.button
              key={exam.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => startExam(exam.code)}
              className="p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white hover:scale-105 transition-transform shadow-lg text-left"
            >
              <div className="text-4xl mb-2">📝</div>
              <div className="font-bold text-lg">{exam.title}</div>
              <div className="text-sm opacity-80 mt-1">40 câu • Có audio MP3</div>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs">
                <Volume2 className="h-3 w-3" /> Có phần nghe
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ===== PLAYING =====
  if (phase === "playing" && examCode) {
    return (
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button onClick={() => setPhase("select")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Thoát
          </button>
          <Badge variant="secondary">📝 {examCode}</Badge>
          <div className="flex items-center gap-2">
            <Badge className="gap-1 bg-emerald-100 text-emerald-700 border-0">
              {answeredCount}/40
            </Badge>
            <Button onClick={submitExam} size="sm" className="gap-1 bg-gradient-to-r from-rose-500 to-violet-500 text-white">
              <Trophy className="h-4 w-4" /> Nộp bài
            </Button>
          </div>
        </div>

        {/* Audio player - chỉ phần nghe */}
        {isListeningPart && (
          <Card className="p-3 bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200">
            <div className="flex items-center gap-3">
              <Button size="icon" onClick={toggleAudio} className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-full h-10 w-10">
                {audioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="flex-1">
                <div className="font-semibold text-sm">🎧 Phần nghe</div>
                <div className="text-xs text-muted-foreground">Bấm play để nghe</div>
              </div>
              <audio ref={audioRef} src={`/exam-audio/${examCode}.mp3`} onEnded={() => setAudioPlaying(false)} className="hidden" />
            </div>
          </Card>
        )}

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">{currentPart.sectionLabel} • {currentPart.part}</span>
            <span className="text-xs font-medium">Câu {qNum}/40</span>
          </div>
          <Progress value={(qNum / 40) * 100} className="h-1.5" />
        </div>

        {/* Question + Answer side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Left: Exam page image (zoomed to relevant area) */}
          <Card className="p-2 overflow-hidden">
            <div className="text-xs text-muted-foreground mb-1 text-center">
              {currentPart.sectionLabel} • {currentPart.part} • Trang {currentPart.page}
            </div>
            <div className="overflow-y-auto max-h-[500px] rounded-lg">
              <img
                src={`/exam-images/${examCode}/full_page_${currentPart.page}.png`}
                alt={`${examCode} page ${currentPart.page}`}
                className="w-full h-auto"
              />
            </div>
          </Card>

          {/* Right: Question number + Answer buttons */}
          <div className="flex flex-col gap-3">
            <Card className="p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 border-2 border-violet-100">
              <div className="text-center mb-3">
                <Badge variant="secondary" className="mb-2">{currentPart.part}</Badge>
                <div className="text-4xl font-bold text-foreground">Câu {qNum}</div>
              </div>

              {/* Answer buttons - sát câu hỏi */}
              <div className="text-xs text-muted-foreground text-center mb-3">
                {currentPart.options.length === 2
                  ? "Đúng hay Sai?"
                  : `Chọn đáp án ${currentPart.options.join(" / ")}`
                }
              </div>

              <div className={`grid ${currentPart.options.length === 2 ? "grid-cols-2 gap-3" : currentPart.options.length === 3 ? "grid-cols-3 gap-2" : "grid-cols-3 gap-2"}`}>
                {currentPart.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(opt)}
                    className={`py-5 rounded-xl text-xl font-bold transition-all border-2 ${
                      userAnswer === opt
                        ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-violet-600 shadow-lg scale-105"
                        : "bg-white border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                    }`}
                  >
                    {opt}
                    {userAnswer === opt && <Check className="h-4 w-4 inline ml-1" />}
                  </button>
                ))}
              </div>

              {/* Hint for auto-next */}
              <div className="text-center text-xs text-muted-foreground mt-3">
                {userAnswer ? "✓ Đã chọn → tự chuyển câu sau" : "Chọn đáp án để tự chuyển câu"}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentQ(c => Math.max(0, c - 1))} disabled={currentQ === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentQ(c => Math.min(39, c + 1))} disabled={currentQ === 39}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Answer grid */}
            <Card className="p-3">
              <div className="text-xs font-medium text-muted-foreground mb-2">Phiếu trả lời ({answeredCount}/40)</div>
              <div className="grid grid-cols-8 md:grid-cols-10 gap-1">
                {Array.from({ length: 40 }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentQ(num - 1)}
                    className={`aspect-square rounded text-[10px] font-medium transition-all flex items-center justify-center ${
                      num === qNum
                        ? "bg-violet-500 text-white shadow"
                        : answers[num]
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                        : "bg-white border border-slate-200 text-slate-400 hover:border-violet-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Submit button */}
        {answeredCount >= 30 && (
          <div className="flex justify-center">
            <Button onClick={submitExam} size="lg" className="gap-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white">
              <Trophy className="h-5 w-5" /> Nộp bài ({answeredCount}/40)
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ===== RESULT =====
  if (phase === "result" && examCode) {
    const correct = calculateScore();
    const total = 40;
    const pct = Math.round((correct / total) * 100);
    const points = correct * 10;
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : pct >= 40 ? "💪" : "📚";
    const title = pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Tốt lắm!" : pct >= 40 ? "Cố lên!" : "Cần luyện thêm!";

    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-0">
        <div className="text-7xl">{emoji}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground">Đề thi {examCode}</p>
        </div>
        <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          {correct}/{total}
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% • {points} điểm</Badge>

        {/* Chi tiết theo từng phần */}
        <div className="w-full">
          {QUESTION_PARTS.map((part, pi) => (
            <div key={pi} className="mb-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {part.sectionLabel} • {part.part} (Câu {part.startQ}-{part.endQ})
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5">
                {Array.from({ length: part.endQ - part.startQ + 1 }, (_, i) => part.startQ + i).map(qNum => {
                  const userAns = answers[qNum] || "-";
                  const correctAns = ANSWER_KEYS[examCode][qNum];
                  const isCorrect = userAns === correctAns;
                  const isUnanswered = !answers[qNum];
                  return (
                    <div
                      key={qNum}
                      className={`p-2 rounded-lg text-center text-xs ${
                        isUnanswered ? "bg-slate-100 text-slate-400"
                        : isCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      <div className="font-bold">{qNum}</div>
                      <div className="mt-0.5">{isUnanswered ? "-" : isCorrect ? "✓" : "✗"}</div>
                      <div className="text-[10px] mt-0.5 text-muted-foreground">
                        {userAns}{isCorrect ? "" : `→${correctAns}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full p-4 rounded-2xl bg-white/70 border border-emerald-200">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Điểm chăm chỉ</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            +{points}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {correct}×10 {user ? "• Đã lưu 🎉" : "• Đăng nhập để lưu"}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => startExam(examCode)} className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <RotateCcw className="h-4 w-4" /> Làm lại
          </Button>
          <Button variant="outline" onClick={() => setPhase("select")} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Chọn đề khác
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Volume2, Pause, Play, ChevronLeft, ChevronRight, Trophy, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

type ExamCode = "H10901" | "H11005";
type Phase = "select" | "viewing" | "result";

const EXAMS: { code: ExamCode; title: string; pages: number }[] = [
  { code: "H10901", title: "Đề thi HSK1 - H10901", pages: 10 },
  { code: "H11005", title: "Đề thi HSK1 - H11005", pages: 10 },
];

export function RealExamPage() {
  const { user, submitScore } = useAuth();
  const [phase, setPhase] = useState<Phase>("select");
  const [examCode, setExamCode] = useState<ExamCode | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Answer key for both exams (40 questions each)
  // Format: { questionNumber: "correct_answer" }
  // √/× for Q1-5, Q21-25; A/B/C for Q6-10, Q16-20; A-F for Q11-15, Q26-30, Q31-35, Q36-40
  const ANSWER_KEYS: Record<ExamCode, Record<number, string>> = {
    H10901: {
      // Phần nghe -第一部分 (1-5): √ or ×
      1: "√", 2: "×", 3: "√", 4: "×", 5: "√",
      // 第二部分 (6-10): A/B/C
      6: "B", 7: "C", 8: "A", 9: "B", 10: "C",
      // 第三部分 (11-15): A-F
      11: "C", 12: "A", 13: "D", 14: "F", 15: "E",
      // 第四部分 (16-20): A/B/C
      16: "A", 17: "C", 18: "B", 19: "A", 20: "C",
      // Phần đọc - 第一部分 (21-25): √ or ×
      21: "×", 22: "√", 23: "×", 24: "√", 25: "×",
      // 第二部分 (26-30): A-F
      26: "D", 27: "B", 28: "F", 29: "A", 30: "E",
      // 第三部分 (31-35): A-F
      31: "D", 32: "F", 33: "A", 34: "E", 35: "C",
      // 第四部分 (36-40): A-F
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

  const startExam = (code: ExamCode) => {
    setExamCode(code);
    setCurrentPage(1);
    setAnswers({});
    setPhase("viewing");
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

  const setAnswer = (question: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const submitExam = () => {
    if (!examCode) return;
    setPhase("result");
    if (user && submitScore) {
      const correct = calculateScore();
      submitScore("flashcard_review", correct * 10, { exam: true, examCode, correct, total: 40 }).catch(() => {});
    }
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

  const answeredCount = Object.keys(answers).length;

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
              <p className="text-sm text-muted-foreground">2 đề thi thật • 40 câu/đề • Có ảnh + audio thật</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 border border-rose-200">
            <div className="font-semibold text-sm mb-1">📋 Cấu trúc đề thi (40 câu)</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>一、听力 (Nghe hiểu) - 20 câu - Có audio MP3</li>
              <li>　• 第一部分 (1-5): Nghe → đánh dấu √/×</li>
              <li>　• 第二部分 (6-10): Nghe → chọn tranh A/B/C</li>
              <li>　• 第三部分 (11-15): Nghe → chọn tranh A-F</li>
              <li>　• 第四部分 (16-20): Nghe → chọn đáp án A/B/C</li>
              <li>二、阅读 (Đọc hiểu) - 20 câu</li>
              <li>　• 第一部分 (21-25): Hình + từ → đánh dấu √/×</li>
              <li>　• 第二部分 (26-30): Câu → nối với hình A-F</li>
              <li>　• 第三部分 (31-35): Câu hỏi → nối đáp án A-F</li>
              <li>　• 第四部分 (36-40): Điền từ vào chỗ trống A-F</li>
            </ul>
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
              <div className="text-sm opacity-80 mt-1">10 trang • 40 câu • Có audio MP3</div>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs">
                <Volume2 className="h-3 w-3" /> Có phần nghe audio
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ===== VIEWING EXAM =====
  if (phase === "viewing" && examCode) {
    const totalPages = 10;
    return (
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={() => setPhase("select")}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Chọn đề khác
          </button>
          <Badge variant="secondary">📝 {examCode}</Badge>
          <div className="flex items-center gap-2">
            <Badge className="gap-1 bg-emerald-100 text-emerald-700 border-0">
              {answeredCount}/40 câu
            </Badge>
            <Button
              onClick={submitExam}
              className="gap-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white"
            >
              <Trophy className="h-4 w-4" /> Nộp bài
            </Button>
          </div>
        </div>

        {/* Audio player (chỉ hiện ở trang nghe) */}
        {currentPage >= 2 && currentPage <= 6 && (
          <Card className="p-4 bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                onClick={toggleAudio}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-full h-12 w-12"
              >
                {audioPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="flex-1">
                <div className="font-semibold text-sm">🎧 Phần nghe - {examCode}</div>
                <div className="text-xs text-muted-foreground">Bấm play để nghe audio, làm bài cùng lúc</div>
              </div>
              <audio
                ref={audioRef}
                src={`/exam-audio/${examCode}.mp3`}
                onEnded={() => setAudioPlaying(false)}
                className="hidden"
              />
            </div>
          </Card>
        )}

        {/* Page navigation */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-3">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Exam page image */}
        <Card className="p-2 overflow-hidden">
          <img
            src={`/exam-images/${examCode}/full_page_${currentPage}.png`}
            alt={`${examCode} page ${currentPage}`}
            className="w-full h-auto rounded-lg"
          />
        </Card>

        {/* Answer sheet - hiện ở trang cuối */}
        {currentPage === totalPages && (
          <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <h3 className="font-bold text-lg mb-3">📝 Phiếu trả lời</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 40 }, (_, i) => i + 1).map(qNum => {
                // Determine answer options based on question number
                let options: string[] = [];
                if (qNum <= 5 || (qNum >= 21 && qNum <= 25)) {
                  options = ["√", "×"];
                } else if ((qNum >= 6 && qNum <= 10) || (qNum >= 16 && qNum <= 20)) {
                  options = ["A", "B", "C"];
                } else {
                  options = ["A", "B", "C", "D", "E", "F"];
                }
                return (
                  <div key={qNum} className="flex items-center gap-1">
                    <span className="text-xs font-medium w-6">{qNum}.</span>
                    <div className="flex gap-1 flex-wrap">
                      {options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setAnswer(qNum, opt)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                            answers[qNum] === opt
                              ? "bg-violet-500 text-white shadow"
                              : "bg-white border border-slate-200 hover:border-violet-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Đã trả lời: {answeredCount}/40
              </span>
              <Button
                onClick={submitExam}
                className="gap-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white"
              >
                <Trophy className="h-4 w-4" /> Nộp bài
              </Button>
            </div>
          </Card>
        )}

        {/* Page navigation (bottom) */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Trang trước
          </Button>
          <span className="text-sm font-medium px-3">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Trang sau <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
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
        <Badge variant="secondary" className="text-base px-4 py-1">{pct}% chính xác • {points} điểm</Badge>

        {/* Chi tiết đáp án */}
        <div className="w-full p-4 rounded-2xl bg-white/70 border border-emerald-200">
          <div className="font-semibold mb-3 text-sm">📋 Chi tiết đáp án</div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {Array.from({ length: 40 }, (_, i) => i + 1).map(qNum => {
              const userAnswer = answers[qNum] || "-";
              const correctAnswer = ANSWER_KEYS[examCode][qNum];
              const isCorrect = userAnswer === correctAnswer;
              const isUnanswered = !answers[qNum];
              return (
                <div
                  key={qNum}
                  className={`p-2 rounded-lg text-center text-xs ${
                    isUnanswered
                      ? "bg-slate-100 text-slate-400"
                      : isCorrect
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  <div className="font-bold">{qNum}</div>
                  <div className="mt-1">
                    {isUnanswered ? "-" : userAnswer}
                  </div>
                  {!isCorrect && !isUnanswered && (
                    <div className="text-[10px] text-muted-foreground mt-0.5">→ {correctAnswer}</div>
                  )}
                </div>
              );
            })}
          </div>
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

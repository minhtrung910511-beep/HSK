"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, Check, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TopicId, VOCAB, VocabWord, getTopic } from "@/lib/vocab-data";
import { QualityGrade } from "@/lib/srs";

interface FlashcardProps {
  topicId?: TopicId | "all" | "due";
  onGrade?: (wordId: number, grade: QualityGrade) => void;
  onMarkLearned?: (wordId: number) => void;
  dueWordIds?: number[];
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

export function Flashcard({ topicId = "all", onGrade, onMarkLearned, dueWordIds }: FlashcardProps) {
  const [deck, setDeck] = useState<VocabWord[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    let words: VocabWord[] = [];
    if (topicId === "all") {
      words = [...VOCAB];
    } else if (topicId === "due") {
      const ids = new Set(dueWordIds ?? []);
      words = VOCAB.filter(w => ids.has(w.id));
    } else {
      words = VOCAB.filter(w => w.topic === topicId);
    }
    setDeck(words);
    setIndex(0);
    setFlipped(false);
  }, [topicId, dueWordIds]);

  const current = deck[index];

  const goNext = useCallback(() => {
    setDirection(1);
    setFlipped(false);
    setTimeout(() => {
      setIndex(i => (i + 1) % Math.max(deck.length, 1));
    }, 120);
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setFlipped(false);
    setTimeout(() => {
      setIndex(i => (i - 1 + deck.length) % Math.max(deck.length, 1));
    }, 120);
  }, [deck.length]);

  const handleGrade = useCallback((grade: QualityGrade) => {
    if (!current) return;
    onGrade?.(current.id, grade);
    if (grade >= 3) onMarkLearned?.(current.id);
    goNext();
  }, [current, onGrade, onMarkLearned, goNext]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!current) return;
      if (e.code === "Space") { e.preventDefault(); setFlipped(f => !f); }
      else if (e.code === "ArrowRight") goNext();
      else if (e.code === "ArrowLeft") goPrev();
      else if (e.code === "Digit1") handleGrade(0);
      else if (e.code === "Digit2") handleGrade(3);
      else if (e.code === "Digit3") handleGrade(5);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goNext, goPrev, handleGrade]);

  if (deck.length === 0 || !current) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Tuyệt vời!</h3>
        <p className="text-muted-foreground">
          {topicId === "due"
            ? "Không có từ nào cần ôn lúc này. Hãy quay lại sau hoặc học chủ đề mới!"
            : "Chưa có từ vựng trong bộ này."}
        </p>
      </div>
    );
  }

  const topic = getTopic(current.topic);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Thẻ {index + 1} / {deck.length}</span>
          <span>{Math.round(((index + 1) / deck.length) * 100)}%</span>
        </div>
        <Progress value={((index + 1) / deck.length) * 100} className="h-2" />
      </div>

      <div className="relative" style={{ perspective: "1500px" }}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div
              className="relative w-full h-[420px] cursor-pointer"
              style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.5s" }}
              onClick={() => setFlipped(f => !f)}
            >
              <Card
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br ${topic.color} border-0 shadow-xl text-white overflow-hidden`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/25 text-white border-0 hover:bg-white/25">
                    {topic.emoji} {topic.name}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => { e.stopPropagation(); speak(current.han); }}
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-7xl mb-2">{current.emoji}</div>
                <div className="text-7xl md:text-8xl font-bold tracking-tight drop-shadow-lg">
                  {current.han}
                </div>
                <div className="text-2xl font-medium opacity-95 italic">
                  {current.pinyin}
                </div>
                <div className="absolute bottom-4 text-white/80 text-xs">
                  👆 Nhấp để lật thẻ xem nghĩa
                </div>
              </Card>

              <Card
                className="absolute inset-0 flex flex-col gap-4 p-6 bg-white shadow-xl border-2 border-primary/20"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{current.pos}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); speak(current.han); }}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="text-5xl font-bold text-foreground">{current.han}</div>
                  <div className="text-base text-muted-foreground italic">{current.pinyin}</div>
                  <div className="text-3xl font-semibold text-primary mt-2">{current.meaning}</div>
                </div>

                <div className="border-t border-dashed border-primary/20 pt-3 space-y-1">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Ví dụ</div>
                  <div className="text-lg font-medium text-foreground">{current.example}</div>
                  <div className="text-sm italic text-muted-foreground">{current.examplePinyin}</div>
                  <div className="text-sm text-foreground/80">{current.exampleVi}</div>
                </div>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="icon" onClick={goPrev} disabled={deck.length < 2}>
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2 flex-1 justify-center">
          <Button
            variant="outline"
            className="gap-2 border-rose-200 text-rose-600 hover:bg-rose-50"
            onClick={() => handleGrade(0)}
          >
            <X className="h-4 w-4" /> Chưa nhớ
            <kbd className="ml-1 text-[10px] px-1 py-0.5 rounded bg-rose-100 text-rose-700">1</kbd>
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-amber-200 text-amber-600 hover:bg-amber-50"
            onClick={() => handleGrade(3)}
          >
            <Check className="h-4 w-4" /> Nhớ
            <kbd className="ml-1 text-[10px] px-1 py-0.5 rounded bg-amber-100 text-amber-700">2</kbd>
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            onClick={() => handleGrade(5)}
          >
            <Sparkles className="h-4 w-4" /> Dễ
            <kbd className="ml-1 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">3</kbd>
          </Button>
        </div>

        <Button variant="outline" size="icon" onClick={goNext} disabled={deck.length < 2}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Phím tắt: <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> lật thẻ • <kbd className="px-1.5 py-0.5 rounded bg-muted">←/→</kbd> chuyển • <kbd className="px-1.5 py-0.5 rounded bg-muted">1/2/3</kbd> đánh giá
      </div>
    </div>
  );
}

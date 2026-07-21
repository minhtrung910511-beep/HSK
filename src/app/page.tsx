"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Home, Layers, HelpCircle, Shuffle, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dashboard } from "@/components/vocab/dashboard";
import { Flashcard } from "@/components/vocab/flashcard";
import { Quiz } from "@/components/vocab/quiz";
import { Matching } from "@/components/vocab/matching";
import { TopicPicker } from "@/components/vocab/topic-picker";
import { useProgress } from "@/hooks/use-progress";
import { TOPICS, VOCAB, getTopic, TopicId } from "@/lib/vocab-data";
import { getDueCards } from "@/lib/srs";

type Tab = "home" | "flashcard" | "quiz" | "matching";
type FlashcardScope = "all" | "due" | TopicId;

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("home");
  const [scope, setScope] = useState<FlashcardScope>("all");
  const { progress, hydrated, grade, markLearnedWord, recordQuizScore, recordMatchingScore, reset } = useProgress();

  const allWordIds = useMemo(() => VOCAB.map(w => w.id), []);
  const dueIds = useMemo(
    () => (progress ? getDueCards(progress, allWordIds) : []),
    [progress, allWordIds]
  );

  const startDue = () => {
    setScope("due");
    setTab("flashcard");
  };

  const handleTopicClick = (topicId: string) => {
    setScope(topicId as TopicId);
    setTab("flashcard");
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home",      label: "Trang chủ",  icon: <Home className="h-5 w-5" /> },
    { id: "flashcard", label: "Flashcard",  icon: <Layers className="h-5 w-5" /> },
    { id: "quiz",      label: "Quiz",       icon: <HelpCircle className="h-5 w-5" /> },
    { id: "matching",  label: "Ghép cặp",   icon: <Shuffle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 flex items-center justify-center shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent leading-tight">
                HSK1 Tiếng Trung
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Học từ vựng dễ nhớ • 150 từ HSK 1.0</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-white/60 rounded-xl p-1 border border-white/60 shadow-sm">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/70"
                }`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {!hydrated ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full" />
          </div>
        ) : tab === "home" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard progress={progress} onTopicClick={handleTopicClick} onStartDue={startDue} />
          </motion.div>
        ) : tab === "flashcard" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Scope picker */}
            <Card className="p-3 border-0 bg-white/70 backdrop-blur shadow-sm">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-muted-foreground mr-1">Chọn bộ thẻ:</span>
                <ScopeChip
                  active={scope === "all"}
                  onClick={() => setScope("all")}
                  label={`📚 Tất cả (${VOCAB.length})`}
                />
                <ScopeChip
                  active={scope === "due"}
                  onClick={() => setScope("due")}
                  label={`⏰ Cần ôn (${dueIds.length})`}
                  disabled={dueIds.length === 0}
                />
                <div className="w-px h-5 bg-border mx-1" />
                {TOPICS.map(t => {
                  const count = VOCAB.filter(w => w.topic === t.id).length;
                  return (
                    <ScopeChip
                      key={t.id}
                      active={scope === t.id}
                      onClick={() => setScope(t.id)}
                      label={`${t.emoji} ${t.name} (${count})`}
                    />
                  );
                })}
              </div>
            </Card>

            <Flashcard
              topicId={scope}
              dueWordIds={dueIds}
              onGrade={grade}
              onMarkLearned={markLearnedWord}
            />
          </motion.div>
        ) : tab === "quiz" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Quiz onQuizComplete={(score) => recordQuizScore(score * 10)} />
          </motion.div>
        ) : tab === "matching" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Matching onComplete={recordMatchingScore} />
          </motion.div>
        ) : null}

        {/* Reset button */}
        {tab === "home" && progress && progress.totalReviews > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => {
                if (confirm("Xóa toàn bộ tiến độ học tập? Hành động này không thể hoàn tác.")) {
                  reset();
                }
              }}
            >
              🗑️ Xóa tiến độ & bắt đầu lại
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/40 bg-white/40 backdrop-blur py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            HSK1 Vocabulary • 150 từ • SRS + Flashcard + Quiz + Matching
          </p>
          <p className="mt-1 opacity-70">Dữ liệu học tập được lưu trong trình duyệt của bạn</p>
        </div>
      </footer>
    </div>
  );
}

function ScopeChip({
  active,
  onClick,
  label,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow"
          : disabled
          ? "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
          : "bg-white text-foreground border border-border hover:border-violet-300 hover:bg-violet-50"
      }`}
    >
      {label}
    </button>
  );
}

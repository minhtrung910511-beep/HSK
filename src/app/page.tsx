"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Home, Layers, HelpCircle, Shuffle, GraduationCap, Trophy, LogIn, LogOut, User as UserIcon, Pencil, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dashboard } from "@/components/vocab/dashboard";
import { Flashcard } from "@/components/vocab/flashcard";
import { Quiz } from "@/components/vocab/quiz";
import { Matching } from "@/components/vocab/matching";
import { AuthModal } from "@/components/vocab/auth-modal";
import { EditProfileModal } from "@/components/vocab/edit-profile-modal";
import { Leaderboard } from "@/components/vocab/leaderboard";
import { TopicReview } from "@/components/vocab/topic-review";
import { useProgress } from "@/hooks/use-progress";
import { useAuth } from "@/hooks/use-auth";
import { TOPICS, VOCAB, TopicId } from "@/lib/vocab-data";
import { getDueCards } from "@/lib/srs";

type Tab = "home" | "flashcard" | "quiz" | "matching" | "leaderboard";
type FlashcardScope = "all" | "due" | TopicId;

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("home");
  const [scope, setScope] = useState<FlashcardScope>("all");
  const [authOpen, setAuthOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [reviewTopic, setReviewTopic] = useState<TopicId | null>(null);
  const { progress, hydrated, grade, markLearnedWord, recordQuizScore, recordMatchingScore, reset } = useProgress();
  const { user, loading: authLoading, login, register, logout, submitScore, updateProfile } = useAuth();

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

  const handleReviewTopic = (topicId: string) => {
    setReviewTopic(topicId as TopicId);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home",        label: "Trang chủ",   icon: <Home className="h-5 w-5" /> },
    { id: "flashcard",   label: "Flashcard",   icon: <Layers className="h-5 w-5" /> },
    { id: "quiz",        label: "Quiz",        icon: <HelpCircle className="h-5 w-5" /> },
    { id: "matching",    label: "Ghép cặp",    icon: <Shuffle className="h-5 w-5" /> },
    { id: "leaderboard", label: "Xếp hạng",    icon: <Trophy className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 flex items-center justify-center shadow-md shrink-0">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent leading-tight">
                HSK1 Tiếng Trung
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block truncate">Học từ vựng dễ nhớ • 150 từ HSK 1.0</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* User menu */}
            {!authLoading && user ? (
              <div className="flex items-center gap-1.5">
                <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0 hover:opacity-90 hidden sm:flex">
                  <UserIcon className="h-3 w-3 mr-1" />
                  {user.displayName}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditProfileOpen(true)}
                  className="text-muted-foreground hover:text-violet-600 gap-1 px-2"
                  title="Đổi tên hiển thị"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="hidden md:inline">Đổi tên</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-rose-600 gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
              </div>
            ) : !authLoading ? (
              <Button
                size="sm"
                onClick={() => setAuthOpen(true)}
                className="gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>
            ) : null}

            <nav className="flex items-center gap-1 bg-white/60 rounded-xl p-1 border border-white/60 shadow-sm">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t.id
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/70"
                  }`}
                >
                  {t.icon}
                  <span className="hidden md:inline">{t.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {!hydrated ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full" />
          </div>
        ) : reviewTopic ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <TopicReview
              topicId={reviewTopic}
              onExit={() => setReviewTopic(null)}
              onServerSubmit={async (points, detail) => {
                if (user) await submitScore("flashcard_review", points, detail);
              }}
            />
          </motion.div>
        ) : tab === "home" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard progress={progress} onTopicClick={handleTopicClick} onStartDue={startDue} onReviewTopic={handleReviewTopic} />
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
              {/* Nút ôn tập chủ đề đang chọn */}
              {scope !== "all" && scope !== "due" && (
                <div className="mt-3 pt-3 border-t border-dashed border-border flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    Đang xem chủ đề: <b>{TOPICS.find(t => t.id === scope)?.emoji} {TOPICS.find(t => t.id === scope)?.name}</b>
                  </span>
                  <Button
                    size="sm"
                    onClick={() => setReviewTopic(scope as TopicId)}
                    className="gap-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90"
                  >
                    📝 Ôn tập chủ đề này
                  </Button>
                </div>
              )}
            </Card>

            <Flashcard
              topicId={scope}
              dueWordIds={dueIds}
              onGrade={(wordId, g) => {
                grade(wordId, g);
                // Submit lên server nếu user đăng nhập - mỗi từ ôn +1 điểm chăm chỉ
                if (user && g >= 3) {
                  submitScore("flashcard_review", 1, { wordId, grade: g }).catch(() => {});
                }
              }}
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
            <Quiz
              onQuizComplete={(score) => recordQuizScore(score * 10)}
              onScoreComputed={(points) => recordQuizScore(points)}
            />
          </motion.div>
        ) : tab === "matching" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Matching
              onComplete={recordMatchingScore}
              onServerSubmit={async (score, detail) => {
                if (user) await submitScore("matching", score, detail);
              }}
            />
          </motion.div>
        ) : tab === "leaderboard" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Leaderboard />
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
                if (confirm("Xóa toàn bộ tiến độ học tập trong trình duyệt? Hành động này không thể hoàn tác.")) {
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
            <span>✨</span> HSK1 Vocabulary • 150 từ • SRS + Flashcard + Quiz + Matching + Leaderboard
          </p>
          <p className="mt-1 opacity-70">
            {user ? `Đã đăng nhập: ${user.displayName}` : "Tiến độ học lưu trong trình duyệt. Đăng nhập để lưu & xếp hạng."}
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={login}
        onRegister={register}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        currentDisplayName={user?.displayName || ""}
        onSave={async (newName) => {
          await updateProfile(newName);
          // Reload để đồng bộ tất cả component (header, dashboard, leaderboard)
          setTimeout(() => window.location.reload(), 100);
        }}
      />
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

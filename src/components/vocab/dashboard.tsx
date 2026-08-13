"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flame, BookOpen, Target, TrendingUp, Trophy, Zap, Clock, CheckCircle2, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TOPICS } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { ProgressData, getDueCards } from "@/lib/srs";
import { useAuth } from "@/hooks/use-auth";

interface DashboardProps {
  progress: ProgressData | null;
  onTopicClick?: (topicId: string) => void;
  onStartDue?: () => void;
  onReviewTopic?: (topicId: string) => void;
}

interface ServerStats {
  total: number;
  quizBest: number;
  quizPlays: number;
  matchingBest: number;
  matchingPlays: number;
  flashcardReviews: number;
  flashcardWords: number;
  recent: { module: string; score: number; detail: string | null; createdAt: string }[];
}

interface RankInfo {
  rank: number;
  totalUsers: number;
}

export function Dashboard({ progress, onTopicClick, onStartDue, onReviewTopic }: DashboardProps) {
  const { user } = useAuth();
  const vocab = useVocab();
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [rankInfo, setRankInfo] = useState<RankInfo | null>(null);

  const allWordIds = useMemo(() => vocab.map(w => w.id), [vocab]);
  const dueIds = useMemo(
    () => (progress ? getDueCards(progress, allWordIds) : []),
    [progress, allWordIds]
  );

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const [meRes, lbRes] = await Promise.all([
        fetch("/api/scores/me", { credentials: "same-origin" }),
        fetch("/api/scores?limit=1000", { credentials: "same-origin" }),
      ]);
      const meData = await meRes.json();
      if (meData.stats) setStats(meData.stats);
      const lbData = await lbRes.json();
      const lb: { userId: string }[] = lbData.leaderboard || [];
      const idx = lb.findIndex((r) => r.userId === user.id);
      setRankInfo({ rank: idx + 1, totalUsers: lb.length });
    } catch (e) {
      // "Failed to fetch" khi reload/tab switch - im lặng bỏ qua
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh stats mỗi 5 giây để bắt điểm mới
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetchStats();
    }, 5000);
    return () => clearInterval(interval);
  }, [user, fetchStats]);

  // Refresh khi tab được hiển thị lại
  useEffect(() => {
    const handler = () => {
      if (!document.hidden) fetchStats();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [fetchStats]);

  const totalWords = vocab.length;
  const learnedCount = progress?.learnedWordIds.length ?? 0;
  const completionPct = totalWords ? Math.round((learnedCount / totalWords) * 100) : 0;
  const accuracy = progress && progress.totalReviews > 0
    ? Math.round((progress.correctReviews / progress.totalReviews) * 100)
    : 0;

  const last7Days = useMemo(() => {
    const days: { label: string; studied: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const stat = progress?.dailyStats[key];
      days.push({
        label: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()],
        studied: stat?.studied ?? 0,
      });
    }
    return days;
  }, [progress]);

  const maxStudied = Math.max(...last7Days.map(d => d.studied), 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero - Tiến độ + Điểm chăm chỉ server */}
      <Card className="p-6 md:p-8 border-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">Mục tiêu HSK 1</span>
            {user && (
              <Badge className="ml-auto bg-white/25 text-white border-0 hover:bg-white/25">
                👋 Xin chào, {user.displayName}
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tiến độ học */}
            <div>
              <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">Tiến độ học</div>
              <div className="text-5xl md:text-6xl font-bold">{completionPct}%</div>
              <div className="text-sm opacity-90 mt-1">
                Đã học <span className="font-bold">{learnedCount}</span> / {totalWords} từ
              </div>
              <div className="mt-3 h-3 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
            </div>
            {/* Điểm chăm chỉ server */}
            {user ? (
              <div>
                <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">Điểm chăm chỉ tổng</div>
                <div className="text-5xl md:text-6xl font-bold flex items-center gap-2">
                  <Flame className="h-10 w-10" />
                  {(stats?.total ?? 0).toLocaleString()}
                </div>
                <div className="text-sm opacity-90 mt-1">
                  {rankInfo?.rank && rankInfo.totalUsers > 0 ? (
                    <>Xếp hạng <span className="font-bold">#{rankInfo.rank}</span> / {rankInfo.totalUsers} người</>
                  ) : (
                    "Bắt đầu chơi để có hạng!"
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">Điểm chăm chỉ</div>
                <div className="text-lg font-semibold mb-2">Đăng nhập để lưu điểm & xem xếp hạng</div>
                <div className="text-sm opacity-90">Tiến độ hiện tại chỉ lưu trong trình duyệt.</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats cards - 4 ô */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          icon={<Flame className="h-5 w-5 text-white" />}
          iconBg="bg-orange-500/30"
          gradient="from-orange-400 to-red-400"
          label="Streak"
          value={progress?.streak.current ?? 0}
          sub={`Kỷ lục: ${progress?.streak.longest ?? 0} ngày`}
        />
        <StatCard
          icon={<Zap className="h-5 w-5 text-white" />}
          iconBg="bg-yellow-500/30"
          gradient="from-amber-400 to-yellow-400"
          label="Cần ôn"
          value={dueIds.length}
          sub="từ đến hạn hôm nay"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-white" />}
          iconBg="bg-violet-500/30"
          gradient="from-violet-400 to-fuchsia-400"
          label="Quiz best"
          value={user ? (stats?.quizBest ?? 0) : (progress?.quizHighScore ?? 0)}
          sub={user ? `${stats?.quizPlays ?? 0} lần chơi` : "đăng nhập để lưu"}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          iconBg="bg-emerald-500/30"
          gradient="from-emerald-400 to-teal-400"
          label="Matching best"
          value={user ? (stats?.matchingBest ?? 0) : (progress?.matchingHighScore ?? 0)}
          sub={user ? `${stats?.matchingPlays ?? 0} lần chơi` : "đăng nhập để lưu"}
        />
      </div>

      {/* Quick action: due cards */}
      {dueIds.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onStartDue}
          className="w-full text-left"
        >
          <Card className="p-4 md:p-5 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">Ôn tập theo SRS</div>
                <div className="text-sm text-muted-foreground">
                  Có <span className="font-bold text-amber-700">{dueIds.length}</span> từ cần ôn lại hôm nay
                </div>
              </div>
              <Badge className="bg-amber-400 text-white border-0 hover:bg-amber-400">Ôn ngay →</Badge>
            </div>
          </Card>
        </motion.button>
      )}

      {/* Biểu đồ 7 ngày + Chủ đề */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 p-5 border-0 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              7 ngày qua
            </h3>
            <Badge variant="secondary" className="text-xs">
              {last7Days.reduce((s, d) => s + d.studied, 0)} từ
            </Badge>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {last7Days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-medium text-muted-foreground">
                  {d.studied > 0 ? d.studied : ""}
                </div>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-violet-500 to-fuchsia-400 transition-all"
                    style={{ height: `${(d.studied / maxStudied) * 100}%`, minHeight: d.studied > 0 ? "8px" : "2px" }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{d.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3 p-5 border-0 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-500" />
              Chủ đề
            </h3>
            <Badge variant="secondary" className="text-xs">{TOPICS.filter(t => vocab.some(w => w.topic === t.id)).length} chủ đề</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[260px] overflow-y-auto pr-1">
            {TOPICS.map(topic => {
              const words = vocab.filter(w => w.topic === topic.id);
              if (words.length === 0) return null;
              const learned = words.filter(w => progress?.learnedWordIds.includes(w.id)).length;
              const pct = Math.round((learned / words.length) * 100);
              return (
                <div
                  key={topic.id}
                  className={`relative rounded-xl p-3 bg-gradient-to-br ${topic.color} text-white hover:scale-[1.02] transition-transform`}
                >
                  <button
                    onClick={() => onTopicClick?.(topic.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{topic.emoji}</span>
                      <span className="text-xs font-medium opacity-90">{pct}%</span>
                    </div>
                    <div className="font-semibold text-sm leading-tight">{topic.name}</div>
                    <div className="text-xs opacity-90">{learned}/{words.length} từ</div>
                    <div className="h-1 rounded-full bg-white/30 mt-1.5 overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </button>
                  {onReviewTopic && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReviewTopic(topic.id);
                      }}
                      className="mt-2 w-full px-2 py-1 rounded-lg bg-white/25 hover:bg-white/40 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                      title={`Ôn tập chủ đề ${topic.name}`}
                    >
                      📝 Ôn tập
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Hoạt động gần đây (chỉ khi đăng nhập) */}
      {user && stats && stats.recent.length > 0 && (
        <Card className="p-5 border-0 bg-white shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-500" />
            Hoạt động gần đây
          </h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {stats.recent.map((r, i) => {
              const labelMap: Record<string, { label: string; color: string }> = {
                quiz: { label: "Quiz", color: "bg-violet-100 text-violet-700" },
                matching: { label: "Matching", color: "bg-teal-100 text-teal-700" },
                flashcard_review: { label: "Ôn flashcard", color: "bg-amber-100 text-amber-700" },
              };
              const info = labelMap[r.module] || { label: r.module, color: "bg-gray-100" };
              return (
                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-dashed border-border last:border-0">
                  <Badge className={`border-0 hover:opacity-90 ${info.color}`}>{info.label}</Badge>
                  <span className="font-semibold">+{r.score} điểm</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-5 border-0 bg-gradient-to-br from-sky-50 to-cyan-50">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-sky-500" />
          Mẹo học nhanh nhớ lâu
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-sky-500">•</span>
            <span>Học theo flashcard 15-20 từ/ngày, không cố quá nhiều.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500">•</span>
            <span>Ôn lại theo SRS đúng hạn để chuyển vào trí nhớ dài hạn.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500">•</span>
            <span>Đọc to câu ví dụ và nhấn nút loa để nghe phát âm chuẩn.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-500">•</span>
            <span>Kết hợp Quiz và Matching để kích thích nhớ chủ động.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  gradient,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  gradient: string;
  iconBg: string;
}) {
  return (
    <Card className={`p-4 md:p-5 border-0 bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider opacity-90">{label}</div>
          <div className="text-3xl md:text-4xl font-bold mt-1">{value}</div>
          {sub && <div className="text-xs opacity-80 mt-1">{sub}</div>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

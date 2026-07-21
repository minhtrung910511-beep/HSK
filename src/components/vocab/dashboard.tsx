"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, BookOpen, Target, TrendingUp, Trophy, Zap, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TOPICS, VOCAB, getWordsByTopic } from "@/lib/vocab-data";
import { ProgressData, getDueCards } from "@/lib/srs";

interface DashboardProps {
  progress: ProgressData | null;
  onTopicClick?: (topicId: string) => void;
  onStartDue?: () => void;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  gradient: string;
  iconBg: string;
}

function StatCard({ icon, label, value, sub, gradient, iconBg }: StatCardProps) {
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

export function Dashboard({ progress, onTopicClick, onStartDue }: DashboardProps) {
  const allWordIds = useMemo(() => VOCAB.map(w => w.id), []);
  const dueIds = useMemo(
    () => (progress ? getDueCards(progress, allWordIds) : []),
    [progress, allWordIds]
  );

  const totalWords = VOCAB.length;
  const learnedCount = progress?.learnedWordIds.length ?? 0;
  const completionPct = totalWords ? Math.round((learnedCount / totalWords) * 100) : 0;
  const accuracy = progress && progress.totalReviews > 0
    ? Math.round((progress.correctReviews / progress.totalReviews) * 100)
    : 0;

  // 7 ngày gần nhất cho mini chart
  const last7Days = useMemo(() => {
    const days: { label: string; studied: number; correct: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const stat = progress?.dailyStats[key];
      days.push({
        label: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()],
        studied: stat?.studied ?? 0,
        correct: stat?.correct ?? 0,
      });
    }
    return days;
  }, [progress]);

  const maxStudied = Math.max(...last7Days.map(d => d.studied), 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero - Tiến độ tổng */}
      <Card className="p-6 md:p-8 border-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">Mục tiêu HSK 1</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-5xl md:text-6xl font-bold">{completionPct}%</div>
              <div className="text-sm opacity-90 mt-1">
                Đã học <span className="font-bold">{learnedCount}</span> / {totalWords} từ vựng
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Progress value={completionPct} className="h-3 bg-white/20 [&>div]:bg-white" />
              <div className="flex justify-between text-xs mt-2 opacity-80">
                <span>0</span>
                <span>{totalWords} từ</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 4 stat cards */}
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
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          iconBg="bg-emerald-500/30"
          gradient="from-emerald-400 to-teal-400"
          label="Độ chính xác"
          value={`${accuracy}%`}
          sub={`${progress?.totalReviews ?? 0} lần ôn`}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-white" />}
          iconBg="bg-violet-500/30"
          gradient="from-violet-400 to-fuchsia-400"
          label="Điểm cao"
          value={Math.max(progress?.quizHighScore ?? 0, progress?.matchingHighScore ?? 0)}
          sub="Quiz / Matching"
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
        {/* 7-day chart */}
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

        {/* Topic overview */}
        <Card className="lg:col-span-3 p-5 border-0 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-500" />
              Chủ đề
            </h3>
            <Badge variant="secondary" className="text-xs">{TOPICS.length} chủ đề</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[260px] overflow-y-auto pr-1">
            {TOPICS.map(topic => {
              const words = getWordsByTopic(topic.id);
              const learned = words.filter(w => progress?.learnedWordIds.includes(w.id)).length;
              const pct = Math.round((learned / words.length) * 100);
              return (
                <button
                  key={topic.id}
                  onClick={() => onTopicClick?.(topic.id)}
                  className={`text-left rounded-xl p-3 bg-gradient-to-br ${topic.color} text-white hover:scale-[1.02] transition-transform`}
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
              );
            })}
          </div>
        </Card>
      </div>

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
            <span>Ôn lại theo SRS đúng hạn để chuyển từ vựng vào trí nhớ dài hạn.</span>
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

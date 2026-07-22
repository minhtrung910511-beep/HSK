"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Flame, Zap, Target, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

type Tab = "diligence" | "quiz" | "matching";

interface DiligenceRow {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  totalScore: number;
  playCount: number;
}

interface ModuleRow {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  score: number;
  at: string;
}

export function Leaderboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("diligence");
  const [diligence, setDiligence] = useState<DiligenceRow[]>([]);
  const [quiz, setQuiz] = useState<ModuleRow[]>([]);
  const [matching, setMatching] = useState<ModuleRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [d, q, m] = await Promise.all([
        fetch("/api/scores?limit=20").then((r) => r.json()),
        fetch("/api/scores?module=quiz&limit=20").then((r) => r.json()),
        fetch("/api/scores?module=matching&limit=20").then((r) => r.json()),
      ]);
      setDiligence(d.leaderboard || []);
      setQuiz(q.leaderboard || []);
      setMatching(m.leaderboard || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; gradient: string }[] = [
    { id: "diligence", label: "Chăm chỉ tổng", icon: <Flame className="h-4 w-4" />, gradient: "from-orange-400 to-red-400" },
    { id: "quiz",      label: "Quiz Top",     icon: <Trophy className="h-4 w-4" />, gradient: "from-violet-400 to-fuchsia-400" },
    { id: "matching",  label: "Matching Top", icon: <Zap className="h-4 w-4" />,   gradient: "from-teal-400 to-cyan-400" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.id
                ? `bg-gradient-to-r ${t.gradient} text-white shadow`
                : "bg-white text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
        <Button variant="ghost" size="icon" onClick={fetchAll} disabled={loading} className="ml-auto">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Bảng xếp hạng */}
      <Card className="p-4 md:p-6 border-0 bg-white shadow-sm">
        {tab === "diligence" && (
          <DiligenceBoard rows={diligence} currentUserId={user?.id} loading={loading} />
        )}
        {tab === "quiz" && (
          <ModuleBoard
            title="🏆 Bảng xếp hạng Quiz"
            description="Top điểm cao nhất mỗi người - 10 câu trắc nghiệm • max(0, 1000 - thời_gian×5 + đúng×50) + 200 nếu perfect"
            rows={quiz}
            currentUserId={user?.id}
            loading={loading}
            scoreLabel="Điểm"
            gradient="from-violet-500 to-fuchsia-500"
            emptyText="Chưa có ai làm quiz. Hãy là người đầu tiên!"
          />
        )}
        {tab === "matching" && (
          <ModuleBoard
            title="⚡ Bảng xếp hạng Matching"
            description="Top điểm cao nhất mỗi người - Game ghép cặp (càng nhanh điểm càng cao)"
            rows={matching}
            currentUserId={user?.id}
            loading={loading}
            scoreLabel="Điểm"
            gradient="from-teal-500 to-cyan-500"
            emptyText="Chưa có ai chơi ghép cặp. Hãy là người đầu tiên!"
          />
        )}
      </Card>

      {/* Quy tắc tính điểm */}
      <Card className="p-4 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-amber-500" />
          Cách tính điểm chăm chỉ
        </h3>
        <ul className="text-sm text-foreground/80 space-y-1">
          <li>• <b>Quiz</b>: <code>max(0, 1000 - thời_gian×5 + đúng×50)</code> + bonus 200 nếu trả lời đúng hết 10 câu</li>
          <li>• <b>Matching</b>: <code>max(0, 1000 - thời_gian×5 + mạng_còn×100)</code></li>
          <li>• <b>Flashcard</b>: Mỗi từ ôn lại được +1 điểm chăm chỉ</li>
          <li>• <b>Tổng điểm chăm chỉ</b> = Quiz + Matching + Flashcard (cộng dồn tất cả các lần chơi)</li>
        </ul>
      </Card>
    </div>
  );
}

function DiligenceBoard({
  rows,
  currentUserId,
  loading,
}: {
  rows: DiligenceRow[];
  currentUserId?: string;
  loading: boolean;
}) {
  if (loading && rows.length === 0) return <LoadingSkeleton />;
  if (rows.length === 0) {
    return (
      <EmptyState
        title="Chưa có ai trong bảng xếp hạng"
        subtitle="Hãy đăng nhập và bắt đầu học để xuất hiện ở đây!"
      />
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🔥 Bảng xếp hạng Chăm chỉ</h3>
        <Badge variant="secondary">{rows.length} người</Badge>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <DiligenceRow key={r.userId} row={r} isMe={r.userId === currentUserId} top3={i < 3} />
        ))}
      </div>
    </div>
  );
}

function DiligenceRow({ row, isMe, top3 }: { row: DiligenceRow; isMe: boolean; top3: boolean }) {
  const medal = row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        isMe
          ? "bg-gradient-to-r from-violet-100 to-fuchsia-100 border-2 border-violet-300"
          : top3
          ? "bg-amber-50/50"
          : "hover:bg-muted/50"
      }`}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted font-bold shrink-0">
        {medal || <span className="text-sm">#{row.rank}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate">
            {row.displayName}
            {isMe && <Badge className="ml-2 bg-violet-500 text-white border-0 hover:bg-violet-500 text-xs">Bạn</Badge>}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">@{row.username} • {row.playCount} lần chơi</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-lg bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {row.totalScore.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">điểm chăm chỉ</div>
      </div>
    </motion.div>
  );
}

function ModuleBoard({
  title,
  description,
  rows,
  currentUserId,
  loading,
  scoreLabel,
  gradient,
  emptyText,
}: {
  title: string;
  description: string;
  rows: ModuleRow[];
  currentUserId?: string;
  loading: boolean;
  scoreLabel: string;
  gradient: string;
  emptyText: string;
}) {
  if (loading && rows.length === 0) return <LoadingSkeleton />;
  if (rows.length === 0) {
    return <EmptyState title="Chưa có dữ liệu" subtitle={emptyText} />;
  }
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const medal = r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : null;
          const isMe = r.userId === currentUserId;
          return (
            <motion.div
              key={r.userId + r.at}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isMe
                  ? "bg-gradient-to-r from-violet-100 to-fuchsia-100 border-2 border-violet-300"
                  : r.rank <= 3
                  ? "bg-amber-50/50"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted font-bold shrink-0">
                {medal || <span className="text-sm">#{r.rank}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">
                    {r.displayName}
                    {isMe && <Badge className="ml-2 bg-violet-500 text-white border-0 hover:bg-violet-500 text-xs">Bạn</Badge>}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  @{r.username} • {new Date(r.at).toLocaleDateString("vi-VN")}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-lg bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {r.score}
                </div>
                <div className="text-xs text-muted-foreground">{scoreLabel}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-3">📊</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">{subtitle}</p>
    </div>
  );
}

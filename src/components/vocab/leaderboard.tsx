"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Flame, Zap, Target, RefreshCw, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

type Tab = "diligence" | "quiz" | "matching";
type Range = "daily" | "weekly" | "monthly" | "all";
type QuizSub = "all" | "easy" | "normal" | "hard";
type MatchingSub = "all" | "han-vi" | "han-pinyin" | "vi-han" | "vi-pinyin" | "blank-han";

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
  const [range, setRange] = useState<Range>("all");
  const [quizSub, setQuizSub] = useState<QuizSub>("all");
  const [matchingSub, setMatchingSub] = useState<MatchingSub>("all");
  const [diligence, setDiligence] = useState<DiligenceRow[]>([]);
  const [quiz, setQuiz] = useState<ModuleRow[]>([]);
  const [matching, setMatching] = useState<ModuleRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const rangeQuery = range !== "all" ? `&range=${range}` : "";
      const quizSubQuery = quizSub !== "all" ? `&sub=${quizSub}` : "";
      const matchingSubQuery = matchingSub !== "all" ? `&sub=${matchingSub}` : "";
      const [d, q, m] = await Promise.all([
        fetch(`/api/scores?limit=500${rangeQuery}`).then((r) => r.json()),
        fetch(`/api/scores?module=quiz&limit=500${rangeQuery}${quizSubQuery}`).then((r) => r.json()),
        fetch(`/api/scores?module=matching&limit=500${rangeQuery}${matchingSubQuery}`).then((r) => r.json()),
      ]);
      setDiligence(d.leaderboard || []);
      setQuiz(q.leaderboard || []);
      setMatching(m.leaderboard || []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [range, quizSub, matchingSub]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Auto-refresh mỗi 30 giây (giảm load DB - trước là 5s)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAll();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Refresh khi tab được hiển thị lại
  useEffect(() => {
    const handler = () => {
      if (!document.hidden) fetchAll();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [fetchAll]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; gradient: string }[] = [
    { id: "diligence", label: "Chăm chỉ tổng", icon: <Flame className="h-4 w-4" />, gradient: "from-orange-400 to-red-400" },
    { id: "quiz",      label: "Quiz Top",     icon: <Trophy className="h-4 w-4" />, gradient: "from-violet-400 to-fuchsia-400" },
    { id: "matching",  label: "Matching Top", icon: <Zap className="h-4 w-4" />,   gradient: "from-teal-400 to-cyan-400" },
  ];

  const ranges: { id: Range; label: string }[] = [
    { id: "daily",   label: "Hôm nay" },
    { id: "weekly",  label: "Tuần này" },
    { id: "monthly", label: "Tháng này" },
    { id: "all",     label: "Tất cả" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs - module */}
      <div className="flex gap-2 flex-wrap items-center">
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

      {/* Range tabs - thời gian */}
      <Card className="p-3 border-0 bg-white/70 backdrop-blur shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground mr-1">Khoảng thời gian:</span>
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                range === r.id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow"
                  : "bg-white text-foreground border border-border hover:bg-indigo-50 hover:border-indigo-300"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Bảng xếp hạng */}
      <Card className="p-4 md:p-6 border-0 bg-white shadow-sm">
        {tab === "diligence" && (
          <DiligenceBoard rows={diligence} currentUserId={user?.id} loading={loading} />
        )}
        {tab === "quiz" && (
          <>
            {/* Sub-tabs cho Quiz: độ khó */}
            <div className="flex gap-2 flex-wrap mb-4">
              {([
                { id: "all", label: "Tất cả" },
                { id: "easy", label: "🟢 Dễ (0.5X)" },
                { id: "normal", label: "🟡 Thường (1X)" },
                { id: "hard", label: "🔴 Khó (2X)" },
              ] as { id: QuizSub; label: string }[]).map(s => (
                <button
                  key={s.id}
                  onClick={() => setQuizSub(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    quizSub === s.id
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow"
                      : "bg-white text-foreground border border-border hover:bg-violet-50 hover:border-violet-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <ModuleBoard
              title="🏆 Bảng xếp hạng Quiz"
              description={
                quizSub === "all"
                  ? "Top điểm cao nhất mỗi người - Tất cả độ khó • Câu sai = 0 điểm"
                  : quizSub === "easy"
                  ? "Top điểm độ khó Dễ (0.5X) • Chỉ Pinyin→Nghĩa • Câu sai = 0 điểm"
                  : quizSub === "hard"
                  ? "Top điểm độ khó Khó (2X) • Chỉ điền chỗ trống • Câu sai = 0 điểm"
                  : "Top điểm độ khó Thường (1X) • Mix 3 dạng • Câu sai = 0 điểm"
              }
              rows={quiz}
              currentUserId={user?.id}
              loading={loading}
              scoreLabel="Điểm"
              gradient="from-violet-500 to-fuchsia-500"
              emptyText="Chưa có ai làm quiz dạng này. Hãy là người đầu tiên!"
            />
          </>
        )}
        {tab === "matching" && (
          <>
            {/* Sub-tabs cho Matching: dạng ghép cặp */}
            <div className="flex gap-2 flex-wrap mb-4">
              {([
                { id: "all", label: "Tất cả" },
                { id: "han-vi", label: "🔤 Hán↔Nghĩa (1X)" },
                { id: "han-pinyin", label: "🎵 Hán↔Pinyin (1X)" },
                { id: "vi-han", label: "✍️ Nghĩa→Hán (1X)" },
                { id: "vi-pinyin", label: "💬 Nghĩa↔Pinyin (0.5X)" },
                { id: "blank-han", label: "📝 Câu＿↔Hán (2X)" },
              ] as { id: MatchingSub; label: string }[]).map(s => (
                <button
                  key={s.id}
                  onClick={() => setMatchingSub(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    matchingSub === s.id
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow"
                      : "bg-white text-foreground border border-border hover:bg-teal-50 hover:border-teal-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <ModuleBoard
              title="⚡ Bảng xếp hạng Matching"
              description={
                matchingSub === "all"
                  ? "Top điểm cao nhất mỗi người - Tất cả dạng ghép cặp • Thua = 0 điểm"
                  : `Top điểm dạng ${matchingSub === "han-vi" ? "Hán↔Nghĩa (1X)" : matchingSub === "han-pinyin" ? "Hán↔Pinyin (1X)" : matchingSub === "vi-han" ? "Nghĩa→Hán (1X)" : matchingSub === "vi-pinyin" ? "Nghĩa↔Pinyin (0.5X)" : "Câu＿↔Hán tự (2X)"} • Thua = 0 điểm`
              }
              rows={matching}
              currentUserId={user?.id}
              loading={loading}
              scoreLabel="Điểm"
              gradient="from-teal-500 to-cyan-500"
              emptyText="Chưa có ai chơi dạng này. Hãy là người đầu tiên!"
            />
          </>
        )}
      </Card>

      {/* Quy tắc tính điểm */}
      <Card className="p-4 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-amber-500" />
          Cách tính điểm chăm chỉ
        </h3>
        <ul className="text-sm text-foreground/80 space-y-1">
          <li>• <b>Quiz</b>: <code>max(0, đúng×100 - thời_gian×3 + 200 nếu perfect)</code> × hệ số độ khó • <b>0.5X (Dễ - Pinyin→Nghĩa)</b>, <b>1X (Thường - mix 3 dạng)</b>, <b>2X (Khó - điền chỗ trống)</b> • Câu sai = 0 điểm</li>
          <li>• <b>Matching</b>: <code>max(0, mạng_còn×200 - thời_gian×3 + 200)</code> nếu thắng, <b>0 điểm nếu thua</b> • Hệ số: 1X, 0.5X (Nghĩa-Pinyin), 2X (Câu-Hán tự)</li>
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
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  // Reset page khi rows đổi
  useEffect(() => {
    setPage(1);
  }, [rows.length]);

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
        <Badge variant="secondary">{rows.length} người • Trang {safePage}/{totalPages}</Badge>
      </div>
      <div className="space-y-2">
        {pageRows.map((r) => {
          const globalRank = start + pageRows.indexOf(r) + 1;
          return (
            <DiligenceRowItem
              key={r.userId}
              row={r}
              rank={globalRank}
              isMe={r.userId === currentUserId}
              top3={globalRank <= 3}
            />
          );
        })}
      </div>
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}

function DiligenceRowItem({ row, rank, isMe, top3 }: { row: DiligenceRow; rank: number; isMe: boolean; top3: boolean }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
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
        {medal || <span className="text-sm">#{rank}</span>}
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
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  // Reset page khi rows đổi
  useEffect(() => {
    setPage(1);
  }, [rows.length]);

  if (loading && rows.length === 0) return <LoadingSkeleton />;
  if (rows.length === 0) {
    return <EmptyState title="Chưa có dữ liệu" subtitle={emptyText} />;
  }
  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-2 flex-wrap">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge variant="secondary">{rows.length} người • Trang {safePage}/{totalPages}</Badge>
      </div>
      <div className="space-y-2">
        {pageRows.map((r, i) => {
          const globalRank = start + i + 1;
          const medal = globalRank === 1 ? "🥇" : globalRank === 2 ? "🥈" : globalRank === 3 ? "🥉" : null;
          const isMe = r.userId === currentUserId;
          return (
            <motion.div
              key={r.userId + r.at}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isMe
                  ? "bg-gradient-to-r from-violet-100 to-fuchsia-100 border-2 border-violet-300"
                  : globalRank <= 3
                  ? "bg-amber-50/50"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted font-bold shrink-0">
                {medal || <span className="text-sm">#{globalRank}</span>}
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
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}

// Component phân trang dùng chung
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-dashed border-border">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(1)}
        disabled={page === 1}
        className="gap-1"
      >
        « Đầu
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        ← Trước
      </Button>
      <span className="text-sm font-medium px-3 py-1 rounded-lg bg-muted">
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Sau →
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        className="gap-1"
      >
        Cuối »
      </Button>
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

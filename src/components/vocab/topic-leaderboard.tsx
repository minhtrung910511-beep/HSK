"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { TopicId, getTopic } from "@/lib/vocab-data";

interface Row {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  score: number;
  at: string;
}

interface TopicLeaderboardProps {
  topicId: TopicId;
  refreshKey?: number;
}

export function TopicLeaderboard({ topicId, refreshKey = 0 }: TopicLeaderboardProps) {
  const { user } = useAuth();
  const topic = getTopic(topicId);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLb = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/scores?module=flashcard_review&topic=${topicId}&limit=10`, { credentials: "same-origin" });
      const data = await res.json();
      setRows(data.leaderboard || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, refreshKey]);

  return (
    <Card className="p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <Trophy className="h-4 w-4 text-amber-500" />
          Bảng xếp hạng {topic.emoji} {topic.name}
        </h4>
        <Button size="sm" variant="ghost" onClick={fetchLb} disabled={loading} className="h-7 px-2 text-xs">
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <div className="text-3xl mb-2">🏅</div>
          Chưa có ai lên bảng xếp hạng chủ đề này.
          <br />
          Hãy là người đầu tiên!
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
          {rows.map((r) => {
            const isMe = user?.id === r.userId;
            const rankIcon = r.rank === 1
              ? <Crown className="h-4 w-4 text-yellow-500" />
              : r.rank === 2
              ? <Medal className="h-4 w-4 text-gray-400" />
              : r.rank === 3
              ? <Medal className="h-4 w-4 text-amber-700" />
              : <span className="text-xs text-muted-foreground w-4 text-center">{r.rank}</span>;
            const bg = r.rank === 1
              ? "bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300"
              : r.rank === 2
              ? "bg-gradient-to-r from-gray-50 to-slate-100 border-gray-300"
              : r.rank === 3
              ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300"
              : isMe
              ? "bg-violet-50 border-violet-300"
              : "bg-white/60 border-transparent";
            return (
              <motion.div
                key={r.userId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between gap-3 p-2 rounded-lg border ${bg} ${isMe ? "ring-1 ring-violet-300" : ""}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 flex justify-center">{rankIcon}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate flex items-center gap-1">
                      {r.displayName}
                      {isMe && <Badge className="bg-violet-500 text-white border-0 text-[10px] px-1.5 py-0">Bạn</Badge>}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">@{r.username}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {r.score.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(r.at).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

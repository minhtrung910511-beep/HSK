"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Check, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VOCAB, VocabWord } from "@/lib/vocab-data";
import { useAuth } from "@/hooks/use-auth";

interface MatchingProps {
  pairCount?: number;
  onComplete?: (score: number) => void;
  onServerSubmit?: (score: number, detail: { time: number; lives: number }) => Promise<unknown>;
}

interface Cell {
  id: string;
  wordId: number;
  side: "han" | "vi";
  text: string;
  pinyin?: string;
  emoji?: string;
}

const DEFAULT_PAIR_COUNT = 6;
const MAX_LIVES = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Matching({ pairCount = DEFAULT_PAIR_COUNT, onComplete, onServerSubmit }: MatchingProps) {
  const { user, loading: authLoading } = useAuth();
  const [phase, setPhase] = useState<"intro" | "playing" | "won" | "lost">("intro");
  const [cells, setCells] = useState<Cell[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Cell | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [lives, setLives] = useState(MAX_LIVES);
  const [seconds, setSeconds] = useState(0);
  const completedRef = useRef(false);

  const start = useCallback(() => {
    const pool = shuffle(VOCAB).slice(0, pairCount);
    const hanCells: Cell[] = pool.map(w => ({
      id: `h-${w.id}`,
      wordId: w.id,
      side: "han",
      text: w.han,
      pinyin: w.pinyin,
      emoji: w.emoji || w.meaning, // Fallback: nếu không có emoji, dùng meaning
    }));
    const viCells: Cell[] = pool.map(w => ({
      id: `v-${w.id}`,
      wordId: w.id,
      side: "vi",
      text: w.meaning,
    }));
    setCells(shuffle([...hanCells, ...viCells]));
    setMatched(new Set());
    setSelected(null);
    setLives(MAX_LIVES);
    setSeconds(0);
    setPhase("playing");
    completedRef.current = false;
  }, [pairCount]);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // Win check - chỉ set phase, onComplete được gọi ở effect riêng
  useEffect(() => {
    if (phase !== "playing") return;
    if (cells.length > 0 && matched.size === cells.length) {
      setPhase("won");
    }
  }, [matched, cells.length, phase]);

  // Lose check
  useEffect(() => {
    if (phase !== "playing") return;
    if (lives <= 0) setPhase("lost");
  }, [lives, phase]);

  // Gọi onComplete 1 lần duy nhất khi vào phase won (tránh crash do parent setState)
  useEffect(() => {
    if (phase === "won" && !completedRef.current) {
      completedRef.current = true;
      const score = Math.max(0, 1000 - seconds * 5 + lives * 100);
      onComplete?.(score);
      if (onServerSubmit) {
        onServerSubmit(score, { time: seconds, lives }).catch(() => {});
      }
    }
    if (phase !== "won") {
      completedRef.current = false;
    }
  }, [phase, seconds, lives, onComplete, onServerSubmit]);

  const handleClick = (cell: Cell) => {
    if (matched.has(cell.id)) return;
    if (wrongPair) return;

    if (!selected) {
      setSelected(cell);
      return;
    }

    if (selected.id === cell.id) {
      setSelected(null);
      return;
    }

    // Cùng side -> đổi lựa chọn
    if (selected.side === cell.side) {
      setSelected(cell);
      return;
    }

    // Khác side - kiểm tra ghép
    if (selected.wordId === cell.wordId) {
      // Đúng
      const newMatched = new Set(matched);
      newMatched.add(selected.id);
      newMatched.add(cell.id);
      setMatched(newMatched);
      setSelected(null);
    } else {
      // Sai
      setWrongPair([selected.id, cell.id]);
      setLives(l => l - 1);
      setTimeout(() => {
        setWrongPair(null);
        setSelected(null);
      }, 800);
    }
  };

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-teal-100 via-cyan-50 to-sky-100 border-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <Check className="h-10 w-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Ghép cặp từ</h3>
          <p className="text-muted-foreground max-w-md">
            Ghép {pairCount} cặp Hán tự ↔ Nghĩa tiếng Việt. {MAX_LIVES} mạng, càng nhanh điểm càng cao!
          </p>
        </div>
        {!user && !authLoading && (
          <div className="w-full p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-sm flex items-center gap-2 justify-center">
            <span>⚠️</span>
            <span>Bạn chưa đăng nhập. Điểm sẽ <b>không lưu</b> lên bảng xếp hạng.</span>
          </div>
        )}
        <Button size="lg" onClick={start} className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:opacity-90">
          Bắt đầu ghép cặp <RotateCcw className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  // ===== WON / LOST =====
  if (phase === "won" || phase === "lost") {
    const score = phase === "won" ? Math.max(0, 1000 - seconds * 5 + lives * 100) : 0;
    return (
      <Card className={`p-8 flex flex-col items-center gap-6 text-center border-0 ${phase === "won" ? "bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100" : "bg-gradient-to-br from-rose-100 via-pink-50 to-red-100"}`}>
        <div className="text-7xl">{phase === "won" ? "🏆" : "💔"}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">
            {phase === "won" ? "Chiến thắng!" : "Hết mạng!"}
          </h3>
          <p className="text-muted-foreground">
            {phase === "won" ? `Hoàn thành trong ${seconds}s, còn ${lives} mạng` : "Đừng nản, thử lại nhé!"}
          </p>
        </div>
        {phase === "won" && (
          <div className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            {score} điểm
          </div>
        )}
        <div className="flex gap-3">
          <Button onClick={start} className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
            <RotateCcw className="h-4 w-4" /> Chơi lại
          </Button>
          <Button variant="outline" onClick={() => setPhase("intro")}>
            Về trang ghép cặp
          </Button>
        </div>
      </Card>
    );
  }

  // ===== PLAYING =====
  return (
    <div className="flex flex-col gap-5">
      {/* HUD */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <Heart
              key={i}
              className={`h-5 w-5 ${i < lives ? "fill-rose-500 text-rose-500" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Badge className="gap-1 bg-sky-100 text-sky-700 border-0 hover:bg-sky-100">
            <Timer className="h-3.5 w-3.5" /> {seconds}s
          </Badge>
          <Badge className="gap-1 bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-100">
            <Check className="h-3.5 w-3.5" /> {matched.size / 2}/{pairCount}
          </Badge>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {cells.map(cell => {
          const isMatched = matched.has(cell.id);
          const isSelected = selected?.id === cell.id;
          const isWrong = wrongPair?.includes(cell.id);
          return (
            <motion.button
              key={cell.id}
              layout
              onClick={() => handleClick(cell)}
              className={`relative rounded-2xl p-4 md:p-5 min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center gap-1 transition-all border-2 ${
                isMatched
                  ? "bg-emerald-100 border-emerald-300 opacity-50"
                  : isWrong
                  ? "bg-rose-100 border-rose-400 animate-pulse"
                  : isSelected
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 border-violet-600 text-white shadow-lg scale-105"
                  : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-md"
              }`}
              disabled={isMatched}
            >
              {cell.side === "han" ? (
                <>
                  <div className="text-3xl">{cell.emoji}</div>
                  <div className="text-2xl md:text-3xl font-bold">{cell.text}</div>
                  {!isMatched && (
                    <div className={`text-xs italic ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                      {cell.pinyin}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-base md:text-lg font-semibold text-center">{cell.text}</div>
              )}
              {isMatched && <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-600" />}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Nhấp vào 1 từ Hán và 1 nghĩa tiếng Việt để ghép cặp
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Check, Heart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VocabWord } from "@/lib/vocab-data";
import { useVocab } from "@/lib/vocab-context";
import { useAuth } from "@/hooks/use-auth";

interface MatchingProps {
  pairCount?: number;
  onComplete?: (score: number) => void;
  onServerSubmit?: (score: number, detail: { time: number; lives: number; mode?: string }) => Promise<unknown>;
}

interface Cell {
  id: string;
  wordId: number;
  side: "han" | "vi" | "pinyin" | "blank";
  text: string;
}

type MatchingMode = "han-vi" | "han-pinyin" | "vi-pinyin" | "blank-han" | "vi-han";

const DEFAULT_PAIR_COUNT = 6;
const MAX_LIVES = 3;

// Hệ số điểm theo mode:
// - han-vi, han-pinyin, vi-han: 1X (bình thường)
// - vi-pinyin: 0.5X (dễ hơn)
// - blank-han: 2X (khó hơn)
function getModeMultiplier(mode: MatchingMode): number {
  if (mode === "vi-pinyin") return 0.5;
  if (mode === "blank-han") return 2;
  return 1;
}

// Phương án 1: Chỉ win mới có điểm. Nếu thua (hết mạng) = 0 điểm.
// lives còn nhiều = bonus, seconds ít = bonus
function computeMatchingScore(mode: MatchingMode, seconds: number, lives: number, won: boolean): number {
  const raw = won ? Math.max(0, lives * 200 - seconds * 3 + 200) : 0;
  const multiplier = getModeMultiplier(mode);
  return Math.floor(raw * multiplier * 10) / 10;
}

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
  const vocab = useVocab();
  const [phase, setPhase] = useState<"intro" | "playing" | "won" | "lost">("intro");
  const [mode, setMode] = useState<MatchingMode>("han-vi");
  const [cells, setCells] = useState<Cell[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Cell | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [lives, setLives] = useState(MAX_LIVES);
  const [seconds, setSeconds] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const start = useCallback(() => {
    let poolWords = vocab;
    if (mode === "blank-han") {
      poolWords = vocab.filter(w => {
        const ex = w.example || "";
        return ex && ex.includes(w.han) && ex.length > w.han.length;
      });
    }
    const pool = shuffle(poolWords).slice(0, Math.min(pairCount, poolWords.length));

    const leftCells: Cell[] = [];
    const rightCells: Cell[] = [];

    pool.forEach(w => {
      if (mode === "han-vi") {
        leftCells.push({ id: `h-${w.id}`, wordId: w.id, side: "han", text: w.han });
        rightCells.push({ id: `v-${w.id}`, wordId: w.id, side: "vi", text: w.meaning });
      } else if (mode === "han-pinyin") {
        leftCells.push({ id: `h-${w.id}`, wordId: w.id, side: "han", text: w.han });
        rightCells.push({ id: `p-${w.id}`, wordId: w.id, side: "pinyin", text: w.pinyin });
      } else if (mode === "vi-pinyin") {
        leftCells.push({ id: `v-${w.id}`, wordId: w.id, side: "vi", text: w.meaning });
        rightCells.push({ id: `p-${w.id}`, wordId: w.id, side: "pinyin", text: w.pinyin });
      } else if (mode === "vi-han") {
        // Điền chữ Hán theo nghĩa tiếng Việt
        leftCells.push({ id: `v-${w.id}`, wordId: w.id, side: "vi", text: w.meaning });
        rightCells.push({ id: `h-${w.id}`, wordId: w.id, side: "han", text: w.han });
      } else {
        const blank = (w.example || "").replace(w.han, "＿＿＿");
        leftCells.push({ id: `b-${w.id}`, wordId: w.id, side: "blank", text: blank });
        rightCells.push({ id: `h-${w.id}`, wordId: w.id, side: "han", text: w.han });
      }
    });

    setCells(shuffle([...leftCells, ...rightCells]));
    setMatched(new Set());
    setSelected(null);
    setLives(MAX_LIVES);
    setSeconds(0);
    startTimeRef.current = Date.now();
    setPhase("playing");
    completedRef.current = false;
  }, [pairCount, vocab, mode]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => {
      if (startTimeRef.current) {
        setSeconds((Date.now() - startTimeRef.current) / 1000);
      }
    }, 10);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    if (cells.length > 0 && matched.size === cells.length) {
      setPhase("won");
    }
  }, [matched, cells.length, phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    if (lives <= 0) setPhase("lost");
  }, [lives, phase]);

  useEffect(() => {
    if (phase === "won" && !completedRef.current) {
      completedRef.current = true;
      const score = computeMatchingScore(mode, seconds, lives, true);
      onComplete?.(score);
      if (onServerSubmit) {
        onServerSubmit(score, { time: seconds, lives, mode }).catch(() => {});
      }
    }
    if (phase !== "won") {
      completedRef.current = false;
    }
  }, [phase, seconds, lives, mode, onComplete, onServerSubmit]);

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

    if (selected.side === cell.side) {
      setSelected(cell);
      return;
    }

    if (selected.wordId === cell.wordId) {
      const newMatched = new Set(matched);
      newMatched.add(selected.id);
      newMatched.add(cell.id);
      setMatched(newMatched);
      setSelected(null);
    } else {
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
    const modeOptions: { id: MatchingMode; label: string; desc: string; emoji: string }[] = [
      { id: "han-vi", label: "Hán tự ↔ Nghĩa", desc: "Ghép chữ Hán với nghĩa tiếng Việt • 1X điểm", emoji: "🔤" },
      { id: "han-pinyin", label: "Hán tự ↔ Pinyin", desc: "Ghép chữ Hán với phiên âm pinyin • 1X điểm", emoji: "🎵" },
      { id: "vi-han", label: "Điền Hán tự theo Nghĩa", desc: "Thấy nghĩa tiếng Việt → điền chữ Hán • 1X điểm", emoji: "✍️" },
      { id: "vi-pinyin", label: "Nghĩa ↔ Pinyin", desc: "Ghép nghĩa tiếng Việt với pinyin • 0.5X điểm (dễ)", emoji: "💬" },
      { id: "blank-han", label: "Câu ＿ ↔ Hán tự", desc: "Ghép câu có chỗ trống với Hán tự cần điền • 2X điểm (khó)", emoji: "📝" },
    ];
    return (
      <Card className="p-8 flex flex-col items-center gap-6 text-center bg-gradient-to-br from-teal-100 via-cyan-50 to-sky-100 border-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <Check className="h-10 w-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Ghép cặp từ</h3>
          <p className="text-muted-foreground max-w-md">
            Chọn dạng ghép cặp • {pairCount} cặp • {MAX_LIVES} mạng • Càng nhanh điểm càng cao!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
          {modeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              className={`p-3 rounded-xl text-left transition-all border-2 ${
                mode === opt.id
                  ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-teal-600 shadow"
                  : "bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm"
              }`}
            >
              <div className="font-semibold text-sm flex items-center gap-1">
                <span>{opt.emoji}</span> {opt.label}
              </div>
              <div className={`text-xs mt-1 ${mode === opt.id ? "text-white/80" : "text-muted-foreground"}`}>
                {opt.desc}
              </div>
            </button>
          ))}
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
    const score = computeMatchingScore(mode, seconds, lives, phase === "won");
    const multiplier = getModeMultiplier(mode);
    const multiplierLabel = multiplier === 2 ? "2X" : multiplier === 0.5 ? "0.5X" : "1X";
    return (
      <Card className={`p-8 flex flex-col items-center gap-6 text-center border-0 ${phase === "won" ? "bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100" : "bg-gradient-to-br from-rose-100 via-pink-50 to-red-100"}`}>
        <div className="text-7xl">{phase === "won" ? "🏆" : "💔"}</div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1">
            {phase === "won" ? "Chiến thắng!" : "Hết mạng!"}
          </h3>
          <p className="text-muted-foreground">
            {phase === "won" ? `Hoàn thành trong ${seconds.toFixed(1)}s, còn ${lives} mạng` : "Đừng nản, thử lại nhé!"}
          </p>
        </div>
        {phase === "won" && (
          <>
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {score.toFixed(1)} điểm
            </div>
            <Badge className={`text-sm px-3 py-1 border-0 ${
              multiplier === 2 ? "bg-rose-100 text-rose-700"
              : multiplier === 0.5 ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-700"
            }`}>
              Hệ số {multiplierLabel} {multiplier === 2 ? "• Dạng khó" : multiplier === 0.5 ? "• Dạng dễ" : "• Dạng thường"}
            </Badge>
          </>
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
            <Timer className="h-3.5 w-3.5" /> {seconds.toFixed(1)}s
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
          const blankCls = cell.side === "blank" ? "min-h-[140px] md:min-h-[160px]" : "min-h-[100px] md:min-h-[120px]";
          return (
            <motion.button
              key={cell.id}
              layout
              onClick={() => handleClick(cell)}
              className={`relative rounded-2xl p-4 md:p-5 ${blankCls} flex flex-col items-center justify-center gap-1 transition-all border-2 ${
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
                <div className="text-2xl md:text-3xl font-bold">{cell.text}</div>
              ) : cell.side === "pinyin" ? (
                <div className="text-xl md:text-2xl italic font-semibold">{cell.text}</div>
              ) : cell.side === "blank" ? (
                <div className="text-base md:text-lg font-medium text-center leading-relaxed">{cell.text}</div>
              ) : (
                <div className="text-base md:text-lg font-semibold text-center">{cell.text}</div>
              )}
              {isMatched && <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-600" />}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        {mode === "han-vi" && "Nhấp 1 Hán tự + 1 nghĩa tiếng Việt để ghép"}
        {mode === "han-pinyin" && "Nhấp 1 Hán tự + 1 pinyin để ghép"}
        {mode === "vi-han" && "Nhấp 1 nghĩa tiếng Việt + 1 Hán tự tương ứng để ghép"}
        {mode === "vi-pinyin" && "Nhấp 1 nghĩa tiếng Việt + 1 pinyin để ghép"}
        {mode === "blank-han" && "Nhấp 1 câu có ＿ + 1 Hán tự để điền vào chỗ trống"}
      </div>
    </div>
  );
}

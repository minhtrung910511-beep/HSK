import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/scores/me - tổng điểm + điểm theo từng module của user hiện tại
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ user: null, stats: null });

    const scores = await db.score.findMany({
      where: { userId: user.id },
      select: { module: true, score: true, detail: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    // Tính tổng + best theo từng module
    const stats = {
      total: 0,
      quizBest: 0,
      quizPlays: 0,
      matchingBest: 0,
      matchingPlays: 0,
      flashcardReviews: 0,
      flashcardWords: 0,
      recent: scores.slice(0, 10),
    };

    for (const s of scores) {
      stats.total += s.score;
      if (s.module === "quiz") {
        stats.quizPlays += 1;
        if (s.score > stats.quizBest) stats.quizBest = s.score;
      } else if (s.module === "matching") {
        stats.matchingPlays += 1;
        if (s.score > stats.matchingBest) stats.matchingBest = s.score;
      } else if (s.module === "flashcard_review") {
        stats.flashcardReviews += 1;
        stats.flashcardWords += s.score;
      }
    }

    return NextResponse.json({ user, stats });
  } catch (e) {
    console.error("scores/me error", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

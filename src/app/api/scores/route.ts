import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// POST: nộp điểm số sau khi chơi quiz/matching/flashcard review
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      console.error("[POST /api/scores] No user - not authenticated");
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }
    const body = await req.json();
    const scoreModule = (body.module || "").toString();
    const score = Math.floor(parseFloat(body.score) * 10) / 10;
    const detail = body.detail ? JSON.stringify(body.detail) : null;

    console.log(`[POST /api/scores] user=${user.displayName}, module=${scoreModule}, score=${score}, detail=${detail}`);

    if (!["quiz", "matching", "flashcard_review", "advanced_quiz"].includes(scoreModule)) {
      console.error(`[POST /api/scores] Invalid module: ${scoreModule}`);
      return NextResponse.json({ error: "Module không hợp lệ" }, { status: 400 });
    }
    if (isNaN(score) || score < 0) {
      console.error(`[POST /api/scores] Invalid score: ${score}`);
      return NextResponse.json({ error: "Điểm không hợp lệ" }, { status: 400 });
    }

    const created = await db.score.create({
      data: { userId: user.id, module: scoreModule, score, detail },
    });
    console.log(`[POST /api/scores] ✓ Saved: id=${created.id}, score=${created.score}`);
    return NextResponse.json({ ok: true, score: created });
  } catch (e) {
    console.error("[POST /api/scores] ERROR:", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

// GET: lấy leaderboard tổng (chăm chỉ) - tổng điểm tất cả module của mỗi user
// Query params:
//   module: "quiz" | "matching" | undefined (undefined = all = diligence)
//   limit: số user tối đa trả về
//   range: "all" | "daily" | "weekly" | "monthly" (filter theo thời gian)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const scoreModule = url.searchParams.get("module");
  const topicFilter = url.searchParams.get("topic");
  const subFilter = url.searchParams.get("sub");
  const limit = Math.max(1, Math.min(parseInt(url.searchParams.get("limit") || "100", 10), 1000));
  const range = url.searchParams.get("range") || "all";

  // Tính thời điểm bắt đầu dựa trên range
  let since: Date | undefined;
  if (range === "daily") {
    // Đầu ngày hôm nay (00:00:00)
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    since = d;
  } else if (range === "weekly") {
    // 7 ngày trước
    const d = new Date();
    d.setDate(d.getDate() - 7);
    since = d;
  } else if (range === "monthly") {
    // Đầu tháng này
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    since = d;
  }

  const timeFilter = since ? { createdAt: { gte: since } } : {};

  try {
    if (scoreModule) {
      let allRows = await db.score.findMany({
        where: { module: scoreModule, ...timeFilter },
        include: { user: { select: { username: true, displayName: true } } },
        orderBy: { score: "desc" },
      });

      // Topic filter (chỉ áp dụng cho flashcard_review)
      if (topicFilter && scoreModule === "flashcard_review") {
        allRows = allRows.filter((r) => {
          if (!r.detail) return false;
          try {
            const d = JSON.parse(r.detail);
            return d.topic === topicFilter;
          } catch { return false; }
        });
      }

      // Sub-filter: lọc theo độ khó quiz (easy/normal/hard) hoặc mode matching
      if (subFilter && (scoreModule === "quiz" || scoreModule === "matching")) {
        allRows = allRows.filter((r) => {
          if (!r.detail) return false;
          try {
            const d = JSON.parse(r.detail);
            if (scoreModule === "quiz") return d.difficulty === subFilter;
            if (scoreModule === "matching") return d.mode === subFilter;
            return false;
          } catch { return false; }
        });
      }

      // Group by userId - giữ score cao nhất (đã sort desc nên gặp đầu tiên là cao nhất)
      const userBestMap = new Map<string, { userId: string; username: string; displayName: string; score: number; at: Date }>();
      for (const r of allRows) {
        if (!userBestMap.has(r.userId)) {
          userBestMap.set(r.userId, {
            userId: r.userId,
            username: r.user.username,
            displayName: r.user.displayName,
            score: r.score,
            at: r.createdAt,
          });
        }
      }

      // Convert to array, sort by score desc, take limit
      const result = Array.from(userBestMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((r, i) => ({
          rank: i + 1,
          userId: r.userId,
          username: r.username,
          displayName: r.displayName,
          score: r.score,
          at: r.at,
        }));
      return NextResponse.json({ leaderboard: result });
    } else {
      // Leaderboard chăm chỉ - tổng điểm + số lần chơi của mỗi user (trong khoảng thời gian)
      const rows = await db.score.groupBy({
        by: ["userId"],
        where: timeFilter,
        _sum: { score: true },
        _count: { id: true },
        orderBy: { _sum: { score: "desc" } },
        take: limit,
      });
      const userIds = rows.map((r) => r.userId);
      const users = await db.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, username: true, displayName: true },
      });
      const userMap = new Map(users.map((u) => [u.id, u]));
      const result = rows.map((r, i) => {
        const u = userMap.get(r.userId);
        return {
          rank: i + 1,
          userId: r.userId,
          username: u?.username || "unknown",
          displayName: u?.displayName || "unknown",
          totalScore: r._sum.score || 0,
          playCount: r._count.id,
        };
      });
      return NextResponse.json({ leaderboard: result });
    }
  } catch (e) {
    console.error("leaderboard error", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

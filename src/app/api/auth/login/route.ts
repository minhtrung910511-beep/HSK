import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSession, getCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = (body.username || "").toString().trim().toLowerCase();
    const password = (body.password || "").toString();

    if (!username || !password) {
      return NextResponse.json({ error: "Thiếu tên đăng nhập hoặc mật khẩu" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { username } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" }, { status: 401 });
    }

    const token = await createSession(user.id);
    const res = NextResponse.json({
      user: { id: user.id, username: user.username, displayName: user.displayName },
      token, // Trả token cho client lưu vào localStorage (backup nếu cookie không forward)
    });
    res.cookies.set(SESSION_COOKIE_NAME, token, getCookieOptions());
    return res;
  } catch (e) {
    console.error("login error", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

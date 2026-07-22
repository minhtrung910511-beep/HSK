import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, createSession, getCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = (body.username || "").toString().trim().toLowerCase();
    const password = (body.password || "").toString();
    const displayName = (body.displayName || "").toString().trim() || username;

    if (!username || !password) {
      return NextResponse.json({ error: "Thiếu tên đăng nhập hoặc mật khẩu" }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: "Tên đăng nhập phải ≥ 3 ký tự" }, { status: 400 });
    }
    if (password.length < 4) {
      return NextResponse.json({ error: "Mật khẩu phải ≥ 4 ký tự" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Tên đăng nhập đã tồn tại" }, { status: 409 });
    }

    const user = await db.user.create({
      data: {
        username,
        passwordHash: hashPassword(password),
        displayName,
      },
    });

    const token = await createSession(user.id);
    const res = NextResponse.json({
      user: { id: user.id, username: user.username, displayName: user.displayName },
      token, // Trả token cho client lưu vào localStorage (backup nếu cookie không forward)
    });
    res.cookies.set(SESSION_COOKIE_NAME, token, getCookieOptions());
    return res;
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

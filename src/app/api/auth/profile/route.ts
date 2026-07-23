import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// PATCH /api/auth/profile - cập nhật displayName của user hiện tại
export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const body = await req.json();
    const displayName = (body.displayName || "").toString().trim();

    if (!displayName) {
      return NextResponse.json({ error: "Tên hiển thị không được để trống" }, { status: 400 });
    }
    if (displayName.length < 2) {
      return NextResponse.json({ error: "Tên hiển thị phải ≥ 2 ký tự" }, { status: 400 });
    }
    if (displayName.length > 30) {
      return NextResponse.json({ error: "Tên hiển thị phải ≤ 30 ký tự" }, { status: 400 });
    }

    const updated = await db.user.update({
      where: { id: user.id },
      data: { displayName },
      select: { id: true, username: true, displayName: true },
    });

    return NextResponse.json({ user: updated });
  } catch (e) {
    console.error("update profile error", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

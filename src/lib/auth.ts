import { db } from "@/lib/db";
import { cookies, headers } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "hsk1_session";
const SESSION_HEADER = "x-hsk1-token";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 ngày

// Hash password đơn giản bằng scrypt (có sẵn trong Node, không cần bcrypt)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const newHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(newHash, "hex"), Buffer.from(hash, "hex"));
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Server-side: get current user từ cookie HOẶC header x-hsk1-token
// (Header để hỗ trợ preview domain - proxy có thể không forward cookie)
export async function getCurrentUser(): Promise<{
  id: string;
  username: string;
  displayName: string;
} | null> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // Thử lấy token từ cookie trước, sau đó từ header
  let token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    token = headerStore.get(SESSION_HEADER) || undefined;
  }
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return {
    id: session.user.id,
    username: session.user.username,
    displayName: session.user.displayName,
  };
}

// Tạo session mới và set cookie
export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await db.session.create({
    data: { userId, token, expiresAt },
  });
  return token;
}

export async function destroySession(token: string): Promise<void> {
  await db.session.deleteMany({ where: { token } }).catch(() => {});
}

// Helper: thiết lập cookie
// - Luôn dùng SameSite=Lax để tương thích cả HTTP (dev) và HTTPS (prod/preview)
export function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: false,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_HEADER_NAME = SESSION_HEADER;
export const SESSION_MAX_AGE = SESSION_DURATION_MS / 1000; // seconds, cho cookie maxAge

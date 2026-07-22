"use client";

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

// Event global để đồng bộ user state giữa các useAuth instance
const AUTH_EVENT = "hsk1-auth-changed";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "same-origin" });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Lắng nghe event auth-changed để refresh khi instance khác login/logout
    const handler = () => refresh();
    window.addEventListener(AUTH_EVENT, handler);
    return () => window.removeEventListener(AUTH_EVENT, handler);
  }, [refresh]);

  // Helper: cập nhật state + broadcast event cho các instance khác
  const broadcast = useCallback(() => {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "same-origin",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Đăng nhập thất bại");
    setUser(data.user);
    broadcast();
    return data.user;
  }, [broadcast]);

  const register = useCallback(
    async (username: string, password: string, displayName: string) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, displayName }),
        credentials: "same-origin",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đăng ký thất bại");
      setUser(data.user);
      broadcast();
      return data.user;
    },
    [broadcast]
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setUser(null);
    broadcast();
  }, [broadcast]);

  const submitScore = useCallback(
    async (module: "quiz" | "matching" | "flashcard_review", score: number, detail?: Record<string, unknown>) => {
      // Re-check user at call time (callback có thể stale do closure)
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "same-origin" });
        const meData = await meRes.json();
        if (!meData.user) {
          // Chưa đăng nhập - im lặng skip, không log error
          return null;
        }
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ module, score, detail }),
          credentials: "same-origin",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (e) {
        console.error("submit score failed", e);
        return null;
      }
    },
    []
  );

  return { user, loading, login, register, logout, refresh, submitScore };
}

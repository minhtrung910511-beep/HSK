"use client";

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

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
  }, [refresh]);

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
    return data.user;
  }, []);

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
      return data.user;
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setUser(null);
  }, []);

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
    [],
  );

  return { user, loading, login, register, logout, refresh, submitScore };
}

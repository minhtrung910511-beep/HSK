"use client";

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

// Event global để đồng bộ user state giữa các useAuth instance
const AUTH_EVENT = "hsk1-auth-changed";
const TOKEN_STORAGE_KEY = "hsk1_token";

// Helper: lấy token từ localStorage (client-side)
function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Helper: fetch với auth header (gửi token qua header nếu có)
async function authFetch(url: string, options: RequestInit = {}) {
  const token = getStoredToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("x-hsk1-token", token);
  }
  return fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
  });
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await authFetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user || null);
      // Nếu server không trả user nhưng client có token → token invalid, xóa
      if (!data.user) setStoredToken(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener(AUTH_EVENT, handler);
    return () => window.removeEventListener(AUTH_EVENT, handler);
  }, [refresh]);

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
    // Lưu token vào localStorage (data.token được set ở API response)
    if (data.token) setStoredToken(data.token);
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
      if (data.token) setStoredToken(data.token);
      setUser(data.user);
      broadcast();
      return data.user;
    },
    [broadcast]
  );

  const logout = useCallback(async () => {
    await authFetch("/api/auth/logout", { method: "POST" });
    setStoredToken(null);
    setUser(null);
    broadcast();
  }, [broadcast]);

  const submitScore = useCallback(
    async (module: "quiz" | "matching" | "flashcard_review", score: number, detail?: Record<string, unknown>) => {
      try {
        const res = await authFetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ module, score, detail }),
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

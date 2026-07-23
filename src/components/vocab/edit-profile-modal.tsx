"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  currentDisplayName: string;
  onSave: (newName: string) => Promise<void>;
}

export function EditProfileModal({
  open,
  onClose,
  currentDisplayName,
  onSave,
}: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset state khi modal mở lại
  useEffect(() => {
    if (open) {
      setDisplayName(currentDisplayName);
      setError(null);
      setLoading(false);
    }
  }, [open, currentDisplayName]);

  // Đóng modal bằng Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, loading, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = displayName.trim();
    if (!trimmed) {
      setError("Tên hiển thị không được để trống");
      return;
    }
    if (trimmed.length < 2) {
      setError("Tên hiển thị phải ≥ 2 ký tự");
      return;
    }
    if (trimmed.length > 30) {
      setError("Tên hiển thị phải ≤ 30 ký tự");
      return;
    }
    if (trimmed === currentDisplayName) {
      // Không đổi gì → đóng modal
      onClose();
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await onSave(trimmed);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="p-6 border-0 shadow-2xl bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Đổi tên hiển thị</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8" disabled={loading}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4 p-3 rounded-xl bg-violet-50 border border-violet-100 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Tên hiện tại:</span>
              <span className="font-semibold text-foreground">{currentDisplayName}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Tên này sẽ hiển thị trên bảng xếp hạng và dashboard
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="newDisplayName">Tên hiển thị mới</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newDisplayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  className="pl-9"
                  maxLength={30}
                  required
                  autoFocus
                  disabled={loading}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                {displayName.length}/30 ký tự
              </div>
            </div>

            {error && (
              <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading || !displayName.trim() || displayName.trim() === currentDisplayName}
                className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  gradeWord,
  loadProgress,
  markLearned,
  QualityGrade,
  resetProgress as resetProgressFn,
  saveProgress,
  updateMatchingScore,
  updateQuizScore,
  type ProgressData,
} from "@/lib/srs";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ProgressData) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const grade = useCallback(
    (wordId: number, g: QualityGrade) => {
      if (!progress) return;
      persist(gradeWord(progress, wordId, g));
    },
    [progress, persist]
  );

  const markLearnedWord = useCallback(
    (wordId: number) => {
      if (!progress) return;
      persist(markLearned(progress, wordId));
    },
    [progress, persist]
  );

  const recordQuizScore = useCallback(
    (score: number) => {
      if (!progress) return;
      persist(updateQuizScore(progress, score));
    },
    [progress, persist]
  );

  const recordMatchingScore = useCallback(
    (score: number) => {
      if (!progress) return;
      persist(updateMatchingScore(progress, score));
    },
    [progress, persist]
  );

  const reset = useCallback(() => {
    const fresh = resetProgressFn();
    setProgress(fresh);
  }, []);

  return {
    progress,
    hydrated,
    grade,
    markLearnedWord,
    recordQuizScore,
    recordMatchingScore,
    reset,
  };
}

// Spaced Repetition System (SRS) - SM-2 algorithm đơn giản hóa
// Lưu trữ tiến độ học trong localStorage

export type QualityGrade = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Hoàn toàn quên, 1: Quên, 2: Khó nhớ, 3: Nhớ với khó khăn, 4: Nhớ, 5: Dễ dàng

export interface SRSCard {
  wordId: number;
  repetitions: number;     // Số lần nhớ đúng liên tiếp
  interval: number;        // Số ngày đến lần ôn tiếp theo
  easeFactor: number;      // Hệ số dễ nhớ (bắt đầu 2.5)
  dueDate: number;         // Timestamp epoch (ms) khi cần ôn lại
  lastReviewed: number | null;
  history: { date: number; grade: QualityGrade }[];
}

export interface ProgressData {
  cards: Record<number, SRSCard>;     // wordId -> card
  learnedWordIds: number[];            // Các từ đã đánh dấu "đã học"
  streak: {
    current: number;
    longest: number;
    lastStudyDate: string;  // YYYY-MM-DD
  };
  totalReviews: number;
  correctReviews: number;
  dailyStats: Record<string, { studied: number; correct: number }>; // YYYY-MM-DD -> stats
  quizHighScore: number;
  matchingHighScore: number;
}

const STORAGE_KEY = "hsk1-progress-v1";

const DEFAULT_EASE = 2.5;
const DAY_MS = 24 * 60 * 60 * 1000;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function defaultProgress(): ProgressData {
  return {
    cards: {},
    learnedWordIds: [],
    streak: { current: 0, longest: 0, lastStudyDate: "" },
    totalReviews: 0,
    correctReviews: 0,
    dailyStats: {},
    quizHighScore: 0,
    matchingHighScore: 0,
  };
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as ProgressData;
    // Merge với default để tránh thiếu field khi thêm mới
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch (e) {
    console.error("Lưu tiến độ thất bại", e);
  }
}

export function resetProgress(): ProgressData {
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
}

// Khởi tạo card mới
function newCard(wordId: number): SRSCard {
  return {
    wordId,
    repetitions: 0,
    interval: 0,
    easeFactor: DEFAULT_EASE,
    dueDate: Date.now(),
    lastReviewed: null,
    history: [],
  };
}

// SM-2 algorithm cập nhật card sau khi đánh giá
export function reviewCard(
  card: SRSCard,
  grade: QualityGrade,
  now: number = Date.now()
): SRSCard {
  let { repetitions, interval, easeFactor } = card;
  const newEase = Math.max(1.3, easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));

  if (grade < 3) {
    // Quên - reset repetitions
    repetitions = 0;
    interval = 1; // Ôn lại sau 1 ngày
  } else {
    // Nhớ
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 3;
    } else {
      interval = Math.round(interval * newEase);
    }
  }

  const dueDate = now + interval * DAY_MS;

  return {
    ...card,
    repetitions,
    interval,
    easeFactor: newEase,
    dueDate,
    lastReviewed: now,
    history: [...card.history, { date: now, grade }],
  };
}

// Lấy danh sách wordId cần ôn hôm nay (dueDate <= now) hoặc chưa học
export function getDueCards(progress: ProgressData, allWordIds: number[], limit?: number): number[] {
  const now = Date.now();
  const due: number[] = [];
  for (const wordId of allWordIds) {
    const card = progress.cards[wordId];
    if (!card) {
      due.push(wordId);
    } else if (card.dueDate <= now) {
      due.push(wordId);
    }
  }
  return limit ? due.slice(0, limit) : due;
}

// Đánh giá 1 từ, cập nhật progress
export function gradeWord(
  progress: ProgressData,
  wordId: number,
  grade: QualityGrade
): ProgressData {
  const now = Date.now();
  const existing = progress.cards[wordId] ?? newCard(wordId);
  const updated = reviewCard(existing, grade, now);

  const today = todayKey();
  const dailyStats = { ...progress.dailyStats };
  if (!dailyStats[today]) dailyStats[today] = { studied: 0, correct: 0 };
  dailyStats[today].studied += 1;
  if (grade >= 3) dailyStats[today].correct += 1;

  // Cập nhật streak
  const lastDate = progress.streak.lastStudyDate;
  let { current, longest } = progress.streak;
  if (lastDate !== today) {
    // Hôm nay chưa học - kiểm tra xem có phải ngày liên tục không
    const yesterday = new Date(now - DAY_MS);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    if (lastDate === yesterdayKey) {
      current += 1;
    } else {
      current = 1;
    }
    if (current > longest) longest = current;
  }

  // Thêm vào learnedWordIds nếu chưa có
  const learnedSet = new Set(progress.learnedWordIds);
  if (grade >= 3) learnedSet.add(wordId);

  return {
    ...progress,
    cards: { ...progress.cards, [wordId]: updated },
    learnedWordIds: Array.from(learnedSet),
    totalReviews: progress.totalReviews + 1,
    correctReviews: progress.correctReviews + (grade >= 3 ? 1 : 0),
    streak: { current, longest, lastStudyDate: today },
    dailyStats,
  };
}

// Đánh dấu từ đã học (khi xem flashcard)
export function markLearned(progress: ProgressData, wordId: number): ProgressData {
  const learnedSet = new Set(progress.learnedWordIds);
  learnedSet.add(wordId);
  return { ...progress, learnedWordIds: Array.from(learnedSet) };
}

// Tính % hoàn thành
export function getCompletionPercent(progress: ProgressData, totalWords: number): number {
  if (totalWords === 0) return 0;
  return Math.round((progress.learnedWordIds.length / totalWords) * 100);
}

// Số từ cần ôn hôm nay
export function getTodayDueCount(progress: ProgressData, allWordIds: number[]): number {
  return getDueCards(progress, allWordIds).length;
}

// Cập nhật điểm cao quiz
export function updateQuizScore(progress: ProgressData, score: number): ProgressData {
  if (score > progress.quizHighScore) {
    return { ...progress, quizHighScore: score };
  }
  return progress;
}

// Cập nhật điểm cao matching
export function updateMatchingScore(progress: ProgressData, score: number): ProgressData {
  if (score > progress.matchingHighScore) {
    return { ...progress, matchingHighScore: score };
  }
  return progress;
}

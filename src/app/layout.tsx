import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSK1 Tiếng Trung - Học từ vựng dễ nhớ",
  description: "Học 150 từ vựng HSK 1 tiếng Trung với Flashcard, Spaced Repetition, Quiz và Matching Game. Dễ học, tiếp thu nhanh, ghi nhớ lâu.",
  keywords: ["HSK1", "tiếng Trung", "từ vựng", "flashcard", "SRS", "học tiếng Trung", "HSK 1.0"],
  authors: [{ name: "HSK1 Vocab" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel deploy: bỏ output: "standalone" để Vercel tự xử lý
  // Local dev: vẫn chạy bình thường
  output: process.env.VERCEL ? undefined : "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

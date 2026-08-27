import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Tắt log query ở production để tăng tốc
const isDev = process.env.NODE_ENV !== 'production'

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDev ? ['error', 'warn'] : ['error'],
  })

// Cache connection globally to prevent multiple instances in dev
if (isDev) globalForPrisma.prisma = db
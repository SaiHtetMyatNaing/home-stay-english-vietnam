// lib/prisma.ts  (or src/lib/prisma.ts)
import { PrismaClient } from '@prisma/client';
declare global {
  // This prevents TypeScript errors and allows attaching prisma to globalThis
  var prisma: PrismaClient | undefined;
}

// This is the key: use a function + local variable to guarantee singleton
const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export default prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
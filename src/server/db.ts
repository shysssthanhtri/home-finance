import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

declare const globalThis: {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const db = globalThis.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalThis.prisma = db;

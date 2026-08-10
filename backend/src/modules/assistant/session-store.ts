import { randomUUID } from "node:crypto";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type SessionInfo = {
  id: string;
  messageCount: number;
  tokenCount: number;
};

export async function getOrCreateSession(
  clientSessionId: string | undefined,
  ipHash: string
): Promise<{ session: SessionInfo; resumed: boolean }> {
  if (clientSessionId) {
    const existing = await prisma.chatSession.findUnique({
      where: { id: clientSessionId },
      select: { id: true, messageCount: true, tokenCount: true }
    });
    if (existing) return { session: existing, resumed: true };
  }
  const created = await prisma.chatSession.create({
    data: {
      id: clientSessionId ?? randomUUID(),
      ipHash
    },
    select: { id: true, messageCount: true, tokenCount: true }
  });
  return { session: created, resumed: false };
}

export async function loadHistoryTail(sessionId: string, limit: number): Promise<ChatTurn[]> {
  const rows = (await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { id: "desc" },
    take: limit,
    select: { role: true, content: true }
  })) as { role: string; content: string }[] | null;
  return ((rows ?? []).reverse() as { role: string; content: string }[])
    .filter((row) => row.role === "user" || row.role === "assistant")
    .map((row) => ({ role: row.role as "user" | "assistant", content: row.content }));
}

export async function createMessage(
  sessionId: string,
  role: string,
  content: string,
  tokenCount: number
): Promise<{ id: number }> {
  return prisma.chatMessage.create({
    data: { sessionId, role, content, tokenCount },
    select: { id: true }
  });
}

export async function incrementCounters(sessionId: string): Promise<boolean> {
  const result = await prisma.chatSession.updateMany({
    where: {
      id: sessionId,
      messageCount: { lt: env.ASSISTANT_MAX_MESSAGES },
      tokenCount: { lt: env.ASSISTANT_MAX_SESSION_TOKENS }
    },
    data: { messageCount: { increment: 1 } }
  });
  return result.count === 1;
}

export async function addSessionTokens(sessionId: string, amount: number): Promise<void> {
  await prisma.chatSession.updateMany({
    where: { id: sessionId },
    data: { tokenCount: { increment: amount } }
  });
}

export async function getDailyUsage(dateKey: string): Promise<number> {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  const row = await prisma.chatDailyUsage.findUnique({
    where: { date },
    select: { tokenCount: true }
  });
  return row?.tokenCount ?? 0;
}

export async function atomicallyIncrementDailyUsage(
  dateKey: string,
  amount: number
): Promise<{ id: number; reserved: boolean }> {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  const row = await prisma.chatDailyUsage.upsert({
    where: { date },
    create: { date, tokenCount: 0 },
    update: {},
    select: { id: true }
  });
  const result = await prisma.chatDailyUsage.updateMany({
    where: { id: row.id, tokenCount: { lt: env.ASSISTANT_MAX_DAILY_TOKENS } },
    data: { tokenCount: { increment: amount } }
  });
  return { id: row.id, reserved: result.count === 1 };
}

export async function purgeOldSessions(): Promise<number> {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const old = (await prisma.chatSession.findMany({
    where: { updatedAt: { lt: cutoff } },
    take: 100,
    select: { id: true }
  })) as { id: string }[] | null;
  const ids = (old ?? []).map((row) => row.id);
  if (ids.length > 0) {
    await prisma.chatSession.deleteMany({ where: { id: { in: ids } } });
  }
  return ids.length;
}

export type UsageState = {
  sessionMessageCount: number | null;
  sessionTokenCount: number | null;
  dailyTokenCount: number | null;
};

export async function getUsageState(
  sessionId: string,
  dateKey: string
): Promise<UsageState> {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  const [session, daily] = await Promise.all([
    prisma.chatSession
      .findUnique({
        where: { id: sessionId },
        select: { messageCount: true, tokenCount: true }
      })
      .catch(() => null),
    prisma.chatDailyUsage
      .findUnique({ where: { date }, select: { tokenCount: true } })
      .catch(() => null)
  ]);
  return {
    sessionMessageCount: session?.messageCount ?? null,
    sessionTokenCount: session?.tokenCount ?? null,
    dailyTokenCount: daily?.tokenCount ?? null
  };
}
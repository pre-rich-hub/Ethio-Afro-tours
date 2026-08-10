import { describe, expect, it } from "vitest";
import { env } from "../../src/config/env.js";
import {
  classifyHandoff,
  dailyCapReached,
  estimateTokens,
  sessionCapReached
} from "../../src/modules/assistant/gating.js";

describe("sessionCapReached", () => {
  it("is false below both session caps", () => {
    expect(sessionCapReached(env.ASSISTANT_MAX_MESSAGES - 1, env.ASSISTANT_MAX_SESSION_TOKENS - 1)).toBe(false);
  });

  it("is true at the message cap", () => {
    expect(sessionCapReached(env.ASSISTANT_MAX_MESSAGES, 0)).toBe(true);
  });

  it("is true at the session token cap", () => {
    expect(sessionCapReached(0, env.ASSISTANT_MAX_SESSION_TOKENS)).toBe(true);
  });
});

describe("dailyCapReached", () => {
  it("is false below the daily cap and true at or above it", () => {
    expect(dailyCapReached(env.ASSISTANT_MAX_DAILY_TOKENS - 1)).toBe(false);
    expect(dailyCapReached(env.ASSISTANT_MAX_DAILY_TOKENS)).toBe(true);
    expect(dailyCapReached(env.ASSISTANT_MAX_DAILY_TOKENS + 1)).toBe(true);
  });
});

describe("classifyHandoff", () => {
  it("returns none when all caps are clear", () => {
    expect(
      classifyHandoff({ messageCount: 0, tokenCount: 0 }, 0)
    ).toBe("none");
  });

  it("returns limit when the session cap is reached", () => {
    expect(
      classifyHandoff({ messageCount: env.ASSISTANT_MAX_MESSAGES, tokenCount: 0 }, 0)
    ).toBe("limit");
    expect(
      classifyHandoff({ messageCount: 0, tokenCount: env.ASSISTANT_MAX_SESSION_TOKENS }, 0)
    ).toBe("limit");
  });

  it("returns limit when the daily cap is reached", () => {
    expect(
      classifyHandoff({ messageCount: 0, tokenCount: 0 }, env.ASSISTANT_MAX_DAILY_TOKENS)
    ).toBe("limit");
  });
});

describe("estimateTokens", () => {
  it("conservatively approximates tokens from characters", () => {
    expect(estimateTokens("")).toBe(1);
    expect(estimateTokens("hello world")).toBe(3);
    expect(estimateTokens("x".repeat(80))).toBe(20);
  });
});
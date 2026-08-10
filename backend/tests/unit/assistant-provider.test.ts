import { beforeEach, describe, expect, it, vi } from "vitest";

const completionsCreate = vi.hoisted(() => vi.fn());
const generateContentStream = vi.hoisted(() => vi.fn());
const openAIConstructor = vi.hoisted(() => vi.fn());

vi.mock("openai", () => ({
  OpenAI: class {
    chat = { completions: { create: completionsCreate } };
    constructor() {
      openAIConstructor();
    }
  }
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContentStream };
    constructor() {
      openAIConstructor();
    }
  }
}));

import { env } from "../../src/config/env.js";
import {
  GeminiProvider,
  OpenAIProvider,
  createProvider
} from "../../src/modules/assistant/provider.client.js";

function asyncIterable<T>(items: T[]): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const item of items) yield item;
    }
  };
}

const signal = new AbortController().signal;

beforeEach(() => {
  completionsCreate.mockReset();
  generateContentStream.mockReset();
  openAIConstructor.mockClear();
});

describe("OpenAIProvider", () => {
  it("creates the client lazily and streams delta text", async () => {
    completionsCreate.mockResolvedValue(
      asyncIterable([
        { choices: [{ delta: { content: "Hello " } }] },
        { choices: [{ delta: { content: "Ethiopia" } }] },
        { choices: [{ delta: {} }] }
      ])
    );

    const provider = new OpenAIProvider();
    const deltas: { text: string }[] = [];
    for await (const delta of provider.streamChat({
      system: "You are a guide.",
      messages: [{ role: "user", content: "hi" }],
      maxOutputTokens: 100,
      signal
    })) {
      deltas.push(delta);
    }

    expect(deltas.map((d) => d.text).join("")).toBe("Hello Ethiopia");
    expect(completionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: env.ASSISTANT_MODEL,
        stream: true,
        max_completion_tokens: 100,
        messages: [
          { role: "system", content: "You are a guide." },
          { role: "user", content: "hi" }
        ]
      }),
      { signal }
    );
    expect(completionsCreate).toHaveBeenCalledTimes(1);
  });

  it("constructs the SDK client only on first use", async () => {
    completionsCreate.mockResolvedValue(asyncIterable([]));
    openAIConstructor.mockClear();
    const provider = new OpenAIProvider();
    expect(openAIConstructor).not.toHaveBeenCalled();
    for await (const _delta of provider.streamChat({
      system: "s",
      messages: [],
      maxOutputTokens: 50,
      signal
    })) {
      // consume
    }
    expect(openAIConstructor).toHaveBeenCalledTimes(1);
  });
});

describe("GeminiProvider", () => {
  it("passes contents, config and the abort signal to the SDK", async () => {
    generateContentStream.mockResolvedValue(
      asyncIterable([{ text: "Welcome" }, { text: " to Addis" }, { text: undefined }])
    );

    const provider = new GeminiProvider();
    const deltas: { text: string }[] = [];
    for await (const delta of provider.streamChat({
      system: "Be concise.",
      messages: [
        { role: "user", content: "Plan a day" },
        { role: "assistant", content: "Sure" }
      ],
      maxOutputTokens: 200,
      signal
    })) {
      deltas.push(delta);
    }

    expect(deltas.map((d) => d.text).join("")).toBe("Welcome to Addis");
    expect(generateContentStream).toHaveBeenCalledWith(
      expect.objectContaining({
        model: env.ASSISTANT_GEMINI_MODEL,
        contents: [
          { role: "user", parts: [{ text: "Plan a day" }] },
          { role: "assistant", parts: [{ text: "Sure" }] }
        ],
        config: expect.objectContaining({
          systemInstruction: "Be concise.",
          maxOutputTokens: 200,
          abortSignal: signal
        })
      })
    );
    expect(generateContentStream).toHaveBeenCalledTimes(1);
  });

  it("constructs the SDK client only on first use", async () => {
    generateContentStream.mockResolvedValue(asyncIterable([]));
    openAIConstructor.mockClear();
    const provider = new GeminiProvider();
    expect(openAIConstructor).not.toHaveBeenCalled();
    for await (const _delta of provider.streamChat({
      system: "s",
      messages: [],
      maxOutputTokens: 50,
      signal
    })) {
      // consume
    }
    expect(openAIConstructor).toHaveBeenCalledTimes(1);
  });
});

describe("createProvider", () => {
  it("returns an OpenAIProvider for the configured provider", () => {
    expect(createProvider()).toBeInstanceOf(OpenAIProvider);
  });
});
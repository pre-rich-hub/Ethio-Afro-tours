import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/smoke/**/*.test.ts"],
    environment: "node",
    // Force database-backed media storage so upload URLs go through
    // /api/v1/media/:id (the Neon smoke target).
    // Enable the assistant module with a dummy key: the provider module is
    // mocked, so no real LLM calls are ever made.
    env: {
      STORAGE_DRIVER: "database",
      ASSISTANT_ENABLED: "true",
      OPENAI_API_KEY: "test"
    },
    fileParallelism: false,
    testTimeout: 30000,
    hookTimeout: 30000
  }
});
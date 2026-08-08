import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/smoke/**/*.test.ts"],
    environment: "node",
    // Force database-backed media storage so upload URLs go through
    // /api/v1/media/:id (the Neon smoke target).
    env: { STORAGE_DRIVER: "database" },
    fileParallelism: false,
    testTimeout: 30000,
    hookTimeout: 30000
  }
});
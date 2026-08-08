import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// z.coerce.boolean() treats any non-empty string ("false") as true. Parse
// env-file booleans explicitly instead.
function envBoolean(value: unknown): boolean {
  if (value === true || value === 1) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "on";
  }
  return Boolean(value);
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().optional().default(""),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("admin_session"),
  COOKIE_SECURE: z.preprocess(envBoolean, z.boolean()).default(false),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_FROM: z.string().optional().default(""),
  ADMIN_EMAIL: z.string().optional().default(""),
  ADMIN_PASSWORD: z.string().optional().default(""),
  EMAIL_ENABLED: z.preprocess(envBoolean, z.boolean()).default(false),
  UPLOAD_ROOT: z.string().default("."),
  PUBLIC_FILE_BASE_URL: z.string().optional().default(""),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(4),

  // Storage
  // When omitted, hosted storage is inferred from the deployment:
  //   - explicit STORAGE_DRIVER wins
  //   - `local` on Vercel is replaced with database storage (serverless disk is
  //     ephemeral), matching the reference behavior
  //   - on any non-Vercel host the default is local disk
  STORAGE_DRIVER: z.preprocess(
    (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
    z.enum(["local", "database"]).optional()
  ),
});

const rawEnv = envSchema.parse(process.env);

const parsed = {
  ...rawEnv,
  STORAGE_DRIVER:
    process.env.VERCEL && (!rawEnv.STORAGE_DRIVER || rawEnv.STORAGE_DRIVER === "local")
      ? "database"
      : rawEnv.STORAGE_DRIVER ?? "local"
};

// Boot check: email must be fully configured before it is enabled. Without an
// SMTP host, every notification silently waits forever — fail fast instead.
if (parsed.EMAIL_ENABLED && !parsed.SMTP_HOST) {
  throw new Error(
    "EMAIL_ENABLED is true but SMTP_HOST is not configured. Set SMTP_HOST (and SMTP_USER/SMTP_PASS) or set EMAIL_ENABLED=false."
  );
}

export const env = parsed;

export const isProduction = parsed.NODE_ENV === "production";
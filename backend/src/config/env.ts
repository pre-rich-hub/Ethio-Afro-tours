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
  EMAIL_PROVIDER: z.enum(["smtp", "resend"]).default("smtp"),
  RESEND_API_KEY: z.string().optional().default(""),
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

  // AI travel assistant (Phase 4). All ASSISTANT_* settings are independent of
  // EMAIL_ENABLED; the boot check below mirrors the email fail-fast pattern.
  ASSISTANT_ENABLED: z.preprocess(envBoolean, z.boolean()).default(false),
  ASSISTANT_PROVIDER: z.enum(["openai", "gemini"]).default("openai"),
  OPENAI_API_KEY: z.string().optional().default(""),
  ASSISTANT_MODEL: z.string().default("gpt-5-mini"),
  GEMINI_API_KEY: z.string().optional().default(""),
  ASSISTANT_GEMINI_MODEL: z.string().default("gemini-3.1-flash-lite"),
  ASSISTANT_MAX_MESSAGES: z.coerce.number().int().positive().default(30),
  ASSISTANT_MAX_SESSION_TOKENS: z.coerce.number().int().positive().default(50000),
  ASSISTANT_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(600),
  ASSISTANT_MAX_HISTORY_MESSAGES: z.coerce.number().int().positive().default(10),
  ASSISTANT_MAX_CONTEXT_CHARS: z.coerce.number().int().positive().default(40000),
  ASSISTANT_STREAM_TIMEOUT_MS: z.coerce.number().int().positive().default(45000),
  ASSISTANT_CONTEXT_TTL_MS: z.coerce.number().int().positive().default(300000),
  ASSISTANT_MAX_DAILY_TOKENS: z.coerce.number().int().positive().default(200000),
  ASSISTANT_STREAM: z.preprocess(envBoolean, z.boolean()).default(true),
  ASSISTANT_SPIKE_ROUTE: z.preprocess(envBoolean, z.boolean()).default(false),
  ASSISTANT_IP_HASH_SALT: z.string().optional().default(""),
});

const rawEnv = envSchema.parse(process.env);

const parsed = {
  ...rawEnv,
  STORAGE_DRIVER:
    process.env.VERCEL && (!rawEnv.STORAGE_DRIVER || rawEnv.STORAGE_DRIVER === "local")
      ? "database"
      : rawEnv.STORAGE_DRIVER ?? "local",
  // Never store raw client IPs; hash them with a per-deployment salt. Falls
  // back to JWT_SECRET when no dedicated salt is configured.
  ASSISTANT_IP_HASH_SALT: rawEnv.ASSISTANT_IP_HASH_SALT || rawEnv.JWT_SECRET
};

// Boot check: email must be fully configured before it is enabled. Without a
// provider target, every notification silently waits forever; fail fast instead.
if (parsed.EMAIL_ENABLED) {
  if (!parsed.SMTP_FROM) {
    throw new Error(
      "EMAIL_ENABLED is true but SMTP_FROM is not configured. Set SMTP_FROM to a verified sender address or set EMAIL_ENABLED=false."
    );
  }

  if (!parsed.ADMIN_EMAIL) {
    throw new Error(
      "EMAIL_ENABLED is true but ADMIN_EMAIL is not configured. Set ADMIN_EMAIL so contact/newsletter notifications have a recipient, or set EMAIL_ENABLED=false."
    );
  }

  if (parsed.EMAIL_PROVIDER === "resend" && !parsed.RESEND_API_KEY) {
    throw new Error(
      "EMAIL_ENABLED is true and EMAIL_PROVIDER=resend but RESEND_API_KEY is not configured. Set RESEND_API_KEY or set EMAIL_ENABLED=false."
    );
  }

  if (parsed.EMAIL_PROVIDER === "smtp" && !parsed.SMTP_HOST) {
    throw new Error(
      "EMAIL_ENABLED is true but SMTP_HOST is not configured. Set SMTP_HOST (and SMTP_USER/SMTP_PASS) or set EMAIL_ENABLED=false."
    );
  }
}

// Boot check: the assistant may only be enabled with a configured provider.
// Every provider key is verified up front so a half-configured deployment
// fails at boot rather than at the first chat request.
if (parsed.ASSISTANT_ENABLED) {
  if (parsed.ASSISTANT_PROVIDER === "openai" && !parsed.OPENAI_API_KEY) {
    throw new Error(
      "ASSISTANT_ENABLED is true but OPENAI_API_KEY is not configured. Set OPENAI_API_KEY or set ASSISTANT_ENABLED=false."
    );
  }
  if (parsed.ASSISTANT_PROVIDER === "gemini" && !parsed.GEMINI_API_KEY) {
    throw new Error(
      "ASSISTANT_ENABLED is true but GEMINI_API_KEY is not configured. Set GEMINI_API_KEY or set ASSISTANT_ENABLED=false."
    );
  }
  if (parsed.ASSISTANT_PROVIDER !== "openai" && parsed.ASSISTANT_PROVIDER !== "gemini") {
    throw new Error(
      `ASSISTANT_PROVIDER "${parsed.ASSISTANT_PROVIDER}" has no implementation. Supported: openai, gemini.`
    );
  }
}

export const env = parsed;

export const isProduction = parsed.NODE_ENV === "production";

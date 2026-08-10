import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";

import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rate-limit.middleware.js";
import { requestId, logRequest } from "./middleware/logging.middleware.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { registerRoutes } from "./routes.js";

export const app = express();

// Vercel terminates TLS at the edge and forwards client IPs via the
// X-Forwarded-For header. Without this every rate limiter keys on the edge
// node IP, collapsing all visitors into one site-wide bucket.
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean),
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestId);
app.use(logRequest);
app.use(globalLimiter);
app.use(
  "/assets",
  express.static(path.resolve(process.cwd(), env.UPLOAD_ROOT, "assets"))
);

app.use("/health", healthRouter);
registerRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);
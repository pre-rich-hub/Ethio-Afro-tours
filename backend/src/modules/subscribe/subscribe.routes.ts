import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { sendSubscriberAdminEmail } from "../../services/email.service.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { logger } from "../../config/pino.js";

export const subscribeRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email()
});

subscribeRouter.post(
  "/",
  publicFormLimiter,
  asyncHandler(async (req, res) => {
    const input = subscribeSchema.parse(req.body);

    const existing = await prisma.subscriber.findUnique({
      where: { email: input.email }
    });

    if (existing) {
      return ok(res, "You are already subscribed", { subscribed: true });
    }

    await prisma.subscriber.create({
      data: { email: input.email }
    });

    await sendSubscriberAdminEmail({
      email: input.email,
      subscribedAt: new Date()
    }).catch((err) => {
      logger.warn({ err, email: input.email }, "Failed to send newsletter subscription notification email");
    });

    return ok(res, "Subscribed successfully", { subscribed: true });
  })
);

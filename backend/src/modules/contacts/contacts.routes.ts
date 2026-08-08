import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { sendContactAdminEmail } from "../../services/email.service.js";

export const contactsRouter = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(5000)
});

contactsRouter.post(
  "/",
  publicFormLimiter,
  asyncHandler(async (req, res) => {
    const input = contactSchema.parse(req.body);

    await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        message: input.message
      }
    });

    await sendContactAdminEmail(input).catch(() => undefined);

    return ok(res, "Message sent successfully", null);
  })
);
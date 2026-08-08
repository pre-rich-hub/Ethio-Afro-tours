import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { publicFormLimiter } from "../../middleware/rate-limit.middleware.js";
import { mapBooking } from "../../utils/mappers.js";
import {
  sendBookingAdminEmail,
  sendBookingCustomerEmail,
  sendBookingStatusEmail
} from "../../services/email.service.js";

export const bookingsRouter = Router();

export const bookingCreateSchema = z.object({
  tourId: z.coerce.number().int().positive(),
  fullName: z.string().trim().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(1).max(40),
  country: z.string().min(1).max(80),
  chosenDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(0).max(30).default(0),
  children: z.coerce.number().int().min(0).max(20).default(0)
});

export const bookingStatusSchema = z.object({
  status: z.enum(["Pending", "Confirmed", "Cancelled", "Completed"])
});

function validDateMessage(reason: string | null): string {
  if (reason) return `The selected date is not available: ${reason}`;
  return "The selected date is not available. Please choose another date.";
}

bookingsRouter.post(
  "/",
  publicFormLimiter,
  asyncHandler(async (req, res) => {
    const body = bookingCreateSchema.parse(req.body);
    if (body.adults + body.children <= 0) {
      throw new HttpError(422, "Please select at least one adult or child");
    }

    const tour = await prisma.tour.findUnique({
      where: { id: body.tourId },
      select: { id: true, tourName: true }
    });
    if (!tour) throw new HttpError(404, "Tour not found");

    const chosenDate = new Date(`${body.chosenDate}T00:00:00.000Z`);
    const blocked = await prisma.tourBlockedDate.findFirst({
      where: { tourId: tour.id, date: chosenDate },
      select: { reason: true }
    });
    if (blocked) {
      throw new HttpError(400, validDateMessage(blocked.reason));
    }

    const booking = await prisma.booking.create({
      data: {
        tourId: body.tourId,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        chosenDate,
        adults: body.adults,
        children: body.children,
        status: "Pending"
      },
      include: { tour: true }
    });

    await Promise.allSettled([
      sendBookingAdminEmail({
        bookingId: booking.id,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        tourName: tour.tourName,
        chosenDate: body.chosenDate,
        adults: body.adults,
        children: body.children
      }),
      sendBookingCustomerEmail({
        email: body.email,
        fullName: body.fullName,
        tourName: tour.tourName,
        bookingId: booking.id,
        chosenDate: body.chosenDate,
        adults: body.adults,
        children: body.children
      })
    ]);

    return ok(res, "Booking inquiry submitted successfully", mapBooking(booking), 201);
  })
);

export async function updateBookingStatus(id: number, status: "Pending" | "Confirmed" | "Cancelled" | "Completed") {
  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
    include: { tour: true }
  });

  await sendBookingStatusEmail({
    email: booking.email,
    fullName: booking.fullName,
    tourName: booking.tour?.tourName ?? "Tour",
    bookingId: booking.id,
    chosenDate: booking.chosenDate.toISOString().slice(0, 10),
    status
  }).catch(() => undefined);

  return booking;
}
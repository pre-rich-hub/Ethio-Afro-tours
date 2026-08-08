import type { Express } from "express";
import { toursRouter } from "./modules/tours/tours.routes.js";
import { destinationsRouter } from "./modules/destinations/destinations.routes.js";
import { categoriesRouter } from "./modules/categories/categories.routes.js";
import { galleryRouter } from "./modules/gallery/gallery.routes.js";
import { blogRouter } from "./modules/blog/blog.routes.js";
import { testimonialsRouter } from "./modules/testimonials/testimonials.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { bookingsRouter } from "./modules/bookings/bookings.routes.js";
import { contactsRouter } from "./modules/contacts/contacts.routes.js";
import { subscribeRouter } from "./modules/subscribe/subscribe.routes.js";
import { mediaRouter } from "./modules/media/media.routes.js";

export function registerRoutes(app: Express) {
  // API v1 routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/tours", toursRouter);
  app.use("/api/v1/destinations", destinationsRouter);
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/gallery", galleryRouter);
  app.use("/api/v1/blog", blogRouter);
  app.use("/api/v1/testimonials", testimonialsRouter);
  app.use("/api/v1/bookings", bookingsRouter);
  app.use("/api/v1/contact", contactsRouter);
  app.use("/api/v1/subscribe", subscribeRouter);
  app.use("/api/v1/media", mediaRouter);
}
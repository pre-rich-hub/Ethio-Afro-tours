import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { HttpError } from "../../middleware/error.middleware.js";
import { requireAdminAuth } from "../../middleware/auth.middleware.js";
import { uploadFor, urlForFile } from "../../middleware/upload.middleware.js";
import { parseLineList, parseOptionalJsonArrayString, toBoolean, toNumber } from "../../utils/parsers.js";
import {
  mapBlog,
  mapBooking,
  mapCategory,
  mapContact,
  mapDestination,
  mapGalleryImage,
  mapLayoverPackage,
  mapTestimonial,
  mapTour
} from "../../utils/mappers.js";
import { removeStoredFile } from "../../services/file.service.js";
import { bookingStatusSchema, updateBookingStatus } from "../bookings/bookings.routes.js";
import { sendEmail } from "../../services/email.service.js";
import { slugify } from "../../utils/slug.js";

export const adminRouter = Router();

adminRouter.use(requireAdminAuth);

const idParam = z.coerce.number().int().positive();

function parseCategoryIds(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number).filter(Number.isInteger);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Number.isInteger);
    } catch {
      return value.split(",").map(Number).filter(Number.isInteger);
    }
  }
  return [];
}

function parseItinerary(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? JSON.stringify(parsed) : "[]";
  } catch {
    return "[]";
  }
}

const tourTitleSchema = z.string().trim().min(1, "Tour name is required").max(255);
const tourDestinationSchema = z.coerce.number().int().positive("A destination is required");
const layoverTitleSchema = z.string().trim().min(1, "Title is required").max(255);
const layoverHoursSchema = z.string().trim().min(1, "Hours are required").max(255);
const layoverMinimumConnectionSchema = z.string().trim().min(1, "Minimum connection is required").max(255);
const layoverPackageTypeSchema = z.enum(["layover", "stopover"]);
const layoverPriceSchema = z.string().trim().min(1, "Price is required").max(255);

function parseTourDestinationIds(body: Record<string, unknown>): number[] {
  const destinationIds = [...new Set(
    parseCategoryIds(body.tourDestinations).filter((destinationId) => destinationId > 0)
  )];
  if (destinationIds.length > 0) return destinationIds;
  return [tourDestinationSchema.parse(body.tourDestination)];
}

async function uniqueTourSlug(title: string, excludeId?: number): Promise<string> {
  const base = slugify(title) || "tour";
  let candidate = base;
  let suffix = 2;

  while (true) {
    const existing = await prisma.tour.findUnique({
      where: { slug: candidate },
      select: { id: true }
    });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

async function uniqueLayoverSlug(title: string): Promise<string> {
  const base = slugify(title) || "layover-package";
  let candidate = base;
  let suffix = 2;

  while (true) {
    const existing = await prisma.layoverPackage.findUnique({
      where: { slug: candidate },
      select: { id: true }
    });
    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

const tourUpload = uploadFor("tour");
const destinationUpload = uploadFor("destination");
const blogUpload = uploadFor("blog");
const galleryUpload = uploadFor("gallery");
const layoverUpload = uploadFor("layover");

const tourIncludes = {
  destination: true,
  destinations: { include: { destination: true } },
  gallery: { orderBy: { id: "asc" } },
  categories: { include: { category: true } }
} as const;

// ------------------------- Tours -------------------------

adminRouter.get(
  "/tours",
  asyncHandler(async (_req, res) => {
    const tours = await prisma.tour.findMany({
      include: tourIncludes,
      orderBy: { id: "desc" }
    });
    return ok(res, "Tours fetched successfully", tours.map((t) => mapTour(t)));
  })
);

adminRouter.get(
  "/tours/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const tour = await prisma.tour.findUnique({ where: { id }, include: tourIncludes });
    if (!tour) throw new HttpError(404, "Tour not found");
    return ok(res, "Tour fetched successfully", mapTour(tour, true));
  })
);

adminRouter.post(
  "/tours",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map((f) => urlForFile(f)).filter((path): path is string => Boolean(path));
    if (imagePaths.length === 0) throw new HttpError(422, "At least one tour image is required");
    const storedPaths = files.map((f) => (f as any).storedPath).filter((path): path is string => Boolean(path));

    try {
      const categoryIds = parseCategoryIds(req.body.tourCategories).filter((id) => id > 0);
      const tourTitle = tourTitleSchema.parse(req.body.tourTitle);
      const destinationIds = parseTourDestinationIds(req.body);
      const destinationId = destinationIds[0];
      const slug = await uniqueTourSlug(tourTitle);
      const created = await prisma.tour.create({
        data: {
          destinationId,
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null,
          destinations: {
            createMany: {
              data: destinationIds.map((selectedDestinationId) => ({
                destinationId: selectedDestinationId
              })),
              skipDuplicates: true
            }
          },
          gallery: {
            createMany: { data: imagePaths.map((imageUrl) => ({ imageUrl })) }
          },
          ...(categoryIds.length
            ? {
                categories: {
                  createMany: {
                    data: categoryIds.map((categoryId) => ({ categoryId })),
                    skipDuplicates: true
                  }
                }
              }
            : {})
        },
        include: tourIncludes
      });

      return ok(res, "Tour created successfully", mapTour(created, true), 201);
    } catch (error) {
      await Promise.all(storedPaths.map((storedPath) => removeStoredFile(storedPath)));
      throw error;
    }
  })
);

adminRouter.put(
  "/tours/:id",
  tourUpload.array("tourImages", 20),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const categoryIds = parseCategoryIds(req.body.tourCategories).filter((categoryId) => categoryId > 0);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const imagePaths = files.map((f) => urlForFile(f)).filter((path): path is string => Boolean(path));
    const tourTitle = tourTitleSchema.parse(req.body.tourTitle);
    const destinationIds = parseTourDestinationIds(req.body);
    const destinationId = destinationIds[0];
    const slug = await uniqueTourSlug(tourTitle, id);

    let imagesToRemove: string[] = [];
    const updated = await prisma.$transaction(async (tx) => {
      await tx.tour.update({
        where: { id },
        data: {
          destinationId,
          slug,
          tourName: tourTitle,
          adultPrice: toNumber(req.body.adultPrice) ?? 0,
          childPrice: toNumber(req.body.childPrice) ?? 0,
          discount: req.body.tourDiscount ? String(req.body.tourDiscount) : null,
          rating: toNumber(req.body.tourRating) ?? 0,
          noOfRates: Number(req.body.tourReviews ?? 0),
          isFeatured: toBoolean(req.body.isFeatured),
          overview: String(req.body.tourOverview ?? ""),
          included: parseOptionalJsonArrayString(req.body.tourIncluded),
          excluded: parseOptionalJsonArrayString(req.body.tourExcluded),
          itinerary: parseItinerary(req.body.tourItinerary),
          journeyMap: req.body.tourMap ? String(req.body.tourMap) : null,
          destinations: {
            deleteMany: {},
            createMany: {
              data: destinationIds.map((selectedDestinationId) => ({
                destinationId: selectedDestinationId
              })),
              skipDuplicates: true
            }
          }
        }
      });

      const deleteImageIds = parseCategoryIds(req.body.deleteImages);
      if (deleteImageIds.length) {
        const deleting = await tx.gallery.findMany({
          where: { id: { in: deleteImageIds }, tourId: id }
        });
        await tx.gallery.deleteMany({ where: { id: { in: deleteImageIds }, tourId: id } });
        imagesToRemove = deleting.map((image) => image.imageUrl);
      }

      if (imagePaths.length) {
        await tx.gallery.createMany({
          data: imagePaths.map((imageUrl) => ({ imageUrl, tourId: id }))
        });
      }

      await tx.tourCategoryJunction.deleteMany({ where: { tourId: id } });
      if (categoryIds.length) {
        await tx.tourCategoryJunction.createMany({
          data: categoryIds.map((categoryId) => ({ tourId: id, categoryId })),
          skipDuplicates: true
        });
      }

      return tx.tour.findUnique({ where: { id }, include: tourIncludes });
    }, { maxWait: 10000, timeout: 30000 });

    await Promise.all(imagesToRemove.map((imageUrl) => removeStoredFile(imageUrl)));

    return ok(res, "Tour updated successfully", mapTour(updated, true));
  })
);

adminRouter.delete(
  "/tours/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const gallery = await prisma.gallery.findMany({ where: { tourId: id } });
    await prisma.$transaction([
      prisma.booking.updateMany({ where: { tourId: id }, data: { tourId: null } }),
      prisma.tourBlockedDate.deleteMany({ where: { tourId: id } }),
      prisma.tourCategoryJunction.deleteMany({ where: { tourId: id } }),
      prisma.gallery.deleteMany({ where: { tourId: id } }),
      prisma.tour.delete({ where: { id } })
    ]);
    await Promise.all(gallery.map((image) => removeStoredFile(image.imageUrl)));
    return ok(res, "Tour deleted successfully", null);
  })
);

// ---------------------- Destinations ----------------------

adminRouter.get(
  "/destinations",
  asyncHandler(async (_req, res) => {
    const destinations = await prisma.destination.findMany({
      include: { _count: { select: { tours: true, tourLinks: true } } },
      orderBy: { id: "desc" }
    });
    return ok(res, "Destinations fetched successfully", destinations.map(mapDestination));
  })
);

adminRouter.get(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: { _count: { select: { tours: true, tourLinks: true } } }
    });
    if (!destination) throw new HttpError(404, "Destination not found");
    return ok(res, "Destination fetched successfully", mapDestination(destination));
  })
);

adminRouter.post(
  "/destinations",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Destination image is required");
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.create({
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        imageUrl
      },
      include: { _count: { select: { tours: true, tourLinks: true } } }
    });
    return ok(res, "Destination created successfully", mapDestination(destination), 201);
  })
);

adminRouter.put(
  "/destinations/:id",
  destinationUpload.single("destinationImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const destinationName = String(req.body.destinationName ?? "");
    const slug = slugify(destinationName);
    const destination = await prisma.destination.update({
      where: { id },
      data: {
        slug,
        destinationName,
        description: String(req.body.destinationDescription ?? ""),
        ...(imageUrl ? { imageUrl } : {})
      },
      include: { _count: { select: { tours: true, tourLinks: true } } }
    });
    return ok(res, "Destination updated successfully", mapDestination(destination));
  })
);

adminRouter.delete(
  "/destinations/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.destination.delete({ where: { id } });
    return ok(res, "Destination deleted successfully", null);
  })
);

// ---------------------- Categories ----------------------

const categoryNameSchema = z.object({ categoryName: z.string().trim().min(1).max(120) });

adminRouter.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.tourCategory.findMany({
      include: { _count: { select: { tours: true } } },
      orderBy: { id: "asc" }
    });
    return ok(res, "Categories fetched successfully", categories.map(mapCategory));
  })
);

adminRouter.post(
  "/categories",
  asyncHandler(async (req, res) => {
    const body = categoryNameSchema.parse(req.body);
    const category = await prisma.tourCategory.create({
      data: { categoryName: body.categoryName, slug: slugify(body.categoryName) },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Category created successfully", mapCategory(category), 201);
  })
);

adminRouter.put(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = categoryNameSchema.parse(req.body);
    const category = await prisma.tourCategory.update({
      where: { id },
      data: { categoryName: body.categoryName, slug: slugify(body.categoryName) },
      include: { _count: { select: { tours: true } } }
    });
    return ok(res, "Category updated successfully", mapCategory(category));
  })
);

adminRouter.delete(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.$transaction([
      prisma.tourCategoryJunction.deleteMany({ where: { categoryId: id } }),
      prisma.tourCategory.delete({ where: { id } })
    ]);
    return ok(res, "Category deleted successfully", null);
  })
);

// ---------------------- Gallery ----------------------

adminRouter.get(
  "/gallery",
  asyncHandler(async (_req, res) => {
    const images = await prisma.gallery.findMany({
      include: { tour: { select: { id: true, tourName: true } } },
      orderBy: { id: "desc" }
    });
    return ok(res, "Gallery images fetched successfully", images.map((img) => ({
      ...mapGalleryImage(img),
      tour: img.tour ? { id: img.tour.id, name: img.tour.tourName } : null
    })));
  })
);

adminRouter.post(
  "/gallery",
  galleryUpload.single("galleryImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    if (!imageUrl) throw new HttpError(422, "Gallery image is required");
    const tourId = req.body.tourId ? Number(req.body.tourId) : null;
    const image = await prisma.gallery.create({ data: { imageUrl, tourId } });
    return ok(res, "Gallery image created successfully", mapGalleryImage(image), 201);
  })
);

adminRouter.delete(
  "/gallery/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const image = await prisma.gallery.delete({ where: { id } });
    await removeStoredFile(image.imageUrl);
    return ok(res, "Gallery image deleted successfully", null);
  })
);

// ---------------------- Blog ----------------------

adminRouter.get(
  "/blog",
  asyncHandler(async (_req, res) => {
    const posts = await prisma.blog.findMany({
      include: { category: true },
      orderBy: { id: "desc" }
    });
    return ok(res, "Blog posts fetched successfully", posts.map(mapBlog));
  })
);

adminRouter.get(
  "/blog/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const post = await prisma.blog.findUnique({ where: { id }, include: { category: true } });
    if (!post) throw new HttpError(404, "Blog post not found");
    return ok(res, "Blog post fetched successfully", mapBlog(post));
  })
);

adminRouter.post(
  "/blog",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.create({
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        imageUrl,
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        createdAt: new Date()
      },
      include: { category: true }
    });
    return ok(res, "Blog post created successfully", mapBlog(post), 201);
  })
);

adminRouter.put(
  "/blog/:id",
  blogUpload.single("blogImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const blogTitle = String(req.body.blogTitle ?? "");
    const slug = slugify(blogTitle);
    const post = await prisma.blog.update({
      where: { id },
      data: {
        slug,
        blogTitle,
        description: String(req.body.blogDescription ?? ""),
        categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,
        ...(imageUrl ? { imageUrl } : {})
      },
      include: { category: true }
    });
    return ok(res, "Blog post updated successfully", mapBlog(post));
  })
);

adminRouter.delete(
  "/blog/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.blog.delete({ where: { id } });
    return ok(res, "Blog post deleted successfully", null);
  })
);

// ---------------------- Blog categories ----------------------

const blogCategoryNameSchema = z.object({ name: z.string().trim().min(1).max(120) });

adminRouter.get(
  "/blog-categories",
  asyncHandler(async (_req, res) => {
    const categories = await prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { id: "asc" }
    });
    return ok(res, "Blog categories fetched successfully", categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      postCount: cat._count.posts
    })));
  })
);

adminRouter.post(
  "/blog-categories",
  asyncHandler(async (req, res) => {
    const body = blogCategoryNameSchema.parse(req.body);
    const slug = slugify(body.name);
    const category = await prisma.blogCategory.create({
      data: { name: body.name, slug },
      include: { _count: { select: { posts: true } } }
    });
    return ok(res, "Blog category created successfully", {
      id: category.id,
      name: category.name,
      slug: category.slug,
      postCount: category._count.posts
    }, 201);
  })
);

adminRouter.put(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = blogCategoryNameSchema.parse(req.body);
    const slug = slugify(body.name);
    const category = await prisma.blogCategory.update({
      where: { id },
      data: { name: body.name, slug },
      include: { _count: { select: { posts: true } } }
    });
    return ok(res, "Blog category updated successfully", {
      id: category.id,
      name: category.name,
      slug: category.slug,
      postCount: category._count.posts
    });
  })
);

adminRouter.delete(
  "/blog-categories/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.blogCategory.delete({ where: { id } });
    return ok(res, "Blog category deleted successfully", null);
  })
);

// ---------------------- Testimonials ----------------------

adminRouter.get(
  "/testimonials",
  asyncHandler(async (_req, res) => {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { id: "desc" } });
    return ok(res, "Testimonials fetched successfully", testimonials.map(mapTestimonial));
  })
);

const testimonialSchema = z.object({
  message: z.string().trim().min(1).max(5000),
  reviewerName: z.string().trim().min(1).max(160),
  profession: z.string().trim().max(160).optional()
});

adminRouter.post(
  "/testimonials",
  asyncHandler(async (req, res) => {
    const body = testimonialSchema.parse(req.body);
    const testimonial = await prisma.testimonial.create({ data: body });
    return ok(res, "Testimonial created successfully", mapTestimonial(testimonial), 201);
  })
);

adminRouter.put(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = testimonialSchema.parse(req.body);
    const testimonial = await prisma.testimonial.update({ where: { id }, data: body });
    return ok(res, "Testimonial updated successfully", mapTestimonial(testimonial));
  })
);

adminRouter.delete(
  "/testimonials/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.testimonial.delete({ where: { id } });
    return ok(res, "Testimonial deleted successfully", null);
  })
);

// ---------------------- Bookings ----------------------

adminRouter.get(
  "/bookings",
  asyncHandler(async (_req, res) => {
    const bookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: "desc" }
    });
    return ok(res, "Bookings fetched successfully", bookings.map(mapBooking));
  })
);

adminRouter.get(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { tour: true }
    });
    if (!booking) throw new HttpError(404, "Booking not found");
    return ok(res, "Booking fetched successfully", mapBooking(booking));
  })
);

adminRouter.put(
  "/bookings/:id/status",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const { status } = bookingStatusSchema.parse(req.body);
    const booking = await updateBookingStatus(id, status);
    return ok(res, "Booking status updated successfully", mapBooking(booking));
  })
);

adminRouter.delete(
  "/bookings/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.booking.delete({ where: { id } });
    return ok(res, "Booking deleted successfully", null);
  })
);

// ---------------------- Contacts ----------------------

adminRouter.get(
  "/contacts",
  asyncHandler(async (_req, res) => {
    const contacts = await prisma.contact.findMany({ orderBy: { id: "desc" } });
    return ok(res, "Contacts fetched successfully", contacts.map(mapContact));
  })
);

adminRouter.get(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");
    return ok(res, "Contact fetched successfully", mapContact(contact));
  })
);

adminRouter.post(
  "/contacts/:id/reply",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = z.object({ subject: z.string().min(1), message: z.string().min(1) }).parse(req.body);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new HttpError(404, "Contact not found");

    await sendEmail({
      to: contact.email,
      subject: body.subject,
      html: `
        <p>Dear ${contact.name},</p>
        <p>${body.message.replace(/\r?\n/g, "<br>")}</p>
        <p>Best regards,<br>Ethio Afro Tour Team</p>
      `
    });

    return ok(res, "Reply sent successfully", null);
  })
);

adminRouter.delete(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.contact.delete({ where: { id } });
    return ok(res, "Contact deleted successfully", null);
  })
);

// ---------------------- Subscribers ----------------------

adminRouter.get(
  "/subscribers",
  asyncHandler(async (_req, res) => {
    const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
    return ok(res, "Subscribers fetched successfully", subscribers.map((s) => ({
      id: s.id,
      email: s.email,
      createdAt: s.createdAt
    })));
  })
);

adminRouter.delete(
  "/subscribers/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    await prisma.subscriber.delete({ where: { id } });
    return ok(res, "Subscriber deleted successfully", null);
  })
);

// ---------------------- Layover packages ----------------------

adminRouter.get(
  "/layover-packages",
  asyncHandler(async (_req, res) => {
    const packages = await prisma.layoverPackage.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }]
    });
    return ok(res, "Layover packages fetched successfully", packages.map(mapLayoverPackage));
  })
);

adminRouter.get(
  "/layover-packages/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const record = await prisma.layoverPackage.findUnique({ where: { id } });
    if (!record) throw new HttpError(404, "Layover package not found");
    return ok(res, "Layover package fetched successfully", mapLayoverPackage(record));
  })
);

adminRouter.post(
  "/layover-packages",
  layoverUpload.single("layoverImage"),
  asyncHandler(async (req, res) => {
    const imageUrl = req.file ? urlForFile(req.file) : undefined;
    const title = layoverTitleSchema.parse(req.body.title);
    const hours = layoverHoursSchema.parse(req.body.hours);
    const minimumConnection = layoverMinimumConnectionSchema.parse(req.body.minimumConnection);
    const packageType = layoverPackageTypeSchema.parse(req.body.packageType);
    const price = layoverPriceSchema.parse(req.body.price);
    const slug = await uniqueLayoverSlug(title);
    const created = await prisma.layoverPackage.create({
      data: {
        slug,
        hours,
        minimumConnection,
        packageType,
        title,
        price,
        teaser: String(req.body.teaser ?? ""),
        itinerary: JSON.stringify(parseLineList(req.body.itinerary)),
        includes: JSON.stringify(parseLineList(req.body.includes)),
        excludes: JSON.stringify(parseLineList(req.body.excludes)),
        bestFor: String(req.body.bestFor ?? ""),
        sortOrder: toNumber(req.body.sortOrder) ?? 0,
        ...(imageUrl ? { imageUrl } : {})
      }
    });
    return ok(res, "Layover package created successfully", mapLayoverPackage(created), 201);
  })
);

adminRouter.put(
  "/layover-packages/:id",
  layoverUpload.single("layoverImage"),
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const existing = await prisma.layoverPackage.findUnique({ where: { id } });
    if (!existing) throw new HttpError(404, "Layover package not found");

    // Validate the minimums on fields the form sends (title, hours, price are
    // required in the UI); fields absent from the body keep their old behavior.
    const title = req.body.title === undefined ? "" : layoverTitleSchema.parse(req.body.title);
    const hours = req.body.hours === undefined ? "" : layoverHoursSchema.parse(req.body.hours);
    const minimumConnection = req.body.minimumConnection === undefined ? "" : layoverMinimumConnectionSchema.parse(req.body.minimumConnection);
    const packageType = req.body.packageType === undefined ? "layover" : layoverPackageTypeSchema.parse(req.body.packageType);
    const price = req.body.price === undefined ? "" : layoverPriceSchema.parse(req.body.price);

    const newImageUrl = req.file ? urlForFile(req.file) : undefined;
    const removeImage = req.body.removeImage === "true";
    let imageUrl = existing.imageUrl;
    let storedToRemove: string | null = null;
    if (newImageUrl || removeImage) {
      imageUrl = newImageUrl ?? null;
      storedToRemove = existing.imageUrl;
    }

    const updated = await prisma.layoverPackage.update({
      where: { id },
      data: {
        // slug deliberately preserved: renaming a package must not change its identity.
        hours,
        minimumConnection,
        packageType,
        title,
        price,
        teaser: String(req.body.teaser ?? ""),
        itinerary: JSON.stringify(parseLineList(req.body.itinerary)),
        includes: JSON.stringify(parseLineList(req.body.includes)),
        excludes: JSON.stringify(parseLineList(req.body.excludes)),
        bestFor: String(req.body.bestFor ?? ""),
        sortOrder: toNumber(req.body.sortOrder) ?? 0,
        imageUrl
      }
    });

    if (storedToRemove) await removeStoredFile(storedToRemove);
    return ok(res, "Layover package updated successfully", mapLayoverPackage(updated));
  })
);

adminRouter.delete(
  "/layover-packages/:id",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const existing = await prisma.layoverPackage.findUnique({ where: { id } });
    if (!existing) throw new HttpError(404, "Layover package not found");
    await prisma.layoverPackage.delete({ where: { id } });
    if (existing.imageUrl) await removeStoredFile(existing.imageUrl);
    return ok(res, "Layover package deleted successfully", null);
  })
);

// ---------------------- Dashboard ----------------------

adminRouter.get(
  "/dashboard/stats",
  asyncHandler(async (_req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalTours,
      totalDestinations,
      totalBookings,
      totalGalleryImages,
      totalContacts,
      recentBookings,
      bookingTrends,
      topTours
    ] = await Promise.all([
      prisma.tour.count(),
      prisma.destination.count(),
      prisma.booking.count(),
      prisma.gallery.count(),
      prisma.contact.count(),
      prisma.booking.findMany({
        include: { tour: true },
        orderBy: { createdAt: "desc" },
        take: 5
      }),
      prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
        SELECT DATE(created_at) as date, COUNT(*)::int as count
        FROM bookings
        WHERE created_at >= ${thirtyDaysAgo}
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) ASC
      `,
      prisma.tour.findMany({
        select: {
          id: true,
          tourName: true,
          _count: { select: { bookings: true } }
        },
        orderBy: { bookings: { _count: "desc" } },
        take: 10
      })
    ]);

    return ok(res, "Dashboard stats fetched successfully", {
      totals: {
        tours: totalTours,
        destinations: totalDestinations,
        bookings: totalBookings,
        galleryImages: totalGalleryImages,
        contacts: totalContacts
      },
      recentBookings: recentBookings.map(mapBooking),
      bookingTrends: bookingTrends.map((row) => ({
        date: row.date.toISOString().slice(0, 10),
        count: Number(row.count)
      })),
      topTours: topTours.map((t) => ({
        id: t.id,
        name: t.tourName,
        bookingCount: t._count.bookings
      }))
    });
  })
);

// ---------------------- Blocked dates ----------------------

const blockedDateSchema = z.object({
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).min(1),
  reason: z.string().optional()
});

adminRouter.get(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const blockedDates = await prisma.tourBlockedDate.findMany({
      where: { tourId: id },
      orderBy: { date: "asc" }
    });

    return ok(res, "Blocked dates fetched successfully", blockedDates.map((bd) => ({
      id: bd.id,
      date: bd.date.toISOString().slice(0, 10),
      reason: bd.reason
    })));
  })
);

adminRouter.post(
  "/tours/:id/blocked-dates",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const body = blockedDateSchema.parse(req.body);

    const tour = await prisma.tour.findUnique({ where: { id }, select: { id: true } });
    if (!tour) throw new HttpError(404, "Tour not found");

    const created = await prisma.tourBlockedDate.createMany({
      data: body.dates.map((date) => ({
        tourId: id,
        date: new Date(`${date}T00:00:00.000Z`),
        reason: body.reason
      })),
      skipDuplicates: true
    });

    return ok(res, `${created.count} blocked dates created successfully`, { count: created.count }, 201);
  })
);

adminRouter.delete(
  "/tours/:id/blocked-dates/:blockedDateId",
  asyncHandler(async (req, res) => {
    const id = idParam.parse(req.params.id);
    const blockedDateId = idParam.parse(req.params.blockedDateId);

    const blockedDate = await prisma.tourBlockedDate.findFirst({
      where: { id: blockedDateId, tourId: id }
    });
    if (!blockedDate) throw new HttpError(404, "Blocked date not found");

    await prisma.tourBlockedDate.delete({ where: { id: blockedDateId } });
    return ok(res, "Blocked date deleted successfully", null);
  })
);

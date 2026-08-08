-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "admin_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password_hash" TEXT,
    "profile_pic_url" TEXT,
    "token_version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "admin_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER,
    "slug" VARCHAR(255) NOT NULL,
    "tour_name" TEXT NOT NULL,
    "adult_price" DECIMAL(10,2) NOT NULL,
    "child_price" DECIMAL(10,2) NOT NULL,
    "discount" TEXT,
    "rating" DECIMAL(3,1) NOT NULL,
    "no_of_rates" INTEGER,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "overview" TEXT,
    "included" TEXT,
    "excluded" TEXT,
    "itinerary" TEXT,
    "journey_map" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "destination_name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_destination_junction" (
    "Tour_ID" INTEGER NOT NULL,
    "Destination_ID" INTEGER NOT NULL,

    CONSTRAINT "tour_destination_junction_pkey" PRIMARY KEY ("Tour_ID","Destination_ID")
);

-- CreateTable
CREATE TABLE "tour_category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "slug" VARCHAR(255),
    "created_at" TIMESTAMP(3),

    CONSTRAINT "tour_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_category_junction" (
    "Tour_ID" INTEGER NOT NULL,
    "Category_ID" INTEGER NOT NULL,

    CONSTRAINT "tour_category_junction_pkey" PRIMARY KEY ("Tour_ID","Category_ID")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" SERIAL NOT NULL,
    "Image_url" TEXT NOT NULL,
    "Tour_ID" INTEGER,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_blocked_dates" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "reason" TEXT,

    CONSTRAINT "tour_blocked_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "Tour_ID" INTEGER,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "chosen_date" DATE NOT NULL,
    "no_of_adults" INTEGER NOT NULL,
    "no_of_children" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "blog_title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "categoryId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "blog_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "reviewer_name" TEXT NOT NULL,
    "profession" TEXT,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "content" BYTEA NOT NULL,
    "mime_type" TEXT NOT NULL,
    "original_name" TEXT,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_table_email_key" ON "admin_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE INDEX "tour_destination_junction_Destination_ID_idx" ON "tour_destination_junction"("Destination_ID");

-- CreateIndex
CREATE UNIQUE INDEX "tour_category_slug_key" ON "tour_category"("slug");

-- CreateIndex
CREATE INDEX "tour_blocked_dates_tourId_date_idx" ON "tour_blocked_dates"("tourId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "tour_blocked_dates_tourId_date_key" ON "tour_blocked_dates"("tourId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "blog_slug_key" ON "blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_name_key" ON "blog_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_slug_key" ON "blog_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_destination_junction" ADD CONSTRAINT "tour_destination_junction_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_destination_junction" ADD CONSTRAINT "tour_destination_junction_Destination_ID_fkey" FOREIGN KEY ("Destination_ID") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_category_junction" ADD CONSTRAINT "tour_category_junction_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_category_junction" ADD CONSTRAINT "tour_category_junction_Category_ID_fkey" FOREIGN KEY ("Category_ID") REFERENCES "tour_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_blocked_dates" ADD CONSTRAINT "tour_blocked_dates_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_Tour_ID_fkey" FOREIGN KEY ("Tour_ID") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;


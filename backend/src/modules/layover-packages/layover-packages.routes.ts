import { Router } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapLayoverPackage } from "../../utils/mappers.js";

export const layoverPackagesRouter = Router();

layoverPackagesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const packages = await prisma.layoverPackage.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }]
    });
    return ok(res, "Layover packages fetched successfully", packages.map(mapLayoverPackage));
  })
);
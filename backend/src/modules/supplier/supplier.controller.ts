import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  deleteSupplier,
} from "./supplier.service";
import { createSupplierSchema } from "./supplier.schema";

export async function listSuppliers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const suppliers = await getSuppliers(search);

    return res.json({ data: suppliers });
  } catch (error) {
    next(error);
  }
}

export async function showSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID supplier tidak valid.",
      });
    }

    const supplier = await getSupplierById(id);

    if (!supplier) {
      return res.status(404).json({
        message: "Data supplier tidak ditemukan.",
      });
    }

    return res.json({ data: supplier });
  } catch (error) {
    next(error);
  }
}

export async function storeSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = createSupplierSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data supplier tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const supplier = await createSupplier(validation.data);

    return res.status(201).json({
      message: "Data supplier berhasil ditambahkan.",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID supplier tidak valid.",
      });
    }

    await deleteSupplier(id);

    return res.json({
      message: "Data supplier berhasil dihapus.",
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Data supplier tidak ditemukan.",
      });
    }

    next(error);
  }
}

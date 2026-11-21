import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";
import {
  getCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
} from "./company.service";
import { createCompanySchema } from "./company.schema";

export async function listCompanies(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const companies = await getCompanies(search);

    return res.json({ data: companies });
  } catch (error) {
    next(error);
  }
}

export async function showCompany(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID perusahaan tidak valid.",
      });
    }

    const company = await getCompanyById(id);

    if (!company) {
      return res.status(404).json({
        message: "Data perusahaan tidak ditemukan.",
      });
    }

    return res.json({ data: company });
  } catch (error) {
    next(error);
  }
}

export async function storeCompany(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = createCompanySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data perusahaan tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const company = await createCompany(validation.data);

    return res.status(201).json({
      message: "Data perusahaan berhasil ditambahkan.",
      data: company,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeCompany(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID perusahaan tidak valid.",
      });
    }

    await deleteCompany(id);

    return res.json({
      message: "Data perusahaan berhasil dihapus.",
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Data perusahaan tidak ditemukan.",
      });
    }

    next(error);
  }
}

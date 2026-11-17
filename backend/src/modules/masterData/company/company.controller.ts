import type { Request, Response, NextFunction } from "express";
import { getCompanies, getCompanyById } from "./company.service";

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

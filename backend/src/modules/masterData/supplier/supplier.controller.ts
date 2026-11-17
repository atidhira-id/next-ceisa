import type { Request, Response, NextFunction } from "express";
import { getSuppliers, getSupplierById } from "./supplier.service";

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
        message: "ID perusahaan tidak valid.",
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

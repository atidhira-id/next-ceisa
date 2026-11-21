import type { Request, Response, NextFunction } from "express";
import { createOptionSchema, updateOptionSchema } from "./options.schema";
import {
  getOptionCategories,
  getOptionsByCategory,
  createOption,
  updateOption,
  deactivateOption,
} from "./options.service";

export async function listOptionCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getOptionCategories();
    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function listOptions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const code = req.params.code;

    if (typeof code !== "string") {
      return res.status(400).json({ message: "Kode kategori tidak valid." });
    }

    const activeOnly = req.query.activeOnly !== "false";
    const data = await getOptionsByCategory(code, activeOnly);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function storeOption(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const code = req.params.code;

    if (typeof code !== "string") {
      return res.status(400).json({ message: "Kode kategori tidak valid." });
    }

    const validation = createOptionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data opsi tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const data = await createOption(code, validation.data);

    if (!data) {
      return res.status(404).json({
        message: "Kategori opsi tidak ditemukan.",
      });
    }

    return res.status(201).json({
      message: "Opsi berhasil ditambahkan.",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function editOption(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "ID opsi tidak valid." });
    }

    const validation = updateOptionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data opsi tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const data = await updateOption(id, validation.data);

    if (!data) {
      return res.status(404).json({ message: "Opsi tidak ditemukan." });
    }

    return res.json({
      message: "Opsi berhasil diperbarui.",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeOption(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "ID opsi tidak valid." });
    }

    const success = await deactivateOption(id);

    if (!success) {
      return res.status(404).json({ message: "Opsi tidak ditemukan." });
    }

    return res.json({
      message: "Opsi berhasil dinonaktifkan.",
    });
  } catch (error) {
    next(error);
  }
}

import type { Request, Response, NextFunction } from "express";
import {
  getGoodsTypes,
  getGoodsTypeByCode,
  upsertGoodsType,
  deleteGoodsType,
} from "./goodsType.service";
import { goodsTypeSchema } from "./goodsType.schema";

function getParamCode(req: Request) {
  const code = req.params.code;
  return Array.isArray(code) ? code[0] : code;
}

export async function getGoodsTypesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getGoodsTypes();
    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function getGoodsTypeByCodeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getGoodsTypeByCode(getParamCode(req));

    if (!data) {
      return res.status(404).json({
        message: "Tipe barang tidak ditemukan.",
      });
    }

    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function upsertGoodsTypeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = goodsTypeSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        message: "Data tipe barang tidak valid.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const data = await upsertGoodsType(validation.data);
    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function deleteGoodsTypeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await deleteGoodsType(getParamCode(req));

    return res.status(200).json({
      message: "Tipe barang berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
}

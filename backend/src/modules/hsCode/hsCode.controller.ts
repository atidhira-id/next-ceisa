import type { Request, Response, NextFunction } from "express";
import {
  getHsCodes,
  getHsCodeByCode,
  upsertHsCode,
  deleteHsCode,
} from "./hsCode.service";
import { hsCodeSchema } from "./hsCode.schema";

function getParamCode(req: Request) {
  const code = req.params.code;
  return Array.isArray(code) ? code[0] : code;
}

export async function getHsCodesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getHsCodes();
    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function getHsCodeByCodeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getHsCodeByCode(getParamCode(req));

    if (!data) {
      return res.status(404).json({
        message: "HS Code tidak ditemukan.",
      });
    }

    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function upsertHsCodeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = hsCodeSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: "Data HS Code tidak valid.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const data = await upsertHsCode({
      ...validation.data,
      importDutyPercentage: validation.data.importDutyPercentage.toString(),
      vatPercentage: validation.data.vatPercentage.toString(),
      incomeTaxPercentage: validation.data.incomeTaxPercentage.toString(),
    });

    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function deleteHsCodeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await deleteHsCode(getParamCode(req));

    return res.status(200).json({
      message: "HS Code berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
}

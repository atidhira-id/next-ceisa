import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.details as object),
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Terjadi kesalahan pada server.",
  });
}

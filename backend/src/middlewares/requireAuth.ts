import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Silakan login terlebih dahulu.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      req.session.destroy(() => {});

      return res.status(401).json({
        message: "Pengguna tidak ditemukan atau tidak aktif.",
      });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

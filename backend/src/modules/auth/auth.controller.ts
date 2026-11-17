import type { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { loginService, getCurrentUserService } from "./auth.service";

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Data login tidak valid.",
      errors: parsed.error.flatten(),
    });
  }

  const user = await loginService(parsed.data);

  if (!user) {
    return res.status(401).json({
      message: "Email atau password salah.",
    });
  }

  req.session.userId = user.id;

  return res.status(200).json({
    message: "Login berhasil.",
    user,
  });
}

export async function logout(req: Request, res: Response) {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Gagal logout.",
      });
    }

    res.clearCookie("app.sid");

    return res.status(200).json({
      message: "Logout berhasil.",
    });
  });
}

export async function me(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json({
      message: "Sesi tidak valid.",
    });
  }

  return res.status(200).json({ user });
}

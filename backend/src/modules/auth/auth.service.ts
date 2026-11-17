import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma";
import type { LoginInput } from "./auth.schema";

export async function loginService(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const validPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!validPassword) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function getCurrentUserService(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
    },
  });
}

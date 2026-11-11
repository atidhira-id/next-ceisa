import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      user: null,
      error: {
        message: "Silakan login terlebih dahulu.",
        status: 401,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    return {
      user: null,
      error: {
        message: "Pengguna tidak ditemukan atau tidak aktif.",
        status: 401,
      },
    };
  }

  return {
    user,
    error: null,
  };
}

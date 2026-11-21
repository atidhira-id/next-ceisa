import { PrismaClient } from "../../src/generated/prisma/client";
import { hash } from "bcryptjs";

export async function seedAdmin(prisma: PrismaClient) {
  console.log("Memulai seed Admin...");
  const passwordHash = await hash("Admin123!", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@example.com",
      passwordHash,
      isActive: true,
    },
  });
  console.log("Seed Admin selesai.");
}

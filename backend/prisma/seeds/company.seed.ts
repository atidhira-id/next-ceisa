import { PrismaClient } from "../../src/generated/prisma/client";
import { companies } from "../../data/companies";

export async function seedCompany(prisma: PrismaClient) {
  console.log("Memulai seed Company...");

  for (const company of companies) {
    const existing = await prisma.company.findFirst({
      where: {
        identityNumber: company.identityNumber,
      },
    });

    if (existing) {
      await prisma.company.update({
        where: { id: existing.id },
        data: company,
      });
    } else {
      await prisma.company.create({
        data: company,
      });
    }
  }

  console.log("Seed Company selesai.");
}

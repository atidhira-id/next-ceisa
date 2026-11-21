import { PrismaClient } from "../../src/generated/prisma/client";
import { hsData } from "../../data/hsCode";

export async function seedHsCode(prisma: PrismaClient) {
  console.log("Memulai seed HS Code...");

  for (const item of hsData) {
    await prisma.hsCode.upsert({
      where: { code: item.code },
      update: {
        importDutyPercentage: item.importDutyPercentage.toString(),
        vatPercentage: item.vatPercentage.toString(),
        incomeTaxPercentage: item.incomeTaxPercentage.toString(),
        borderRestriction: item.borderRestriction ?? null,
        postBorderRestriction: item.postBorderRestriction ?? null,
      },
      create: {
        code: item.code,
        importDutyPercentage: item.importDutyPercentage.toString(),
        vatPercentage: item.vatPercentage.toString(),
        incomeTaxPercentage: item.incomeTaxPercentage.toString(),
        borderRestriction: item.borderRestriction ?? null,
        postBorderRestriction: item.postBorderRestriction ?? null,
        label: item.code,
      },
    });
  }
  console.log("Seed HS Code selesai.");
}

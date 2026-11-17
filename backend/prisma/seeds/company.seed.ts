import "dotenv/config";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const companies = [
  {
    identityTypeCode: "6",
    identityNumber: "0010606028007000",
    name: "PT UNITED TRACTORS PANDU ENGINEERING",
    address:
      "JL. JABABEKA XI KAWASAN INDUSTRI JABABEKA, BLOK H, 30-40, HAJARMEKAR, CIKARANG UTARA, KAB. BEKASI, JAWA BARAT, 17530",
    apiTypeCode: "02",
    apiNumber: "9120105931425",
    statusCode: "MITA",
    countryCode: "ID",
  },
];

async function main() {
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

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { supplierList } from "../../data/supplier";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Memulai seed Supplier...");

  for (const supplier of supplierList) {
    const data = {
      name: supplier.nama,
      address: supplier.alamat,
      countryCode: supplier.kodeNegara,
    };

    const existing = await prisma.supplier.findFirst({
      where: {
        name: data.name,
        address: data.address,
        countryCode: data.countryCode,
      },
    });

    if (existing) {
      await prisma.supplier.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.supplier.create({
        data,
      });
    }
  }

  console.log("Seed Supplier selesai.");
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

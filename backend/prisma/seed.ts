import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedAdmin } from "./seeds/admin.seed";
import { seedSupplier } from "./seeds/supplier.seed";
import { seedCompany } from "./seeds/company.seed";
import { seedOptions } from "./seeds/options.seed";
import { seedHsCode } from "./seeds/hsCode.seed";
import { seedGoodsType } from "./seeds/goodsType.seed";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Memulai proses seeding utama...");

  await seedAdmin(prisma);
  await seedCompany(prisma);
  await seedSupplier(prisma);
  await seedOptions(prisma);
  await seedHsCode(prisma);
  await seedGoodsType(prisma);

  console.log("Semua seed berhasil dijalankan!");
}

main()
  .catch((error) => {
    console.error("Seed utama gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

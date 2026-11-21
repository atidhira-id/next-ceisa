import { PrismaClient } from "../../src/generated/prisma/client";
import { supplierList } from "../../data/supplier";

export async function seedSupplier(prisma: PrismaClient) {
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

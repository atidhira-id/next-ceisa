import { prisma } from "../../../config/prisma";

export async function getSuppliers(search?: string) {
  return prisma.supplier.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { countryCode: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: {
      name: "asc",
    },
  });
}

export async function getSupplierById(id: string) {
  return prisma.supplier.findUnique({
    where: { id },
  });
}

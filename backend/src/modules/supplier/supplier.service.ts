import { prisma } from "../../config/prisma";
import type { CreateSupplierInput } from "./supplier.schema";

export async function getSuppliers(search?: string) {
  return prisma.supplier.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: { name: "asc" },
  });
}

export async function getSupplierById(id: string) {
  return prisma.supplier.findUnique({
    where: { id },
  });
}

export async function createSupplier(data: CreateSupplierInput) {
  return prisma.supplier.create({
    data,
  });
}

export async function deleteSupplier(id: string) {
  return prisma.supplier.delete({
    where: { id },
  });
}

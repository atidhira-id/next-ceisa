import { prisma } from "../../config/prisma";
import type { CreateCompanyInput } from "./company.schema";

export async function getCompanies(search?: string) {
  return prisma.company.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { identityNumber: { contains: search } },
          ],
        }
      : undefined,
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({
    where: { id },
  });
}

export async function createCompany(data: CreateCompanyInput) {
  return prisma.company.create({
    data,
  });
}

export async function deleteCompany(id: string) {
  return prisma.company.delete({
    where: { id },
  });
}

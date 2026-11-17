import { prisma } from "../../../config/prisma";

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

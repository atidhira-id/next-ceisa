import { prisma } from "../../config/prisma";
import type { CreateOptionInput, UpdateOptionInput } from "./options.schema";

export async function getOptionCategories() {
  return prisma.optionCategory.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
    },
  });
}

export async function getOptionsByCategory(
  categoryCode: string,
  activeOnly = true,
) {
  return prisma.masterOption.findMany({
    where: {
      category: {
        code: categoryCode,
      },
      ...(activeOnly ? { isActive: true } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
    select: {
      id: true,
      value: true,
      label: true,
      sortOrder: true,
      isActive: true,
    },
  });
}

export async function createOption(
  categoryCode: string,
  data: CreateOptionInput,
) {
  const category = await prisma.optionCategory.findUnique({
    where: { code: categoryCode },
  });

  if (!category) return null;

  return prisma.masterOption.create({
    data: {
      categoryId: category.id,
      value: data.value,
      label: data.label,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}

export async function updateOption(id: string, data: UpdateOptionInput) {
  const result = await prisma.masterOption.updateMany({
    where: { id },
    data,
  });

  if (result.count === 0) return null;

  return prisma.masterOption.findUnique({
    where: { id },
  });
}

export async function deactivateOption(id: string) {
  const result = await prisma.masterOption.updateMany({
    where: { id },
    data: { isActive: false },
  });

  return result.count > 0;
}

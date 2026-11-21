import { PrismaClient } from "../../src/generated/prisma/client";
import { options } from "../../data/options";

import { optionsDraft } from "../../data/optionsDraft";
import { optionsHeader } from "../../data/optionsHeader";
import { optionsEntities } from "../../data/optionsEntities";
import { optionsDocument } from "../../data/optionsDocument";
import { optionsTransport } from "../../data/optionsTransport";
import { optionsPackageContainer } from "../../data/optionsPackage";
import { optionsTransaction } from "../../data/optionsTransaction";
import { optionsGoods } from "../../data/optionsGoods";

export const allOptions = {
  ...optionsDraft,
  ...optionsHeader,
  ...optionsEntities,
  ...optionsDocument,
  ...optionsTransport,
  ...optionsPackageContainer,
  ...optionsTransaction,
  ...optionsGoods,
};

export async function seedOptions(prisma: PrismaClient) {
  console.log("Memulai seed Option Category...");

  for (const option of options) {
    const existing = await prisma.optionCategory.findFirst({
      where: {
        code: option.code,
      },
    });

    if (existing) {
      await prisma.optionCategory.update({
        where: { code: existing.code },
        data: option,
      });
    } else {
      await prisma.optionCategory.create({
        data: option,
      });
    }
  }

  console.log("Seed Option Category selesai.");

  console.log("Memulai seed MasterOption...");
  for (const [categoryCode, options] of Object.entries(allOptions)) {
    const category = await prisma.optionCategory.findUnique({
      where: {
        code: categoryCode,
      },
    });

    if (!category) {
      throw new Error(`Kategori ${categoryCode} tidak ditemukan.`);
    }

    for (const [index, option] of options.entries()) {
      await prisma.masterOption.upsert({
        where: {
          categoryId_value: {
            categoryId: category.id,
            value: option.value,
          },
        },
        update: {
          label: option.label,
          sortOrder: index,
        },
        create: {
          categoryId: category.id,
          value: option.value,
          label: option.label,
          sortOrder: index,
        },
      });
    }
  }
}

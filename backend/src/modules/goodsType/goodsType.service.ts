import { prisma } from "../../config/prisma";

type GoodsTypeInput = {
  code: string;
  label: string;
  hsCodeCode: string;
};

export async function getGoodsTypes() {
  return prisma.goodsType.findMany({
    include: {
      hsCode: true,
    },
    orderBy: { code: "asc" },
  });
}

export async function getGoodsTypeByCode(code: string) {
  return prisma.goodsType.findUnique({
    where: { code },
    include: {
      hsCode: true,
    },
  });
}

export async function upsertGoodsType(data: GoodsTypeInput) {
  const { code, label, hsCodeCode } = data;

  return prisma.goodsType.upsert({
    where: { code },
    update: {
      label,
      hsCode: {
        connect: { code: hsCodeCode },
      },
    },
    create: {
      code,
      label,
      hsCode: {
        connect: { code: hsCodeCode },
      },
    },
    include: {
      hsCode: true,
    },
  });
}

export async function deleteGoodsType(code: string) {
  return prisma.goodsType.delete({
    where: { code },
  });
}

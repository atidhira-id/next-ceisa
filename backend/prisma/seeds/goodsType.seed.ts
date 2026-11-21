import { PrismaClient } from "../../src/generated/prisma/client";
import { GoodsTypeHsCodeData } from "../../data/goodsType";

export async function seedGoodsType(prisma: PrismaClient) {
  console.log("Memulai seed Tipe Barang...");

  for (const [goodsTypeCode, hsCode] of Object.entries(GoodsTypeHsCodeData)) {
    const hs = await prisma.hsCode.findUnique({
      where: { code: hsCode },
      select: { id: true },
    });

    if (!hs) {
      throw new Error(`HS Code ${hsCode} tidak ditemukan.`);
    }

    await prisma.goodsType.upsert({
      where: { code: goodsTypeCode },
      update: { hsCodeId: hs.id },
      create: {
        code: goodsTypeCode,
        hsCodeId: hs.id,
        label: goodsTypeCode,
      },
    });
  }
  console.log("Seed Tipe Barang selesai.");
}

import { z } from "zod";

export const goodsTypeSchema = z.object({
  code: z.string().trim().min(1, "Kode tipe barang wajib diisi."),
  label: z.string().trim().min(1, "Nama tipe barang wajib diisi."),
  hsCodeCode: z.string().trim().min(1, "Kode HS wajib dipilih."),
});

export type GoodsTypeInput = z.infer<typeof goodsTypeSchema>;

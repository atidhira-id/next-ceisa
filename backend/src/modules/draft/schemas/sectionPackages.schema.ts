import { z } from "zod";

export const packageItemSchema = z.object({
  series: z.number().int().positive("Seri harus lebih dari 0."),
  packageCode: z.string().min(1, "Jenis kemasan wajib diisi."),
  quantity: z.number().positive("Jumlah kemasan harus lebih dari 0."),
  brand: z.string().min(1, "Merek kemasan wajib diisi."),
  sealNumber: z.string().optional(),
});

export const packagesSchema = z.array(packageItemSchema);

export const packagesFinalSchema = packagesSchema.min(
  1,
  "Minimal harus ada 1 data kemasan.",
);

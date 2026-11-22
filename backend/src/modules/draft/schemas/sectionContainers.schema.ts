import { z } from "zod";

export const containerItemSchema = z.object({
  series: z.number().int().positive("Seri harus lebih dari 0."),
  containerNumber: z
    .string()
    .regex(
      /^[A-Z]{4}[0-9]{7}$/,
      "Nomor kontainer harus terdiri dari 4 huruf + 7 angka.",
    ),
  containerSizeCode: z.string().min(1, "Ukuran kontainer wajib diisi."),
  containerTypeCode: z.string().min(1, "Tipe kontainer wajib diisi."),
  containerCategoryCode: z.string().min(1, "Kategori kontainer wajib diisi."),
  sealNumber: z.string().optional(),
});

export const containersSchema = z.array(containerItemSchema);

export const containersFinalSchema = containersSchema.min(
  1,
  "Minimal harus ada 1 data kontainer.",
);

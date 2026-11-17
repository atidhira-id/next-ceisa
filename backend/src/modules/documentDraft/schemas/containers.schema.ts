import { z } from "zod";

export const containerItemSchema = z.object({
  series: z.number().int().positive(),
  containerNumber: z
    .string()
    .regex(
      /^[A-Z]{4}[0-9]{7}$/,
      "Nomor kontainer harus terdiri dari 4 huruf + 7 angka.",
    ),
  containerSizeCode: z.string().min(1),
  containerTypeCode: z.string().min(1),
  containerCategoryCode: z.string().min(1),
  sealNumber: z.string().optional(),
});

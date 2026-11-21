import { z } from "zod";

export const createOptionSchema = z.object({
  value: z.string().trim().min(1, "Kode opsi wajib diisi."),
  label: z.string().trim().min(1, "Label opsi wajib diisi."),
  sortOrder: z.number().int().min(0).optional(),
});

export const updateOptionSchema = z
  .object({
    value: z.string().trim().min(1).optional(),
    label: z.string().trim().min(1).optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diubah.",
  });

export type CreateOptionInput = z.infer<typeof createOptionSchema>;
export type UpdateOptionInput = z.infer<typeof updateOptionSchema>;

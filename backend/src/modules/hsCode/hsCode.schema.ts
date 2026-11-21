import { z } from "zod";

export const hsCodeSchema = z.object({
  code: z.string().trim().min(1, "Kode HS wajib diisi."),
  label: z.string().trim().min(1, "Nama HS wajib diisi."),

  importDutyPercentage: z.coerce
    .number()
    .min(0, "BM tidak boleh negatif.")
    .max(100, "BM maksimal 100%."),

  vatPercentage: z.coerce
    .number()
    .min(0, "PPN tidak boleh negatif.")
    .max(100, "PPN maksimal 100%."),

  incomeTaxPercentage: z.coerce
    .number()
    .min(0, "PPh tidak boleh negatif.")
    .max(100, "PPh maksimal 100%."),

  borderRestriction: z.string().trim().nullable().optional(),
  postBorderRestriction: z.string().trim().nullable().optional(),
});

export type HsCodeInput = z.infer<typeof hsCodeSchema>;

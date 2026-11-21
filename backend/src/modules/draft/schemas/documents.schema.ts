import { z } from "zod";

export const documentItemSchema = z.object({
  series: z.number().int().positive("Seri harus lebih dari 0."),
  documentCode: z.string().min(1, "Kode dokumen wajib diisi."),
  documentNumber: z.string().min(1, "Nomor dokumen wajib diisi."),
  documentDate: z.string().min(1, "Tanggal dokumen wajib diisi."),
  facilityCode: z.string().optional(),
  permissionCode: z.string().optional(),
});

export const documentsSchema = z.array(documentItemSchema).min(1);

export const documentsFinalSchema = documentsSchema.refine(
  (documents) => documents.some((document) => document.documentCode === "380"),
  {
    message: "Dokumen Invoice (kode 380) wajib ditambahkan.",
  },
);

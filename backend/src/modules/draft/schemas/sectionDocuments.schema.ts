import { z } from "zod";

export const documentItemSchema = z
  .object({
    series: z.number().int().positive("Seri harus lebih dari 0."),
    documentCode: z.string().min(1, "Kode dokumen wajib diisi."),
    documentNumber: z.string().min(1, "Nomor dokumen wajib diisi."),
    documentDate: z.string().min(1, "Tanggal dokumen wajib diisi."),
    facilityCode: z.string().optional(), // muncul di kode dokumen 861 (wajib diisi)
    permissionCode: z.string().optional(), // muncul di kode dokumen 888 (wajib diisi)
  })
  .superRefine((document, ctx) => {
    if (document.documentCode === "861" && !document.facilityCode) {
      ctx.addIssue({
        code: "custom",
        path: ["facilityCode"],
        message: "Fasilitas dokumen wajib diisi.",
      });
    }

    if (document.documentCode === "888" && !document.permissionCode) {
      ctx.addIssue({
        code: "custom",
        path: ["permissionCode"],
        message: "Perizinan dokumen wajib diisi.",
      });
    }
  });

export const documentsSchema = z.array(documentItemSchema);

// Invoice (380) => wajib ada
// BL (705) atau AWB (740) => salah satu wajib ada
export const documentsFinalSchema = documentsSchema.superRefine(
  (documents, ctx) => {
    if (!documents.some((document) => document.documentCode === "380")) {
      ctx.addIssue({
        code: "custom",
        message: "Dokumen Invoice (kode 380) wajib ditambahkan.",
      });
    }

    if (
      !documents.some(
        (document) =>
          document.documentCode === "705" || document.documentCode === "740",
      )
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Dokumen BL (705) atau AWB (740) wajib ditambahkan.",
      });
    }
  },
);

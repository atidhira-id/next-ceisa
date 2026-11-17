import { z } from "zod";

export const saveDraftSchema = z.looseObject({
  nomorAju: z.string().trim().min(1, "Nomor Aju wajib tersedia."),
  kodeDokumen: z.string().trim().min(1, "Kode Dokumen wajib tersedia."),
  jenisEntitas: z.string().trim().min(1, "Jenis Entitas wajib tersedia."),
});

export const exportDocumentSchema = z.looseObject({
  nomorAju: z.string().trim().min(1, "Nomor Aju wajib tersedia."),
  kodeDokumen: z.string().trim().min(1, "Kode Dokumen wajib tersedia."),
});

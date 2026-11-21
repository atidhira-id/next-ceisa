import { z } from "zod";

export const createDraftSchema = z.object({
  documentType: z.string().trim().min(1, "Kode Dokumen wajib tersedia."),
  entityType: z.string().trim().min(1, "Jenis Entitas wajib tersedia."),
});

export const updateDraftSectionSchema = z.object({
  data: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]),
});

export const draftSectionSchema = z.enum([
  "header",
  "entities",
  "documents",
  "packages",
  "containers",
  "transport",
  "transactions",
  "goods",
  "declarations",
]);

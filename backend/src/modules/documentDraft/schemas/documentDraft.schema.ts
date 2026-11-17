import { z } from "zod";

export const createDocumentDraftSchema = z.object({
  documentType: z.string().trim().min(1, "Kode Dokumen wajib tersedia."),
  entityType: z.string().trim().min(1, "Jenis Entitas wajib tersedia."),
});

export const updateDocumentDraftSectionSchema = z.object({
  data: z.record(z.string(), z.unknown()),
});

export const documentDraftSectionSchema = z.enum([
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

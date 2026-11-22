import { z } from "zod";

const importerSchema = z.object({
  companyId: z.string().optional(),
  identityNumberCode: z.string().optional(),
  identityNumber: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  apiCode: z.string().optional(),
  api: z.string().optional(),
  statusCode: z.string().optional(),
});

const ownerSchema = importerSchema.extend({
  affiliation: z.string().optional(),
});

const supplierSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  countryCode: z.string().optional(),
});

export const entitiesSchema = z.object({
  importer: importerSchema,
  owner: ownerSchema,
  npwp: importerSchema,
  sender: supplierSchema,
  seller: supplierSchema,
});

const importerFinalSchema = importerSchema.extend({
  identityNumberCode: z.string().min(1, "Kode jenis identitas wajib diisi."),
  identityNumber: z.string().min(1, "Nomor identitas wajib diisi."),
  name: z.string().min(1, "Nama wajib diisi."),
  address: z.string().min(1, "Alamat wajib diisi."),
  apiCode: z.string().min(1, "Kode API wajib diisi."),
  api: z.string().min(1, "API wajib diisi."),
  statusCode: z.string().min(1, "Status wajib diisi."),
});

const ownerFinalSchema = importerFinalSchema.extend({
  affiliation: z.string().min(1, "Afiliasi wajib diisi."),
});

const supplierFinalSchema = supplierSchema.extend({
  name: z.string().min(1, "Nama wajib diisi."),
  address: z.string().min(1, "Alamat wajib diisi."),
  countryCode: z.string().min(1, "Negara wajib diisi."),
});

export const entitiesFinalSchema = z.object({
  importer: importerFinalSchema,
  owner: ownerFinalSchema,
  npwp: importerFinalSchema,
  sender: supplierFinalSchema,
  seller: supplierFinalSchema,
});

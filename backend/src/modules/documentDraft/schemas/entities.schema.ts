import { z } from "zod";

const importerSchema = z.object({
  identityNumberCode: z.string().min(1),
  identityNumber: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  apiCode: z.string().min(1),
  api: z.string().min(1),
  statusCode: z.string().min(1),
});

const ownerSchema = importerSchema.extend({
  afiliation: z.string().min(1),
});

const supplierSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  countryCode: z.string().min(1),
});

export const entitiesSchema = z.object({
  importer: importerSchema,
  owner: ownerSchema,
  npwp: importerSchema,
  sender: supplierSchema,
  seller: supplierSchema,
});

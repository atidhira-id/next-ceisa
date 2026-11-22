import { z } from "zod";

export const headerSchema = z.object({
  destinationPortCode: z.string().optional(),
  customsOfficeCode: z.string().optional(),
  pibType: z.string().optional(),
  importTypeCode: z.string().optional(),
  paymentMethodCode: z.string().optional(),
});

export const headerFinalSchema = headerSchema.extend({
  destinationPortCode: z.string().min(1, "Pelabuhan tujuan wajib diisi."),
  customsOfficeCode: z.string().min(1, "Kantor pabean wajib diisi."),
  pibType: z.string().min(1, "Jenis PIB wajib diisi."),
  importTypeCode: z.string().min(1, "Jenis impor wajib diisi."),
  paymentMethodCode: z.string().min(1, "Cara pembayaran wajib diisi."),
});

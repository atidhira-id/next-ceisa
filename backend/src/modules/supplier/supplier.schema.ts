import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Nama supplier wajib diisi."),
  address: z.string().min(1, "Alamat wajib diisi."),
  countryCode: z.string().min(1, "Negara wajib diisi."),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;

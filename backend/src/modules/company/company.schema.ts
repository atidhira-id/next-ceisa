import { z } from "zod";

export const createCompanySchema = z.object({
  identityTypeCode: z.string().min(1, "Jenis identitas wajib diisi."),
  identityNumber: z.string().min(1, "Nomor identitas wajib diisi."),
  name: z.string().min(1, "Nama perusahaan wajib diisi."),
  address: z.string().min(1, "Alamat wajib diisi."),
  apiTypeCode: z.string().min(1, "Jenis API wajib diisi."),
  apiNumber: z.string().min(1, "Nomor API wajib diisi."),
  statusCode: z.string().min(1, "Status perusahaan wajib diisi."),
  countryCode: z.string().min(1, "Negara wajib diisi."),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

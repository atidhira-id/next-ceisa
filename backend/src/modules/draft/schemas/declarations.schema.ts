import { z } from "zod";

export const declarationsSchema = z.object({
  place: z.string().min(1, "Tempat wajib diisi."),
  date: z.string().min(1, "Tanggal wajib diisi."),
  name: z.string().min(1, "Nama wajib diisi."),
  position: z.string().min(1, "Jabatan wajib diisi."),
});

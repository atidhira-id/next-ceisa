import { z } from "zod";

export const transportSchema = z.object({
  customsSealTypeCode: z.string().min(1),
  customsSealNumber: z
    .string()
    .regex(/^\d{1,6}$/, "Nomor tutup PU maksimal 6 digit angka."),
  customsSealDate: z.string().min(1),

  positionNumber1: z
    .string()
    .regex(/^\d{1,4}$/, "Nomor Pos 1 maksimal 4 digit angka."),
  positionNumber2: z
    .string()
    .regex(/^\d{1,4}$/, "Nomor Pos 2 maksimal 4 digit angka."),
  positionNumber3: z
    .string()
    .regex(/^\d{1,4}$/, "Nomor Pos 3 maksimal 4 digit angka."),

  transportModeCode: z.string().min(1),
  conveyanceName: z.string().min(1),
  voyageNumber: z.string().min(1),
  flagCode: z.string().min(1),
  estimatedArrivalDate: z.string().min(1),
  loadingPortCode: z.string().min(1),
  transitPortCode: z.string().min(1),
  storagePlaceCode: z.string().min(1),
});

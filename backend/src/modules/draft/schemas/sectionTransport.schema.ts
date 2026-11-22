import { z } from "zod";

export const transportSchema = z.object({
  customsSealTypeCode: z.string().optional(),
  customsSealNumber: z.string().optional(),
  customsSealDate: z.string().optional(),

  positionNumber1: z.string().optional(),
  positionNumber2: z.string().optional(),
  positionNumber3: z.string().optional(),

  transportModeCode: z.string().optional(),
  conveyanceName: z.string().optional(),
  voyageNumber: z.string().optional(),
  flagCode: z.string().optional(),
  estimatedArrivalDate: z.string().optional(),
  loadingPortCode: z.string().optional(),
  transitPortCode: z.string().optional(),
  storagePlaceCode: z.string().optional(),
});

export const transportFinalSchema = transportSchema.extend({
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
  transitPortCode: z.string().optional(),
  storagePlaceCode: z.string().min(1),
});

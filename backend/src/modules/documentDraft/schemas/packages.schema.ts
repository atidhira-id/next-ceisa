import { z } from "zod";

export const packageItemSchema = z.object({
  series: z.number().int().positive(),
  packageCode: z.string().min(1),
  quantity: z.number().positive(),
  brand: z.string().min(1),
  sealNumber: z.string().optional(),
});

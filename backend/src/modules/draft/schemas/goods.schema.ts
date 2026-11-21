import { z } from "zod";

export const goodsDocumentSchema = z.object({
  documentNumber: z.string().min(1),
  documentSequence: z.number().int().positive(),
});

export const goodsItemSchema = z.object({
  series: z.number().int().positive(),
  hsCode: z.string().min(1),

  specifications: z.record(z.string(), z.string().nullable()).optional(),

  itemCode: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  type: z.string().optional(),
  size: z.string().optional(),
  otherSpecifications: z.string().optional(),
  condition: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  netWeight: z.number().positive().optional(),

  quantity: z.number().positive(),
  unitCode: z.string().min(1),
  packageQuantity: z.number().positive(),
  packageTypeCode: z.string().min(1),
  invoicePrice: z.number().positive(),

  valuationMethod: z.string().optional(),
  reason: z.string().optional(),
  differenceStatement: z.string().optional(),

  documents: z.array(goodsDocumentSchema).optional(),

  importDutyRateType: z.string().optional(),
  importDutyPercentage: z.number().nonnegative().optional(),
  importDutyPayment: z.string().optional(),

  vatPercentage: z.number().nonnegative().optional(),
  vatPayment: z.string().optional(),

  incomeTaxPercentage: z.number().nonnegative().optional(),
  incomeTaxPayment: z.string().optional(),

  isExcise: z.boolean().default(false),
});

export const goodsSchema = z.array(goodsItemSchema);

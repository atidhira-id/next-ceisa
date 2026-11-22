import { z } from "zod";

const costComponentFields = {
  indirectPayment: z.number().default(0),
  discount: z.number().default(0),

  commissionsAndBrokerage: z.number().default(0),
  packaging: z.number().default(0),
  packing: z.number().default(0),
  assists: z.number().default(0),
  royalties: z.number().default(0),
  proceeds: z.number().default(0),
  freight: z.number().default(0),
  loading: z.number().default(0),

  insurance: z.number().default(0),
  warranty: z.number().default(0),

  ownInterestCosts: z.number().default(0),
  postImportCosts: z.number().default(0),
  internalTaxes: z.number().default(0),
  interest: z.number().default(0),
  dividends: z.number().default(0),
};

export const costComponentsSchema = z.object({
  invoicePriceCode: z.string().min(1, "Kode CIF wajib diisi"),
  invoicePrice: z.number().min(1, "Harga invoice transaksi wajib diisi"),
  ...costComponentFields,
  insuranceCode: z.string().min(1, "Kode asuransi wajib diisi"),
});

export const transactionSchema = z.object({
  currencyCode: z.string().optional(),
  exchangeRate: z.number().optional(),
  transactionTypeCode: z.string().optional(),
  costComponents: costComponentsSchema.optional(),

  grossWeight: z.number().optional(),
  proportionalCalculation: z.string().optional(),
});

export const transactionFinalSchema = transactionSchema.extend({
  currencyCode: z.string().min(1, "Jenis valuta wajib diisi."),
  exchangeRate: z.number().positive("NDPBM wajib diisi (lebih besar dari 0)."),
  transactionTypeCode: z.string().min(1, "Jenis transaksi wajib diisi."),
  costComponents: costComponentsSchema,

  grossWeight: z.number().positive("Berat kotor harus lebih dari 0."),
  proportionalCalculation: z
    .string()
    .min(1, "Perhitungan proporsional wajib diisi."),
});

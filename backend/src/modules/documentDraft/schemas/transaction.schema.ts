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
  invoicePriceCode: z.string().min(1),
  invoicePrice: z.number(),
  ...costComponentFields,
  insuranceCode: z.string().min(1),
});

export const transactionsSchema = z.object({
  currencyCode: z.string().min(1),
  exchangeRate: z.number().positive(),
  transactionTypeCode: z.string().min(1),
  costComponents: costComponentsSchema,

  grossWeight: z.number().positive(),
  proportionalCalculation: z.string().min(1),
});

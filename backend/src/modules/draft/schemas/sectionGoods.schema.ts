import { z } from "zod";

export const goodsDocumentSchema = z.object({
  documentNumber: z.string().min(1),
  documentSequence: z.number().int().positive().optional(),
});

export const goodsItemSchema = z.object({
  series: z.number().int().positive("Seri harus lebih dari 0."),
  hsCode: z.string().min(1, "Pos Tarif/HS wajib diisi."),

  specifications: z.record(z.string(), z.string().nullable()).optional(),

  itemCode: z.string().min(1, "Kode barang wajib diisi."),
  description: z.string().min(1, "Uraian barang wajib diisi."),
  brand: z.string().min(1, "Merek wajib diisi."),
  type: z.string().min(1, "Tipe barang wajib diisi."),
  size: z.string().min(1, "Ukuran wajib diisi."),
  otherSpecifications: z.string().optional(),
  condition: z.string().min(1, "Kondisi barang wajib diisi."),
  countryOfOrigin: z.string().min(1, "Negara asal wajib diisi."),
  netWeight: z.number().positive("Berat bersih harus lebih dari 0."),

  quantity: z.number().positive("Jumlah barang harus lebih dari 0."),
  unitCode: z.string().min(1, "Satuan wajib diisi."),
  packageQuantity: z.number().nonnegative("Jumlah kemasantidak boleh negatif."),
  packageTypeCode: z.string().min(1, "Jenis kemasan wajib diisi."),
  invoicePrice: z.number().positive("Harga invoice harus lebih dari 0."),

  valuationMethod: z.string().min(1, "Metode Penentuan Nilai wajib diisi."),
  reason: z.string().optional(),
  differenceStatement: z.string().min(1, "Statement Perbedaan wajib diisi."),

  documents: z.array(goodsDocumentSchema),

  importDutyPercentage: z.number().nonnegative(),
  importDutyPayment: z.string().min(1, "Pembayaran bea masuk wajib diisi."),

  vatPercentage: z.number().nonnegative(),
  vatPayment: z.string().min(1, "Pembayaran PPN wajib diisi."),

  incomeTaxPercentage: z.number().nonnegative(),
  incomeTaxPayment: z.string().min(1, "Pembayaran PPh wajib diisi."),

  isExcise: z.boolean().default(false),
});

export const goodsSchema = z.array(goodsItemSchema);

export const goodsFinalSchema = goodsSchema.min(
  1,
  "Minimal harus ada 1 data barang.",
);

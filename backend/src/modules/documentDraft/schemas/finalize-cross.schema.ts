import { z } from "zod";

type FinalizeData = {
  documents: {
    series: number;
    documentCode: string;
    documentNumber: string;
    documentDate: string;
  }[];

  goods: {
    series: number;
    documents?: {
      documentNumber: string;
      documentSequence: number;
    }[];
  }[];
};

export function validateFinalizeCrossSections(data: FinalizeData) {
  const errors: {
    section: string;
    field: string;
    message: string;
  }[] = [];

  // 1. Pastikan terdapat dokumen Invoice.
  const hasInvoice = data.documents.some(
    (document) => document.documentCode === "380",
  );

  if (!hasInvoice) {
    errors.push({
      section: "documents",
      field: "documentCode",
      message: "Dokumen Invoice dengan kode 380 wajib tersedia.",
    });
  }

  // 2. Pastikan nomor seri barang tidak duplikat.
  const goodsSeries = new Set<number>();

  for (const item of data.goods) {
    if (goodsSeries.has(item.series)) {
      errors.push({
        section: "goods",
        field: `series.${item.series}`,
        message: `Nomor seri barang ${item.series} duplikat.`,
      });
    }

    goodsSeries.add(item.series);
  }

  // 3. Pastikan referensi dokumen barang tersedia.
  const documentNumbers = new Set(
    data.documents.map((document) => document.documentNumber),
  );

  for (const item of data.goods) {
    for (const document of item.documents ?? []) {
      if (!documentNumbers.has(document.documentNumber)) {
        errors.push({
          section: "goods",
          field: `documents.${item.series}`,
          message: `Dokumen ${document.documentNumber} pada barang seri ${item.series} tidak ditemukan.`,
        });
      }
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

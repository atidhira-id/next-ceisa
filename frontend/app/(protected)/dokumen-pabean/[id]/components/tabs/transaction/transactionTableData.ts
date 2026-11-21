import { CostComponents } from "@/app/types/draft";

export const inputsOne: { label: string; field: keyof CostComponents }[] = [
  { label: "1. Harga Invoice", field: "invoicePrice" },
  {
    label:
      "2. Pembayaran tidak langsung (contoh pengurangan piutang pembeli/importir, nota kredit, dll.)",
    field: "indirectPayment",
  },
];

export const inputsTwo: { label: string; field: keyof CostComponents }[] = [
  {
    label: "1. Komisi penjualan dan jasa perantara",
    field: "commissionsAndBrokerage",
  },
  {
    label: "2. Biaya pengemasan",
    field: "packaging",
  },
  {
    label: "3. Biaya pengepakan",
    field: "packing",
  },
  {
    label: "4. Nilai bantuan (assist)",
    field: "assists",
  },
  {
    label: "5. Royalti dan biaya lisensi",
    field: "royalties",
  },
  {
    label: "6. Proceeds",
    field: "proceeds",
  },
  {
    label: "7. Biaya transportasi / Freight",
    field: "freight",
  },
  {
    label:
      "8. Biaya pemuatan, pembongkaran, dan penanganan yang belum termasuk ke dalam biaya transportasi",
    field: "loading",
  },
  {
    label: "9. Asuransi / Insurance",
    field: "insurance",
  },
  {
    label: "10. Garansi",
    field: "warranty",
  },
];

export const inputsThree: { label: string; field: keyof CostComponents }[] = [
  {
    label:
      "1. Biaya yang terjadi dari kegiatan yang dilakukan oleh Pembeli untuk kepentingan sendiri",
    field: "ownInterestCosts",
  },
  {
    label: "2. Biaya yang terjadi setelah pengimporan barang",
    field: "postImportCosts",
  },
  {
    label: "3. Biaya pajak internal di negara pengekspor",
    field: "internalTaxes",
  },
  {
    label: "4. Bunga",
    field: "interest",
  },
  {
    label: "5. Deviden",
    field: "dividends",
  },
];

export function getInitialCostComponents(insuranceCode: string) {
  return {
    invoicePriceCode: "",
    invoicePrice: 0,
    indirectPayment: 0,
    discount: 0,

    commissionsAndBrokerage: 0,
    packaging: 0,
    packing: 0,
    assists: 0,
    royalties: 0,
    proceeds: 0,
    freight: 0,
    loading: 0,
    insuranceCode: insuranceCode,
    insurance: 0,
    warranty: 0,

    ownInterestCosts: 0,
    postImportCosts: 0,
    internalTaxes: 0,
    interest: 0,
    dividends: 0,
  };
}

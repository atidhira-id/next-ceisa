import { KomponenBiaya } from "@/app/providers/types";

export const inputsOne: { label: string; field: keyof KomponenBiaya }[] = [
  { label: "1. Harga Invoice", field: "hargaInvoice" },
  {
    label:
      "2. Pembayaran tidak langsung (contoh pengurangan piutang pembeli/importir, nota kredit, dll.)",
    field: "pembayaranTidakLangsung",
  },
];

export const inputsTwo: { label: string; field: keyof KomponenBiaya }[] = [
  {
    label: "1. Komisi penjualan dan jasa perantara",
    field: "komisiDanJasaPerantara",
  },
  {
    label: "2. Biaya pengemasan",
    field: "pengemasan",
  },
  {
    label: "3. Biaya pengepakan",
    field: "pengepakan",
  },
  {
    label: "4. Nilai bantuan (assist)",
    field: "assist",
  },
  {
    label: "5. Royalti dan biaya lisensi",
    field: "royalti",
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
    field: "pemuatan",
  },
  {
    label: "9. Asuransi / Insurance",
    field: "asuransi",
  },
  {
    label: "10. Garansi",
    field: "garansi",
  },
];

export const inputsThree: { label: string; field: keyof KomponenBiaya }[] = [
  {
    label:
      "1. Biaya yang terjadi dari kegiatan yang dilakukan oleh Pembeli untuk kepentingan sendiri",
    field: "biayaKepentinganSendiri",
  },
  {
    label: "2. Biaya yang terjadi setelah pengimporan barang",
    field: "biayaSetelahImport",
  },
  {
    label: "3. Biaya pajak internal di negara pengekspor",
    field: "pajakInternal",
  },
  {
    label: "4. Bunga",
    field: "bunga",
  },
  {
    label: "5. Deviden",
    field: "deviden",
  },
];

export const initialKomponenBiaya: KomponenBiaya = {
  kodeHargaInvoice: "",
  hargaInvoice: 0,
  pembayaranTidakLangsung: 0,
  diskon: 0,

  komisiDanJasaPerantara: 0,
  pengemasan: 0,
  pengepakan: 0,
  assist: 0,
  royalti: 0,
  proceeds: 0,
  freight: 0,
  pemuatan: 0,
  asuransi: 0,
  garansi: 0,

  biayaKepentinganSendiri: 0,
  biayaSetelahImport: 0,
  pajakInternal: 0,
  bunga: 0,
  deviden: 0,
};

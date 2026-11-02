import type {
  BarangItemData,
  KomponenBiaya,
  TransaksiData,
} from "@/app/providers/types";
import type { OptionType } from "@/app/providers/types";

export function getLabel(options: OptionType[], code: string) {
  const option = options.find((item) => item.value === code);

  return option?.label;
}

export function getBiayaPenambah(transaksiData: TransaksiData): number {
  const biayaTambahanKeys: Array<keyof KomponenBiaya> = [
    "komisiDanJasaPerantara",
    "pengemasan",
    "pengepakan",
    "assist",
    "royalti",
    "proceeds",
    "freight",
    "pemuatan",
    "asuransi",
    "garansi",
  ];
  const biayaTambahan = biayaTambahanKeys.reduce(
    (total, key) => total + Number(transaksiData.komponenBiaya?.[key] || 0),
    0,
  );

  return biayaTambahan;
}

export function getBiayaPengurang(transaksiData: TransaksiData): number {
  const biayaPengurangKeys: Array<keyof KomponenBiaya> = [
    "biayaKepentinganSendiri",
    "biayaSetelahImport",
    "pajakInternal",
    "bunga",
    "deviden",
  ];
  const biayaTambahan = biayaPengurangKeys.reduce(
    (total, key) => total + Number(transaksiData.komponenBiaya?.[key] || 0),
    0,
  );

  return biayaTambahan;
}

export function getBeratBersih(listBarangData: BarangItemData[]): number {
  return listBarangData.reduce(
    (total, barang) => total + (barang.beratBersih ?? 0),
    0,
  );
}

export function getPabeanRupiah(transaksiData: TransaksiData): number {
  return (
    (transaksiData.ndpbm ?? 0) *
    (transaksiData.komponenBiaya?.hargaInvoice ?? 0)
  );
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPungutan(
  type: "bm" | "ppn" | "pph",
  transaksiData: TransaksiData,
  listBarang: BarangItemData[],
): number {
  const pabeanRupiah = getPabeanRupiah(transaksiData);
  const pungutan = listBarang.reduce((acc, item) => {
    const percentage = item[`${type}Percentage`];
    return acc + (pabeanRupiah * (percentage ?? 0)) / 100;
  }, 0);
  return Math.ceil(pungutan / 1000) * 1000;
}

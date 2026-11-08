import { TipeBarangHsData } from "@/app/constants/db_hs";
import type {
  BarangItemData,
  KomponenBiaya,
  PungutanType,
  TransaksiData,
} from "@/app/types";
import type { OptionType } from "@/app/types";

export function formatDateIndonesian(date: string): string {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getLabel(options: OptionType[], code: string) {
  const option = options.find((item) => item.value === code);

  return option?.label;
}

export function getHsCode(tipeBarang: string): string {
  const hs = TipeBarangHsData[tipeBarang];

  return hs ?? "";
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

export function getCif(
  barang: BarangItemData,
  transaksiData: TransaksiData,
): number {
  return (
    (barang.hargaInvoice ?? 0) +
    (transaksiData.komponenBiaya?.asuransi ?? 0) +
    (transaksiData.komponenBiaya?.freight ?? 0)
  );
}

export function getHargaSatuan(barang: BarangItemData): number {
  const unitPrice = (barang.hargaInvoice ?? 0) / (barang.jumlah ?? 1);
  return Math.ceil(unitPrice * 100) / 100;
}

export function getBeratBersih(listBarangData: BarangItemData[]): number {
  return listBarangData.reduce(
    (total, barang) => total + (barang.beratBersih ?? 0),
    0,
  );
}

export function getPabeanRupiah(
  transaksiData: TransaksiData,
  barang?: BarangItemData,
): number {
  if (barang) {
    return (transaksiData.ndpbm ?? 0) * getCif(barang, transaksiData);
  }

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

export function getPungutanBarang(
  transaksiData: TransaksiData,
  barang: BarangItemData,
): PungutanType {
  const hargaRupiah = getPabeanRupiah(transaksiData, barang);
  const bm = (hargaRupiah * (barang.bmPercentage ?? 0)) / 100;

  const ppn = ((hargaRupiah + bm) * (barang.ppnPercentage ?? 0)) / 100;
  const pph = ((hargaRupiah + bm) * (barang.pphPercentage ?? 0)) / 100;
  const total = bm + ppn + pph;

  return { bm, ppn, pph, total };
}

export function getPungutan(
  transaksiData: TransaksiData,
  listBarang: BarangItemData[],
): PungutanType {
  const pungutan: PungutanType = { bm: 0, ppn: 0, pph: 0, total: 0 };

  listBarang.map((barang) => {
    const pungutanBarang = getPungutanBarang(transaksiData, barang);
    console.log(pungutanBarang);
    pungutan.bm += pungutanBarang.bm;
    pungutan.ppn += pungutanBarang.ppn;
    pungutan.pph += pungutanBarang.pph;
    pungutan.total += pungutanBarang.total;
  });
  return pungutan;
}

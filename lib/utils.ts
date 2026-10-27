import type { KomponenBiaya, TransaksiData } from "@/app/providers/types";
import type { OptionType } from "./options";

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

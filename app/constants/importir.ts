import type { EntitasImportirData } from "@/app/types";
import { kodeApiNibOptions, kodeStatusOptions } from "./options/entitasOptions";

export const initialImportir: EntitasImportirData = {
  kodeNomorIdentitas: "6",
  nomorIdentitas: "0010606028007000",
  nama: "PT UNITED TRACTORS PANDU ENGINEERING",
  alamat:
    "JL. JABABEKA XI KAWASAN INDUSTRI JABABEKA, BLOK H, 30-40, HAJARMEKAR, CIKARANG UTARA, KAB. BEKASI, JAWA BARAT, 17530",
  kodeApi: kodeApiNibOptions[1].value,
  api: "9120105931425",
  kodeStatus: kodeStatusOptions[0].value,
};

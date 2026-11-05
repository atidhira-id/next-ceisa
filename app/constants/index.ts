import type { OptionType, EntitasImportirData } from "@/app/types";
import {
  kodeApiNibOptions,
  kodeStatusOptions,
} from "./options/entitas-options";

export const entitasOptions: OptionType[] = [
  { value: "IMPORTIR", label: "IMPORTIR" },
  { value: "EKSPORTIR", label: "EKSPORTIR" },
];

export const jenisDokumenOptions: OptionType[] = [
  { value: "20", label: "BC 2.0" },
  { value: "24", label: "BC 24" },
];

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

import type { OptionType, EntitasImportirData } from "@/app/providers/types";
import { kodeApiNibOptions, kodeStatusOptions } from "./entitas-options";

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
  nomorNitku: "0010606028007000000000",
  nama: "PT United Tractors Pandu Engineering",
  alamat: "KAWASAN INDUSTRI JABABEKA\nJL. JABABEKA XI BLOK H30-40\n000/000",
  kodeApi: kodeApiNibOptions[1].value,
  api: "9120105931425",
  kodeStatus: kodeStatusOptions[0].value,
};

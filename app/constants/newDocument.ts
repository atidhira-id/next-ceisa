import { FormInputs } from "@/app/types";
import { initialImportir } from "@/app/constants/importir";

export function generateNewDocument(
  nomorAju: string,
  entitas: string,
  kodeDokumen: string,
): FormInputs {
  return {
    nomorAju: nomorAju,
    jenisEntitas: entitas,
    kodeDokumen: kodeDokumen,
    header: {},
    entitasImportir: initialImportir,
    entitasPemilikBarang: {},
    entitasNpwp: {},
    entitasPengirim: {},
    entitasPenjual: {},
    listDokumen: [],
    pengangkut: {},
    listKemasan: [],
    listKontainer: [],
    transaksi: {},
    listBarang: [],
    pernyataan: {},
  };
}

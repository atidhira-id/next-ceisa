import { FormInputs } from "@/app/types";
import { initialImportir } from "@/app/constants/importir";

export function generateNewDocument(
  nomorAju: string,
  entitas: string,
  kodeDokumen: string,
): FormInputs {
  const createdAt = new Date();
  const tanggal = [
    createdAt.getFullYear(),
    String(createdAt.getMonth() + 1).padStart(2, "0"),
    String(createdAt.getDate()).padStart(2, "0"),
  ].join("-");

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
    pernyataan: {
      tempat: "JAKARTA",
      tanggal,
      nama: "DAVID",
      jabatan: "DIREKTUR",
    },
  };
}

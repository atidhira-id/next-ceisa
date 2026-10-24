import ExcelJS from "exceljs";
import path from "node:path";

import type { FormInputs, KomponenBiaya } from "@/app/providers/types";

// Helper function to export document data to an Excel file using a predefined template.
export async function exportDocumentToExcel(documentData: FormInputs) {
  // Load the Excel template from the templates directory
  const templatePath = path.join(
    process.cwd(),
    "templates",
    "excel-ceisa.xlsx",
  );

  // Create a new workbook and read the template file
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  // HEADER SHEET
  const headerSheet = workbook.getWorksheet("HEADER");
  if (!headerSheet) {
    throw new Error("Sheet HEADER tidak ditemukan di template Excel.");
  }
  setHeaderSheetData(headerSheet, documentData);

  // ENTITAS SHEET
  const entitasSheet = workbook.getWorksheet("ENTITAS");
  if (!entitasSheet) {
    throw new Error("Sheet ENTITAS tidak ditemukan di template Excel.");
  }
  setEntitasSheetData(entitasSheet, documentData);

  // DOKUMEN SHEET
  const dokumenSheet = workbook.getWorksheet("DOKUMEN");
  if (!dokumenSheet) {
    throw new Error("Sheet DOKUMEN tidak ditemukan di template Excel.");
  }
  setDokumenSheetData(dokumenSheet, documentData);

  // PENGANGKUT SHEET
  const pengangkutSheet = workbook.getWorksheet("PENGANGKUT");
  if (!pengangkutSheet) {
    throw new Error("Sheet PENGANGKUT tidak ditemukan di template Excel.");
  }
  setPengangkutSheetData(pengangkutSheet, documentData);

  // KEMASAN SHEET
  const kemasanSheet = workbook.getWorksheet("KEMASAN");
  if (!kemasanSheet) {
    throw new Error("Sheet KEMASAN tidak ditemukan di template Excel.");
  }
  setKemasanSheetData(kemasanSheet, documentData);

  // KONTAINER SHEET
  const kontainerSheet = workbook.getWorksheet("KONTAINER");
  if (!kontainerSheet) {
    throw new Error("Sheet KONTAINER tidak ditemukan di template Excel.");
  }
  setKontainerSheetData(kontainerSheet, documentData);

  return workbook.xlsx.writeBuffer();
}

// Helper function to set cell value only if it's not undefined, null, or empty string
function setCellValue(
  sheet: ExcelJS.Worksheet,
  cellAddress: string,
  value: unknown,
) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  sheet.getCell(cellAddress).value = normalizeExcelValue(value);
}

// Helper function to normalize the value for Excel cell
function normalizeExcelValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  return String(value);
}

function setHeaderSheetData(headerSheet: ExcelJS.Worksheet, data: FormInputs) {
  const row = 2;
  const headerData = data.header;
  const pengengkutData = data.pengangkut;
  const transaksiData = data.transaksi;

  setCellValue(headerSheet, `A${row}`, String(data.nomorAju));
  setCellValue(headerSheet, `B${row}`, data.kodeDokumen);
  setCellValue(headerSheet, `C${row}`, headerData.kodeKantorPabean);
  setCellValue(headerSheet, `H${row}`, headerData.kodeJenisImport);
  setCellValue(headerSheet, `L${row}`, headerData.kodeJenisPib);
  setCellValue(headerSheet, `Q${row}`, headerData.kodeCaraPembayaran);
  setCellValue(headerSheet, `AI${row}`, pengengkutData.kodeNomorTutupPu);
  setCellValue(headerSheet, `AJ${row}`, pengengkutData.nomorTutupPu);
  setCellValue(headerSheet, `AK${row}`, pengengkutData.tanggalTutupPu);
  setCellValue(headerSheet, `AL${row}`, pengengkutData.nomorPos1);
  setCellValue(
    headerSheet,
    `AM${row}`,
    `${pengengkutData.nomorPos2}${pengengkutData.nomorPos3}`,
  );
  setCellValue(headerSheet, `AO${row}`, pengengkutData.kodePelabuhanMuat);
  setCellValue(headerSheet, `AQ${row}`, pengengkutData.kodePelabuhanTransit);
  setCellValue(headerSheet, `AR${row}`, headerData.kodePelabuhanTujuan);
  setCellValue(headerSheet, `AT${row}`, pengengkutData.kodeTempatPenimbunan);
  setCellValue(headerSheet, `AY${row}`, pengengkutData.perkiraanTanggalTiba);
  setCellValue(headerSheet, `CI${row}`, transaksiData.kodeJenisValuta);
  setCellValue(headerSheet, `BW${row}`, transaksiData.ndpbm);
  setCellValue(headerSheet, `CN${row}`, transaksiData.kodeJenisTransaksi);

  setCellValue(
    headerSheet,
    `BQ${row}`,
    transaksiData.komponenBiaya?.hargaInvoice,
  );
  setCellValue(
    headerSheet,
    `CJ${row}`,
    transaksiData.komponenBiaya?.kodeHargaInvoice,
  );

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
  setCellValue(headerSheet, `BR${row}`, biayaTambahan);

  setCellValue(headerSheet, `BP${row}`, transaksiData.komponenBiaya?.freight);
  setCellValue(
    headerSheet,
    `BJ${row}`,
    transaksiData.komponenBiaya?.kodeAsuransi,
  );
  setCellValue(headerSheet, `BK${row}`, transaksiData.komponenBiaya?.asuransi);

  setCellValue(headerSheet, `CB${row}`, transaksiData.beratKotor);
  setCellValue(headerSheet, `CC${row}`, transaksiData.beratBersih);
  setCellValue(headerSheet, `DC${row}`, "T");
}

function setEntitasSheetData(
  entitasSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  // ROW 2 ENTITAS IMPORTIR
  const entitasImportir = data.entitasImportir;
  setCellValue(entitasSheet, `A${2}`, String(data.nomorAju));
  setCellValue(entitasSheet, `B${2}`, 1);
  setCellValue(entitasSheet, `C${2}`, 1);
  setCellValue(entitasSheet, `D${2}`, entitasImportir.kodeNomorIdentitas);
  setCellValue(entitasSheet, `E${2}`, entitasImportir.nomorNitku);
  setCellValue(entitasSheet, `F${2}`, entitasImportir.nama);
  setCellValue(entitasSheet, `G${2}`, entitasImportir.alamat);
  setCellValue(entitasSheet, `H${2}`, entitasImportir.api);
  setCellValue(entitasSheet, `I${2}`, entitasImportir.kodeApi);
  setCellValue(entitasSheet, `J${2}`, entitasImportir.kodeStatus);
  setCellValue(entitasSheet, `M${2}`, "ID");

  // ROW 3 ENTITAS PEMILIK BARANG
  const entitasPemilikBarang = data.entitasPemilikBarang;
  setCellValue(entitasSheet, `A${3}`, String(data.nomorAju));
  setCellValue(entitasSheet, `B${3}`, 7);
  setCellValue(entitasSheet, `C${3}`, 7);
  setCellValue(entitasSheet, `D${3}`, entitasPemilikBarang.kodeNomorIdentitas);
  setCellValue(entitasSheet, `E${3}`, entitasPemilikBarang.nomorNitku);
  setCellValue(entitasSheet, `F${3}`, entitasPemilikBarang.nama);
  setCellValue(entitasSheet, `G${3}`, entitasPemilikBarang.alamat);
  setCellValue(entitasSheet, `M${3}`, "ID");
  setCellValue(entitasSheet, `P${3}`, entitasPemilikBarang.afiliasi);

  // ROW 4 ENTITAS PENGIRIM
  const entitasPengirim = data.entitasPengirim;
  setCellValue(entitasSheet, `A${4}`, String(data.nomorAju));
  setCellValue(entitasSheet, `B${4}`, 9);
  setCellValue(entitasSheet, `C${4}`, 9);
  setCellValue(entitasSheet, `F${4}`, entitasPengirim.nama);
  setCellValue(entitasSheet, `G${4}`, entitasPengirim.alamat);
  setCellValue(entitasSheet, `M${4}`, entitasPengirim.negara);

  // ROW 5 ENTITAS PENJUAL
  const entitasPenjual = data.entitasPenjual;
  setCellValue(entitasSheet, `A${5}`, String(data.nomorAju));
  setCellValue(entitasSheet, `B${5}`, 10);
  setCellValue(entitasSheet, `C${5}`, 10);
  setCellValue(entitasSheet, `F${5}`, entitasPenjual.nama);
  setCellValue(entitasSheet, `G${5}`, entitasPenjual.alamat);
  setCellValue(entitasSheet, `M${5}`, entitasPenjual.negara);

  // ROW 6 ENTITAS NPWP
  const entitasNpwp = data.entitasNpwp;
  setCellValue(entitasSheet, `A${6}`, String(data.nomorAju));
  setCellValue(entitasSheet, `B${6}`, 11);
  setCellValue(entitasSheet, `C${6}`, 11);
  setCellValue(entitasSheet, `D${6}`, entitasNpwp.kodeNomorIdentitas);
  setCellValue(entitasSheet, `E${6}`, entitasNpwp.nomorNitku);
  setCellValue(entitasSheet, `F${6}`, entitasNpwp.nama);
  setCellValue(entitasSheet, `G${6}`, entitasNpwp.alamat);
  setCellValue(entitasSheet, `M${6}`, "ID");
}

function setDokumenSheetData(
  dokumenSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const dokumenDataArr = data.listDokumen;

  for (let i = 0; i < dokumenDataArr.length; i++) {
    const dokumenData = dokumenDataArr[i];
    const row = i + 2;

    // A - NOMOR AJU
    dokumenSheet.getCell(`A${row}`).value = String(data.nomorAju);

    // B - SERI
    dokumenSheet.getCell(`B${row}`).value = dokumenData.seri;

    // C - KODE DOKUMEN
    setCellValue(dokumenSheet, `C${row}`, dokumenData.kodeDokumen);

    // D - NOMOR DOKUMEN
    setCellValue(dokumenSheet, `D${row}`, dokumenData.nomorDokumen);

    // E - TANGGAL DOKUMEN
    setCellValue(dokumenSheet, `E${row}`, dokumenData.tanggalDokumen);

    // F - KODE FASILITAS
    setCellValue(dokumenSheet, `F${row}`, dokumenData.kodeFasilitas);

    // G - KODE IJIN
    setCellValue(dokumenSheet, `G${row}`, dokumenData.kodeIjin);
  }
}

function setPengangkutSheetData(
  pengangkutSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const row = 2;
  const pengangkutData = data.pengangkut;
  // A - NOMOR AJU
  pengangkutSheet.getCell(`A${row}`).value = String(data.nomorAju);

  // B - SERI
  pengangkutSheet.getCell(`B${row}`).value = 1;

  // C - KODE CARA ANGKUT
  setCellValue(pengangkutSheet, `C${row}`, pengangkutData.kodeCaraPengangkutan);

  // D - NAMA PENGANGKUT
  setCellValue(
    pengangkutSheet,
    `D${row}`,
    pengangkutData.namaSaranaPengangkutan,
  );

  // E - NOMOR PENGANGKUT
  setCellValue(pengangkutSheet, `E${row}`, pengangkutData.nomorVoy);

  // F - KODE BENDERA
  setCellValue(pengangkutSheet, `F${row}`, pengangkutData.kodeBendera);
}

function setKemasanSheetData(
  kemasanSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const kemasanDataArr = data.listKemasan;

  for (let i = 0; i < kemasanDataArr.length; i++) {
    const kemasanData = kemasanDataArr[i];
    const row = i + 2;

    // A - NOMOR AJU
    kemasanSheet.getCell(`A${row}`).value = String(data.nomorAju);

    // B - SERI
    kemasanSheet.getCell(`B${row}`).value = kemasanData.seri;

    // C - KODE KEMASAN
    setCellValue(kemasanSheet, `C${row}`, kemasanData.kodeKemasan);

    // D - JUMLAH KEMASAN
    setCellValue(kemasanSheet, `D${row}`, kemasanData.jumlahKemasan);

    // E - MEREK
    setCellValue(kemasanSheet, `E${row}`, kemasanData.merek);

    // F - NOMOR SEGEL
    setCellValue(kemasanSheet, `F${row}`, kemasanData.nomorSegel);
  }
}

function setKontainerSheetData(
  kontainerSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const kontainerDataArr = data.listKontainer;

  for (let i = 0; i < kontainerDataArr.length; i++) {
    const kontainerData = kontainerDataArr[i];
    const row = i + 2;

    // A - NOMOR AJU
    kontainerSheet.getCell(`A${row}`).value = String(data.nomorAju);

    // B - SERI
    kontainerSheet.getCell(`B${row}`).value = kontainerData.seri;

    // C - NOMOR KONTINER
    setCellValue(kontainerSheet, `C${row}`, kontainerData.nomorKontiner);

    // D - KODE UKURAN KONTAINER
    setCellValue(kontainerSheet, `D${row}`, kontainerData.kodeUkuranKontainer);

    // E - KODE JENIS KONTAINER
    setCellValue(kontainerSheet, `E${row}`, kontainerData.kodeJenisKontainer);

    // F - KODE TIPE KONTAINER
    setCellValue(kontainerSheet, `F${row}`, kontainerData.kodeTipeKontainer);

    // G - NOMOR SEGEL
    setCellValue(kontainerSheet, `G${row}`, kontainerData.nomorSegel);
  }
}

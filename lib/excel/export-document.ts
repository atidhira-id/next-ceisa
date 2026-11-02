import ExcelJS from "exceljs";
import path from "node:path";

import type { FormInputs, PungutanType } from "@/app/providers/types";
import {
  getBeratBersih,
  getBiayaPenambah,
  getBiayaPengurang,
  getPungutan,
} from "../utils";

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

  // KOMPONEN BIAYA SHEET
  const komponenBiayaSheet = workbook.getWorksheet("KOMPONENBIAYA");
  if (!komponenBiayaSheet) {
    throw new Error("Sheet KOMPONENBIAYA tidak ditemukan di template Excel.");
  }
  setKomponenBiayaSheetData(komponenBiayaSheet, documentData);

  // BARANG SHEET
  const listBarangSheet = workbook.getWorksheet("BARANG");
  if (!listBarangSheet) {
    throw new Error("Sheet BARANG tidak ditemukan di template Excel.");
  }
  setBarangSheetData(listBarangSheet, documentData);

  // TARIF SHEET
  const tarifSheet = workbook.getWorksheet("BARANGTARIF");
  if (!tarifSheet) {
    throw new Error("Sheet BARANGTARIF tidak ditemukan di template Excel.");
  }
  setBarangTarifSheetData(tarifSheet, documentData);

  // BARANG DOKUMEN SHEET
  const barangDokumenSheet = workbook.getWorksheet("BARANGDOKUMEN");
  if (!barangDokumenSheet) {
    throw new Error("Sheet BARANGDOKUMEN tidak ditemukan di template Excel.");
  }
  setBarangDokumenSheetData(barangDokumenSheet, documentData);

  // PUNGUTAN SHEET
  const pungutanSheet = workbook.getWorksheet("PUNGUTAN");
  if (!pungutanSheet) {
    throw new Error("Sheet PUNGUTAN tidak ditemukan di template Excel.");
  }
  setPungutanDokumenSheetData(pungutanSheet, documentData);

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

  // setCellValue(headerSheet, `BD${row}`, JUMLAH TANDA PENGAMAN);
  setCellValue(
    headerSheet,
    `BJ${row}`,
    transaksiData.komponenBiaya?.kodeAsuransi,
  );
  setCellValue(headerSheet, `BK${row}`, transaksiData.komponenBiaya?.asuransi);
  // setCellValue(headerSheet, `BL${row}`, NILAI BARANG);
  // setCellValue(headerSheet, `BM${row}`, NILAI INCOTERM);
  // setCellValue(headerSheet, `BN${row}`, NILAI MAKLON);
  // setCellValue(headerSheet, `BO${row}`, ASURANSI);
  setCellValue(headerSheet, `BP${row}`, transaksiData.komponenBiaya?.freight);
  setCellValue(
    headerSheet,
    `BQ${row}`,
    transaksiData.komponenBiaya?.hargaInvoice,
  );
  setCellValue(headerSheet, `BR${row}`, getBiayaPenambah(transaksiData));
  setCellValue(headerSheet, `BS${row}`, getBiayaPengurang(transaksiData));
  // setCellValue(headerSheet, `BT${row}`, VD);
  // setCellValue(headerSheet, `BU${row}`, CIF);
  // setCellValue(headerSheet, `BV${row}`, HARGA_PENYERAHAN);
  setCellValue(headerSheet, `BW${row}`, transaksiData.ndpbm);
  // setCellValue(headerSheet, `BX${row}`, TOTAL DANA SAWIT);
  // setCellValue(headerSheet, `BY${row}`, DASAR PENGENAAN PAJAK);
  // setCellValue(headerSheet, `BZ${row}`, NILAI JASA);
  // setCellValue(headerSheet, `CA${row}`, UANG MUKA);
  setCellValue(headerSheet, `CB${row}`, transaksiData.beratKotor);
  setCellValue(headerSheet, `CC${row}`, getBeratBersih(data.listBarang));
  // setCellValue(headerSheet, `CD${row}`, VOLUME);
  setCellValue(headerSheet, `CE${row}`, data.pernyataan.tempat);
  setCellValue(headerSheet, `CF${row}`, data.pernyataan.tanggal);
  setCellValue(headerSheet, `CG${row}`, data.pernyataan.nama);
  setCellValue(headerSheet, `CH${row}`, data.pernyataan.jabatan);
  setCellValue(headerSheet, `CI${row}`, transaksiData.kodeJenisValuta);
  setCellValue(
    headerSheet,
    `CJ${row}`,
    transaksiData.komponenBiaya?.kodeHargaInvoice,
  );
  setCellValue(headerSheet, `CN${row}`, transaksiData.kodeJenisTransaksi);
  // setCellValue(headerSheet, `CP${row}`, NOMOR DAFTAR);
  // setCellValue(headerSheet, `CQ${row}`, TANGGAL DAFTAR);
  // setCellValue(headerSheet, `CT${row}`, PPN PAJAK);
  // setCellValue(headerSheet, `CU${row}`, PPNBM PAJAK);
  // setCellValue(headerSheet, `CV${row}`, TARIF PPN PAJAK);
  // setCellValue(headerSheet, `CW${row}`, TARIF PPNBM PAJAK);

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
  setCellValue(
    entitasSheet,
    `E${2}`,
    entitasImportir.nomorIdentitas + "0".repeat(6),
  );
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
  setCellValue(
    entitasSheet,
    `E${3}`,
    entitasPemilikBarang.nomorIdentitas + "0".repeat(6),
  );
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
  setCellValue(
    entitasSheet,
    `E${6}`,
    entitasNpwp.nomorIdentitas + "0".repeat(6),
  );
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

function setKomponenBiayaSheetData(
  komponenBiayaSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const komponenBiaya = data.transaksi.komponenBiaya;

  // ROW 2
  setCellValue(komponenBiayaSheet, "A2", data.nomorAju);
  setCellValue(komponenBiayaSheet, "B2", "1");
  setCellValue(komponenBiayaSheet, "C2", komponenBiaya?.hargaInvoice ?? 0);
  setCellValue(
    komponenBiayaSheet,
    "D2",
    komponenBiaya?.pembayaranTidakLangsung ?? 0,
  );
  setCellValue(komponenBiayaSheet, "E2", komponenBiaya?.diskon ?? 0);
  setCellValue(
    komponenBiayaSheet,
    "F2",
    komponenBiaya?.komisiDanJasaPerantara ?? 0,
  );
  setCellValue(komponenBiayaSheet, "G2", komponenBiaya?.pengemasan ?? 0);
  setCellValue(komponenBiayaSheet, "H2", komponenBiaya?.pengepakan ?? 0);
  setCellValue(komponenBiayaSheet, "I2", komponenBiaya?.assist ?? 0);
  setCellValue(komponenBiayaSheet, "J2", komponenBiaya?.royalti ?? 0);
  setCellValue(komponenBiayaSheet, "K2", komponenBiaya?.proceeds ?? 0);
  setCellValue(komponenBiayaSheet, "L2", komponenBiaya?.freight ?? 0);
  setCellValue(komponenBiayaSheet, "M2", komponenBiaya?.pemuatan ?? 0);
  setCellValue(komponenBiayaSheet, "N2", komponenBiaya?.asuransi ?? 0);
  setCellValue(komponenBiayaSheet, "O2", komponenBiaya?.garansi ?? 0);
  setCellValue(
    komponenBiayaSheet,
    "P2",
    komponenBiaya?.biayaKepentinganSendiri ?? 0,
  );
  setCellValue(
    komponenBiayaSheet,
    "Q2",
    komponenBiaya?.biayaSetelahImport ?? 0,
  );
  setCellValue(komponenBiayaSheet, "R2", komponenBiaya?.pajakInternal ?? 0);
  setCellValue(komponenBiayaSheet, "S2", komponenBiaya?.bunga ?? 0);
  setCellValue(komponenBiayaSheet, "T2", komponenBiaya?.deviden ?? 0);

  // Row 3
  setCellValue(komponenBiayaSheet, "A3", data.nomorAju);
  setCellValue(komponenBiayaSheet, "B3", "2");
  setCellValue(komponenBiayaSheet, "C3", 0);
  setCellValue(komponenBiayaSheet, "D3", 0);
  setCellValue(komponenBiayaSheet, "E3", 0);
  setCellValue(komponenBiayaSheet, "F3", 0);
  setCellValue(komponenBiayaSheet, "G3", 0);
  setCellValue(komponenBiayaSheet, "H3", 0);
  setCellValue(komponenBiayaSheet, "I3", 0);
  setCellValue(komponenBiayaSheet, "J3", 0);
  setCellValue(komponenBiayaSheet, "K3", 0);
  setCellValue(komponenBiayaSheet, "L3", 0);
  setCellValue(komponenBiayaSheet, "M3", 0);
  setCellValue(komponenBiayaSheet, "N3", 0);
  setCellValue(komponenBiayaSheet, "O3", 0);
  setCellValue(komponenBiayaSheet, "P3", 0);
  setCellValue(komponenBiayaSheet, "Q3", 0);
  setCellValue(komponenBiayaSheet, "R3", 0);
  setCellValue(komponenBiayaSheet, "S3", 0);
  setCellValue(komponenBiayaSheet, "T3", 0);
}

function setBarangSheetData(barangSheet: ExcelJS.Worksheet, data: FormInputs) {
  const listBarang = data.listBarang;
  const start = 2;

  listBarang.map((barang, index) => {
    const row = index + start;
    setCellValue(barangSheet, `A${row}`, data.nomorAju);
    setCellValue(barangSheet, `B${row}`, barang.seri);
    setCellValue(barangSheet, `C${row}`, barang.hs);
    setCellValue(barangSheet, `D${row}`, barang.kodeBarang);
    setCellValue(barangSheet, `E${row}`, barang.uraianJenisBarang);
    setCellValue(barangSheet, `F${row}`, barang.merek);
    setCellValue(barangSheet, `G${row}`, barang.tipe);
    setCellValue(barangSheet, `H${row}`, barang.ukuran);
    setCellValue(barangSheet, `I${row}`, barang.spesifikasiLain);
    setCellValue(barangSheet, `J${row}`, barang.kodeSatuan);
    setCellValue(barangSheet, `K${row}`, barang.jumlah);
    setCellValue(barangSheet, `L${row}`, barang.kodeJenisKemasan);
    setCellValue(barangSheet, `M${row}`, barang.kemasan);
    // setCellValue(barangSheet, `N${row}`, barang);
    // setCellValue(barangSheet, `O${row}`, barang);
    // setCellValue(barangSheet, `P${row}`, barang);
    // setCellValue(barangSheet, `Q${row}`, barang);
    // setCellValue(barangSheet, `R${row}`, barang);
    // setCellValue(barangSheet, `S${row}`, barang);
    setCellValue(barangSheet, `T${row}`, barang.beratBersih);
    // setCellValue(barangSheet, `U${row}`, barang);
    // setCellValue(barangSheet, `V${row}`, barang);
    // setCellValue(barangSheet, `W${row}`, barang);
    // setCellValue(barangSheet, `X${row}`, barang);
    // setCellValue(barangSheet, `Y${row}`, barang);
    setCellValue(barangSheet, `Z${row}`, barang.hargaInvoice);
    // setCellValue(barangSheet, `AA${row}`, barang);
    // setCellValue(barangSheet, `AB${row}`, barang);
    // setCellValue(barangSheet, `AC${row}`, barang);
    // setCellValue(barangSheet, `AD${row}`, barang);
    // setCellValue(barangSheet, `AE${row}`, barang);
    // setCellValue(barangSheet, `AF${row}`, barang);
    // setCellValue(barangSheet, `AG${row}`, barang);
    // setCellValue(barangSheet, `AH${row}`, barang);
    // setCellValue(barangSheet, `AI${row}`, barang);
    setCellValue(
      barangSheet,
      `AJ${row}`,
      (barang.hargaInvoice ?? 0) / (barang.jumlah ?? 1),
    );
    // setCellValue(barangSheet, `AK${row}`, barang);
    // setCellValue(barangSheet, `AL${row}`, barang);
    // setCellValue(barangSheet, `AM${row}`, barang);
    // setCellValue(barangSheet, `AN${row}`, barang);
    // setCellValue(barangSheet, `AO${row}`, barang);
    // setCellValue(barangSheet, `AP${row}`, barang);
    // setCellValue(barangSheet, `AQ${row}`, barang);
    // setCellValue(barangSheet, `AR${row}`, barang);
    // setCellValue(barangSheet, `AS${row}`, barang);
    // setCellValue(barangSheet, `AT${row}`, barang);
    setCellValue(barangSheet, `AU${row}`, data.transaksi.kodeJenisTransaksi);
    // setCellValue(barangSheet, `AV${row}`, barang);
    // setCellValue(barangSheet, `AW${row}`, barang);
    setCellValue(barangSheet, `AX${row}`, barang.kondisiBarang);
    setCellValue(barangSheet, `AY${row}`, barang.negara);
    // setCellValue(barangSheet, `AZ${row}`, barang);
    // setCellValue(barangSheet, `BA${row}`, barang);
    // setCellValue(barangSheet, `BB${row}`, barang);
    // setCellValue(barangSheet, `BC${row}`, barang);
    // setCellValue(barangSheet, `BD${row}`, barang);
    // setCellValue(barangSheet, `BE${row}`, barang);
    // setCellValue(barangSheet, `BF${row}`, barang);
    // setCellValue(barangSheet, `BG${row}`, barang);
    // setCellValue(barangSheet, `BH${row}`, barang);
    // setCellValue(barangSheet, `BI${row}`, barang);
    // setCellValue(barangSheet, `BJ${row}`, barang);
    // setCellValue(barangSheet, `BK${row}`, barang);
    // setCellValue(barangSheet, `BL${row}`, barang);
    // setCellValue(barangSheet, `BM${row}`, barang);
    // setCellValue(barangSheet, `BN${row}`, barang);
    // setCellValue(barangSheet, `BO${row}`, barang);
    setCellValue(barangSheet, `BP${row}`, barang.metodePenentuanNilai);
    setCellValue(barangSheet, `BQ${row}`, barang.alasan);
    setCellValue(barangSheet, `BR${row}`, barang.statementPerbedaan);
  });
}

function setBarangTarifSheetData(
  tarifSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const listBarang = data.listBarang;
  const start = 2;
  const kodePungut: PungutanType[] = ["ppn", "bm", "pph"];

  listBarang.map((barang, index) => {
    const rowStart = index * 3 + start;

    kodePungut.map((kode, i) => {
      const row = rowStart + i;

      setCellValue(tarifSheet, `A${row}`, data.nomorAju);
      setCellValue(tarifSheet, `B${row}`, barang.seri);
      setCellValue(tarifSheet, `C${row}`, kode.toUpperCase());
      setCellValue(tarifSheet, `D${row}`, barang[`${kode}Pembayaran`]);
      setCellValue(tarifSheet, `E${row}`, barang[`${kode}Percentage`]);
      setCellValue(tarifSheet, `F${row}`, barang[`${kode}Pembayaran`]);
      // setCellValue(tarifSheet, `G${row}`, 0);
      // setCellValue(tarifSheet, `H${row}`, );
      // setCellValue(tarifSheet, `I${row}`, );
      // setCellValue(tarifSheet, `J${row}`, );
      setCellValue(tarifSheet, `K${row}`, barang.kodeSatuan);
      setCellValue(tarifSheet, `L${row}`, barang.jumlah);
      // setCellValue(tarifSheet, `M${row}`, );
      // setCellValue(tarifSheet, `N${row}`, );
      // setCellValue(tarifSheet, `O${row}`, );
      // setCellValue(tarifSheet, `P${row}`, );
      // setCellValue(tarifSheet, `Q${row}`, );
      // setCellValue(tarifSheet, `R${row}`, );
      // setCellValue(tarifSheet, `S${row}`, );
    });
  });
}

function setBarangDokumenSheetData(
  barangDokumenSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const listBarang = data.listBarang;
  let row = 2;

  listBarang.map((barang) => {
    const listDokumen = barang.listDokumen;

    listDokumen?.map((item) => {
      const doc = data.listDokumen.find(
        (i) => i.nomorDokumen == item.nomorDokumen,
      );
      setCellValue(barangDokumenSheet, `A${row}`, data.nomorAju);
      setCellValue(barangDokumenSheet, `B${row}`, barang.seri);
      setCellValue(barangDokumenSheet, `C${row}`, doc?.seri ?? "");
      setCellValue(barangDokumenSheet, `D${row}`, item.nomorUrut);

      row++;
    });
  });
}

function setPungutanDokumenSheetData(
  pungutanSheet: ExcelJS.Worksheet,
  data: FormInputs,
) {
  const start = 2;
  const pungutan: PungutanType[] = ["bm", "pph", "ppn"];

  pungutan.map((kode, i) => {
    const row = start + i;

    setCellValue(pungutanSheet, `A${row}`, data.nomorAju);
    setCellValue(pungutanSheet, `B${row}`, "1");
    setCellValue(pungutanSheet, `C${row}`, kode.toUpperCase());
    setCellValue(
      pungutanSheet,
      `D${row}`,
      getPungutan(kode, data.transaksi, data.listBarang),
    );
    // setCellValue(pungutanSheet, `E${row}`, );
  });
}

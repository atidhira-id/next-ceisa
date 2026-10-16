import ExcelJS from "exceljs";
import path from "node:path";

import type { DocumentData } from "@/app/providers/document-provider";
import { EntityData } from "@/app/providers/types";

// Helper function to export document data to an Excel file using a predefined template.
export async function exportDocumentToExcel(documentData: DocumentData) {
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

function setHeaderSheetData(
  headerSheet: ExcelJS.Worksheet,
  data: DocumentData,
) {
  const row = 2;
  const headerData = data.header;

  // A - NOMOR AJU
  headerSheet.getCell(`A${row}`).value = String(data.nomorAju);

  // B - KODE DOKUMEN
  headerSheet.getCell(`B${row}`).value = data.kodeDokumen;

  // C - KODE KANTOR
  setCellValue(headerSheet, `C${row}`, headerData.kodeKantor);

  // D - KODE KANTOR BONGKAR
  setCellValue(headerSheet, `D${row}`, headerData.kodeKantorBongkar);

  // E - KODE KANTOR PERIKSA
  setCellValue(headerSheet, `E${row}`, headerData.kodeKantorPeriksa);

  // F - KODE KANTOR TUJUAN
  setCellValue(headerSheet, `F${row}`, headerData.kodeKantorTujuan);

  // G - KODE KANTOR EKSPOR
  setCellValue(headerSheet, `G${row}`, headerData.kodeKantorEkspor);

  // H - KODE JENIS IMPOR
  setCellValue(headerSheet, `H${row}`, headerData.kodeJenisImpor);

  // I - KODE JENIS EKSPOR
  setCellValue(headerSheet, `I${row}`, headerData.kodeJenisEkspor);

  // J - KODE JENIS TPB
  setCellValue(headerSheet, `J${row}`, headerData.kodeJenisTpb);

  // K - KODE JENIS PLB
  setCellValue(headerSheet, `K${row}`, headerData.kodeJenisPlb);

  // L - KODE JENIS PROSEDUR
  setCellValue(headerSheet, `L${row}`, headerData.kodeJenisProsedur);

  // M - KODE TUJUAN PEMASUKAN
  setCellValue(headerSheet, `M${row}`, headerData.kodeTujuanPemasukan);

  // N - KODE TUJUAN PENGIRIMAN
  setCellValue(headerSheet, `N${row}`, headerData.kodeTujuanPengiriman);

  // O - KODE TUJUAN TPB
  setCellValue(headerSheet, `O${row}`, headerData.kodeTujuanTpb);

  // P - KODE CARA DAGANG
  setCellValue(headerSheet, `P${row}`, headerData.kodeCaraDagang);

  // Q - KODE CARA BAYAR
  setCellValue(headerSheet, `Q${row}`, headerData.kodeCaraBayar);

  // R - KODE CARA BAYAR LAINNYA
  setCellValue(headerSheet, `R${row}`, headerData.kodeCaraBayarLainnya);

  // S - KODE GUDANG ASAL
  setCellValue(headerSheet, `S${row}`, headerData.kodeGudangAsal);

  // T - KODE GUDANG TUJUAN
  setCellValue(headerSheet, `T${row}`, headerData.kodeGudangTujuan);

  // U - KODE JENIS KIRIM
  setCellValue(headerSheet, `U${row}`, headerData.kodeJenisKirim);

  // V - KODE JENIS PENGIRIMAN
  setCellValue(headerSheet, `V${row}`, headerData.kodeJenisPengiriman);

  // W - KODE KATEGORI EKSPOR
  setCellValue(headerSheet, `W${row}`, headerData.kodeKategoriEkspor);

  // X - KODE KATEGORI MASUK FTZ
  setCellValue(headerSheet, `X${row}`, headerData.kodeKategoriMasukFtz);

  // Y - KODE KATEGORI KELUAR FTZ
  setCellValue(headerSheet, `Y${row}`, headerData.kodeKategoriKeluarFtz);

  // Z - KODE KATEGORI BARANG FTZ
  setCellValue(headerSheet, `Z${row}`, headerData.kodeKategoriBarangFtz);

  // AA - KODE LOKASI
  setCellValue(headerSheet, `AA${row}`, headerData.kodeLokasi);

  // AB - KODE LOKASI BAYAR
  setCellValue(headerSheet, `AB${row}`, headerData.kodeLokasiBayar);

  // AC - LOKASI ASAL
  setCellValue(headerSheet, `AC${row}`, headerData.lokasiAsal);

  // AD - LOKASI TUJUAN
  setCellValue(headerSheet, `AD${row}`, headerData.lokasiTujuan);

  // AE - KODE DAERAH ASAL
  setCellValue(headerSheet, `AE${row}`, headerData.kodeDaerahAsal);

  // AF - KODE GUDANG ASAL (Duplicate/Secondary reference)
  setCellValue(headerSheet, `AF${row}`, headerData.kodeGudangAsal2);

  // AG - KODE GUDANG TUJUAN (Duplicate/Secondary reference)
  setCellValue(headerSheet, `AG${row}`, headerData.kodeGudangTujuan2);

  // AH - KODE NEGARA TUJUAN
  setCellValue(headerSheet, `AH${row}`, headerData.kodeNegaraTujuan);

  // AI - KODE TUTUP PU
  setCellValue(headerSheet, `AI${row}`, headerData.kodeTutupPu);

  // AJ - NOMOR BC11
  setCellValue(headerSheet, `AJ${row}`, headerData.nomorBc11);

  // AK - TANGGAL BC11
  setCellValue(headerSheet, `AK${row}`, headerData.tanggalBc11);

  // AL - NOMOR POS
  setCellValue(headerSheet, `AL${row}`, headerData.nomorPos);

  // AM - NOMOR SUB POS
  setCellValue(
    headerSheet,
    `AM${row}`,
    `${headerData.nomorSubPos1}${headerData.nomorSubPos2}`,
  );

  // AN - KODE PELABUHAN BONGKAR
  setCellValue(headerSheet, `AN${row}`, headerData.kodePelabuhanBongkar);

  // AO - KODE PELABUHAN MUAT
  setCellValue(headerSheet, `AO${row}`, headerData.kodePelabuhanMuat);

  // AP - KODE PELABUHAN MUAT AKHIR
  setCellValue(headerSheet, `AP${row}`, headerData.kodePelabuhanMuatAkhir);

  // AQ - KODE PELABUHAN TRANSIT
  setCellValue(headerSheet, `AQ${row}`, headerData.kodePelabuhanTransit);

  // AR - KODE PELABUHAN TUJUAN
  setCellValue(headerSheet, `AR${row}`, headerData.kodePelabuhanTujuan);

  // AS - KODE PELABUHAN EKSPOR
  setCellValue(headerSheet, `AS${row}`, headerData.kodePelabuhanEkspor);

  // AT - KODE TPS
  setCellValue(headerSheet, `AT${row}`, headerData.kodeTps);

  // AU - TANGGAL BERANGKAT
  setCellValue(headerSheet, `AU${row}`, headerData.tanggalBerangkat);

  // AV - TANGGAL EKSPOR
  setCellValue(headerSheet, `AV${row}`, headerData.tanggalEkspor);

  // AW - TANGGAL MASUK
  setCellValue(headerSheet, `AW${row}`, headerData.tanggalMasuk);

  // AX - TANGGAL MUAT
  setCellValue(headerSheet, `AX${row}`, headerData.tanggalMuat);

  // AY - TANGGAL TIBA
  setCellValue(headerSheet, `AY${row}`, headerData.tanggalTiba);

  // AZ - TANGGAL PERIKSA
  setCellValue(headerSheet, `AZ${row}`, headerData.tanggalPeriksa);

  // BA - TEMPAT STUFFING
  setCellValue(headerSheet, `BA${row}`, headerData.tempatStuffing);

  // BB - TANGGAL STUFFING
  setCellValue(headerSheet, `BB${row}`, headerData.tanggalStuffing);

  // BC - KODE TANDA PENGAMAN
  setCellValue(headerSheet, `BC${row}`, headerData.kodeTandaPengaman);

  // BD - JUMLAH TANDA PENGAMAN
  setCellValue(headerSheet, `BD${row}`, headerData.jumlahTandaPengaman);

  // BE - FLAG CURAH
  setCellValue(headerSheet, `BE${row}`, headerData.flagCurah);

  // BF - FLAG SDA
  setCellValue(headerSheet, `BF${row}`, headerData.flagSda);

  // BG - FLAG VD
  setCellValue(headerSheet, `BG${row}`, headerData.flagVd);

  // BH - FLAG AP BK
  setCellValue(headerSheet, `BH${row}`, headerData.flagApBk);

  // BI - FLAG MIGAS
  setCellValue(headerSheet, `BI${row}`, headerData.flagMigas);

  // BJ - KODE ASURANSI
  setCellValue(headerSheet, `BJ${row}`, headerData.kodeAsuransi);

  // BK - ASURANSI
  setCellValue(headerSheet, `BK${row}`, headerData.asuransi);

  // BL - NILAI BARANG
  setCellValue(headerSheet, `BL${row}`, headerData.nilaiBarang);

  // BM - NILAI INCOTERM
  setCellValue(headerSheet, `BM${row}`, headerData.nilaiIncoterm);

  // BN - NILAI MAKLON
  setCellValue(headerSheet, `BN${row}`, headerData.nilaiMaklon);

  // BO - ASURANSI
  setCellValue(headerSheet, `BO${row}`, headerData.asuransi2);

  // BP - FREIGHT
  setCellValue(headerSheet, `BP${row}`, headerData.freight);

  // BQ - FOB
  setCellValue(headerSheet, `BQ${row}`, headerData.fob);

  // BR - BIAYA TAMBAHAN
  setCellValue(headerSheet, `BR${row}`, headerData.biayaTambahan);

  // BS - BIAYA PENGURANG
  setCellValue(headerSheet, `BS${row}`, headerData.biayaPengurang);

  // BT - VD
  setCellValue(headerSheet, `BT${row}`, headerData.vd);

  // BU - CIF
  setCellValue(headerSheet, `BU${row}`, headerData.cif);

  // BV - HARGA_PENYERAHAN
  setCellValue(headerSheet, `BV${row}`, headerData.hargaPenyerahan);

  // BW - NDPBM
  setCellValue(headerSheet, `BW${row}`, headerData.ndpbm);

  // BX - TOTAL DANA SAWIT
  setCellValue(headerSheet, `BX${row}`, headerData.totalDanaSawit);

  // BY - DASAR PENGENAAN PAJAK
  setCellValue(headerSheet, `BY${row}`, headerData.dasarPengenaanPajak);

  // BZ - NILAI JASA
  setCellValue(headerSheet, `BZ${row}`, headerData.nilaiJasa);

  // CA - UANG MUKA
  setCellValue(headerSheet, `CA${row}`, headerData.uangMuka);

  // CB - BRUTO
  setCellValue(headerSheet, `CB${row}`, headerData.bruto);

  // CC - NETTO
  setCellValue(headerSheet, `CC${row}`, headerData.netto);

  // CD - VOLUME
  setCellValue(headerSheet, `CD${row}`, headerData.volume);

  // CE - KOTA PERNYATAAN
  setCellValue(headerSheet, `CE${row}`, headerData.kotaPernyataan);

  // CF - TANGGAL PERNYATAAN
  setCellValue(headerSheet, `CF${row}`, headerData.tanggalPernyataan);

  // CG - NAMA PERNYATAAN
  setCellValue(headerSheet, `CG${row}`, headerData.namaPernyataan);

  // CH - JABATAN PERNYATAAN
  setCellValue(headerSheet, `CH${row}`, headerData.jabatanPernyataan);

  // CI - KODE VALUTA
  setCellValue(headerSheet, `CI${row}`, headerData.kodeValuta);

  // CJ - KODE INCOTERM
  setCellValue(headerSheet, `CJ${row}`, headerData.kodeIncoterm);

  // CK - KODE JASA KENA PAJAK
  setCellValue(headerSheet, `CK${row}`, headerData.kodeJasaKenaPajak);

  // CL - NOMOR BUKTI BAYAR
  setCellValue(headerSheet, `CL${row}`, headerData.nomorBuktiBayar);

  // CM - TANGGAL BUKTI BAYAR
  setCellValue(headerSheet, `CM${row}`, headerData.tanggalBuktiBayar);

  // CN - KODE JENIS NILAI
  setCellValue(headerSheet, `CN${row}`, headerData.kodeJenisNilai);

  // CO - KODE KANTOR MUAT
  setCellValue(headerSheet, `CO${row}`, headerData.kodeKantorMuat);

  // CP - NOMOR DAFTAR
  setCellValue(headerSheet, `CP${row}`, headerData.nomorDaftar);

  // CQ - TANGGAL DAFTAR
  setCellValue(headerSheet, `CQ${row}`, headerData.tanggalDaftar);

  // CR - KODE ASAL BARANG FTZ
  setCellValue(headerSheet, `CR${row}`, headerData.kodeAsalBarangFtz);

  // CS - KODE TUJUAN PENGELUARAN
  setCellValue(headerSheet, `CS${row}`, headerData.kodeTujuanPengeluaran);

  // CT - PPN PAJAK
  setCellValue(headerSheet, `CT${row}`, headerData.ppnPajak);

  // CU - PPNBM PAJAK
  setCellValue(headerSheet, `CU${row}`, headerData.ppnbmPajak);

  // CV - TARIF PPN PAJAK
  setCellValue(headerSheet, `CV${row}`, headerData.tarifPpnPajak);

  // CW - TARIF PPNBM PAJAK
  setCellValue(headerSheet, `CW${row}`, headerData.tarifPpnbmPajak);

  // CX - BARANG TIDAK BERWUJUD
  setCellValue(headerSheet, `CX${row}`, headerData.barangTidakBerwujud);

  // CY - KODE JENIS PENGELUARAN
  setCellValue(headerSheet, `CY${row}`, headerData.kodeJenisPengeluaran);

  // CZ - BARANG KIRIMAN
  setCellValue(headerSheet, `CZ${row}`, headerData.barangKiriman);

  // DA - FLAG KONSOL
  setCellValue(headerSheet, `DA${row}`, headerData.flagKonsol);

  // DB - KODE JENIS PENGANGKUTAN
  setCellValue(headerSheet, `DB${row}`, headerData.kodeJenisPengangkutan);

  // DC - FLAG PROPORSIONAL NETTO
  setCellValue(headerSheet, `DC${row}`, headerData.flagProporsionalNetto);
}

function setEntitasSheetData(
  entitasSheet: ExcelJS.Worksheet,
  data: DocumentData,
) {
  const setEntitasRow = (row: number, entitasData: EntityData) => {
    // A - NOMOR AJU
    entitasSheet.getCell(`A${row}`).value = String(data.nomorAju);

    // B - SERI
    entitasSheet.getCell(`B${row}`).value = entitasData.seri;

    // C - KODE ENTITAS
    setCellValue(entitasSheet, `C${row}`, entitasData.kodeEntitas);

    // D - KODE JENIS IDENTITAS
    setCellValue(entitasSheet, `D${row}`, entitasData.kodeJenisIdentitas);

    // E - NOMOR IDENTITAS
    setCellValue(entitasSheet, `E${row}`, entitasData.nomorIdentitas);

    // F - NAMA ENTITAS
    setCellValue(entitasSheet, `F${row}`, entitasData.namaEntitas);

    // G - ALAMAT ENTITAS
    setCellValue(entitasSheet, `G${row}`, entitasData.alamatEntitas);

    // H - NIB ENTITAS
    setCellValue(entitasSheet, `H${row}`, entitasData.nibEntitas);

    // I - KODE JENIS API
    setCellValue(entitasSheet, `I${row}`, entitasData.kodeJenisApi);

    // J - KODE STATUS
    setCellValue(entitasSheet, `J${row}`, entitasData.kodeStatus);

    // K - NOMOR IJIN ENTITAS
    setCellValue(entitasSheet, `K${row}`, entitasData.nomorIjinEntitas);

    // L - TANGGAL IJIN ENTITAS
    setCellValue(entitasSheet, `L${row}`, entitasData.tanggalIjinEntitas);

    // M - KODE NEGARA
    setCellValue(entitasSheet, `M${row}`, entitasData.kodeNegara);

    // N - NIPER ENTITAS
    setCellValue(entitasSheet, `N${row}`, entitasData.niperEntitas);

    // O - KODE KATEGORI KONSOLIDATOR
    setCellValue(entitasSheet, `O${row}`, entitasData.kodeKategoriKonsolidator);

    // P - KODE AFILIASI
    setCellValue(entitasSheet, `P${row}`, entitasData.kodeAfiliasi);
  };

  setEntitasRow(2, data.entitas1);
  setEntitasRow(3, data.entitas7);
  setEntitasRow(4, data.entitas9);
  setEntitasRow(5, data.entitas10);
  setEntitasRow(6, data.entitas11);
}

function setDokumenSheetData(
  dokumenSheet: ExcelJS.Worksheet,
  data: DocumentData,
) {
  const dokumenDataArr = data.dokumen;

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
  data: DocumentData,
) {
  const row = 2;
  const pengangkutData = data.pengangkut;
  // A - NOMOR AJU
  pengangkutSheet.getCell(`A${row}`).value = String(data.nomorAju);

  // B - SERI
  pengangkutSheet.getCell(`B${row}`).value = pengangkutData.seri;

  // C - KODE CARA ANGKUT
  setCellValue(pengangkutSheet, `C${row}`, pengangkutData.kodeCaraAngkut);

  // D - NAMA PENGANGKUT
  setCellValue(pengangkutSheet, `D${row}`, pengangkutData.namaPengangkut);

  // E - NOMOR PENGANGKUT
  setCellValue(pengangkutSheet, `E${row}`, pengangkutData.nomorPengangkut);

  // F - KODE BENDERA
  setCellValue(pengangkutSheet, `F${row}`, pengangkutData.kodeBendera);

  // G - CALL SIGN
  setCellValue(pengangkutSheet, `G${row}`, pengangkutData.callSign);

  // H - FLAG ANGKUT PLB
  setCellValue(pengangkutSheet, `H${row}`, pengangkutData.flagAngkutPlb);

  // I - CARA PENGANGKUTAN LAINNYA
  setCellValue(
    pengangkutSheet,
    `I${row}`,
    pengangkutData.caraPengangkutanLainnya,
  );
}

function setKemasanSheetData(
  kemasanSheet: ExcelJS.Worksheet,
  data: DocumentData,
) {
  const kemasanDataArr = data.kemasan;

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
  data: DocumentData,
) {
  const kontainerDataArr = data.kontainer;

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

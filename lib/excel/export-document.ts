import ExcelJS from "exceljs";
import path from "node:path";

import type { DocumentData } from "@/app/providers/document-provider";

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
  const headerSheet = workbook.getWorksheet("HEADER");
  if (!headerSheet) {
    throw new Error("Sheet HEADER tidak ditemukan di template Excel.");
  }

  // First row is for column headers, so we start filling data from the second row.
  const row = 2;
  const headerData = documentData.header;

  // HEADER TAB
  // A - NOMOR AJU
  headerSheet.getCell(`A${row}`).value = String(documentData.nomorAju);

  // B - KODE DOKUMEN
  headerSheet.getCell(`B${row}`).value = documentData.kodeDokumen;

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

  // L - KODE JENIS PROSEDUR
  setCellValue(headerSheet, `L${row}`, headerData.kodeJenisProsedur);

  // M - KODE TUJUAN PEMASUKAN
  setCellValue(headerSheet, `M${row}`, headerData.kodeTujuanPemasukan);

  // N - KODE TUJUAN PENGIRIMAN
  setCellValue(headerSheet, `N${row}`, headerData.kodeTujuanPengiriman);

  // P - KODE CARA DAGANG
  setCellValue(headerSheet, `P${row}`, headerData.kodeCaraDagang);

  // Q - KODE CARA BAYAR
  setCellValue(headerSheet, `Q${row}`, headerData.kodeCaraBayar);

  // AR - KODE PELABUHAN TUJUAN
  setCellValue(headerSheet, `AR${row}`, headerData.kodePelabuhanTujuan);

  // CI - KODE VALUTA
  setCellValue(headerSheet, `CI${row}`, headerData.kodeValuta);

  // CJ - KODE INCOTERM
  setCellValue(headerSheet, `CJ${row}`, headerData.kodeIncoterm);

  return workbook.xlsx.writeBuffer();
}

/// Helper function to set cell value only if it's not undefined, null, or empty string
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

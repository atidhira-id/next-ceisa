import { FormInputs } from "@/app/types";
import { generateNewDocument } from "@/app/constants/newDocument";

export async function createDocument(
  entitas: string,
  kodeDokumen: string,
): Promise<FormInputs> {
  // Generate nomor AJU
  const response = await fetch("/api/documents/generateNomorAju", {
    method: "POST",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Gagal membuat nomor AJU.");
  }

  const nomorAju = result?.nomorAju;

  if (typeof nomorAju !== "string" || nomorAju.length !== 26) {
    throw new Error("Format nomor AJU yang diterima tidak valid.");
  }

  // Membuat data awal dokumen
  const initialDocumentData = generateNewDocument(
    nomorAju,
    entitas,
    kodeDokumen,
  );

  // Menyimpan draft ke database
  const saveResponse = await fetch("/api/documents/drafts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initialDocumentData),
  });

  const saveResult = await saveResponse.json().catch(() => null);

  if (!saveResponse.ok) {
    throw new Error(
      saveResult?.message ?? "Gagal menyimpan draft ke database.",
    );
  }

  return initialDocumentData;
}

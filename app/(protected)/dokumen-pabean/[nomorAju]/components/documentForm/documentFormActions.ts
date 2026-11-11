import type { FormInputs } from "@/app/types";

export async function saveDocumentDraft(
  documentData: FormInputs,
): Promise<void> {
  const response = await fetch("/api/documents/drafts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Gagal menyimpan draft.");
  }
}

export async function exportDocumentExcel(
  documentData: FormInputs,
): Promise<void> {
  const response = await fetch("/api/documents/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message ?? "Gagal membuat file Excel.");
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `dokumen-${documentData.nomorAju}.xlsx`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(downloadUrl);
}

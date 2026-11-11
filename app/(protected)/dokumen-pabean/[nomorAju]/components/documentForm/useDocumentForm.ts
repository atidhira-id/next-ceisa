import { useState } from "react";
import type { FormInputs } from "@/app/types";
import { saveDocumentDraft, exportDocumentExcel } from "./documentFormActions";

export function useDocumentForm(documentData: FormInputs | null) {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  async function handleSaveDraft() {
    if (!documentData) {
      alert("Data dokumen belum tersedia.");
      return;
    }

    try {
      setIsSaving(true);

      await saveDocumentDraft(documentData);

      alert("Draft berhasil disimpan.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan draft.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleExportExcel() {
    if (!documentData) {
      return;
    }

    try {
      setIsExporting(true);

      await exportDocumentExcel(documentData);
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Gagal export Excel.");
    } finally {
      setIsExporting(false);
    }
  }

  return {
    isSaving,
    isExporting,
    handleSaveDraft,
    handleExportExcel,
  };
}

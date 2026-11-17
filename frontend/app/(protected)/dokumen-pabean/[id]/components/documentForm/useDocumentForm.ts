import { useState } from "react";
import { DraftSection, useDraft } from "@/app/providers/draftProvider";
import type { DraftType } from "@/app/types";
import { saveDocumentDraft } from "./documentFormActions";

export function useDocumentForm(draftData: DraftType | null) {
  const [isSaving, setIsSaving] = useState(false);
  const { draft, dirtySections, markSectionSaved } = useDraft();

  async function saveSection(sections: DraftSection[]): Promise<boolean> {
    if (!draftData || isSaving) return false;

    try {
      setIsSaving(true);

      for (const section of sections) {
        console.log("Section:", section);
        console.log("Payload:", draft![section]);
        await saveDocumentDraft(draftData.id, section, draftData[section]);

        markSectionSaved(section);
      }

      return true;
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Gagal menyimpan perubahan.",
      );

      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveDraft() {
    if (!draftData) {
      alert("Data dokumen belum tersedia.");
      return;
    }

    if (dirtySections.size === 0) {
      alert("Tidak ada perubahan untuk disimpan.");
      return;
    }

    const success = await saveSection([...dirtySections]);

    if (success) {
      alert("Draft berhasil disimpan.");
    }
  }

  return {
    isSaving,
    saveSection,
    handleSaveDraft,
  };
}

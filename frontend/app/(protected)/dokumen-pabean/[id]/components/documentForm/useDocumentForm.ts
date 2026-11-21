import { useState } from "react";
import { DraftSection, useDraft } from "@/app/providers/draftProvider";
import type { DraftType } from "@/app/types/draft";
import type { Tab } from "@/app/types/tab";
import { saveDraft } from "@/app/services/draft.service";

const tabs: Tab[] = [
  "Header",
  "Entitas",
  "Dokumen",
  "Pengangkut",
  "Kemasan & Peti Kemas",
  "Transaksi",
  "Barang",
  "Pungutan",
  "Pernyataan",
];

export function useDocumentForm(draftData: DraftType | null) {
  const [isSaving, setIsSaving] = useState(false);
  const { draft, dirtySections, markSectionSaved } = useDraft();

  const [activeTab, setActiveTab] = useState<Tab>("Header");
  const activeTabIndex = tabs.indexOf(activeTab);
  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === tabs.length - 1;

  async function saveSection(sections: DraftSection[]): Promise<boolean> {
    if (!draftData || isSaving) return false;

    try {
      setIsSaving(true);

      for (const section of sections) {
        console.log("Section:", section);
        console.log("Payload:", draft![section]);
        await saveDraft(draftData.id, section, draftData[section]);

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

  async function handleTabChange(nextTab: Tab) {
    if (nextTab === activeTab) return;

    const sectionMap: Record<Tab, DraftSection[]> = {
      Header: ["header"],
      Entitas: ["entities"],
      Dokumen: ["documents"],
      Pengangkut: ["transport"],
      "Kemasan & Peti Kemas": ["packages", "containers"],
      Transaksi: ["transactions"],
      Barang: ["goods"],
      Pungutan: [],
      Pernyataan: ["declarations"],
    };

    const sections = sectionMap[activeTab];

    const dirty = sections.filter((section) =>
      dirtySections.has(section as never),
    );

    if (dirty.length > 0) {
      const success = await saveSection(dirty);

      if (!success) return;

      dirty.forEach((section) => markSectionSaved(section as never));
    }

    setActiveTab(nextTab);
  }

  function handlePrevious() {
    if (!isFirstTab) {
      void handleTabChange(tabs[activeTabIndex - 1]);
    }
  }

  function handleNext() {
    if (!isLastTab) {
      void handleTabChange(tabs[activeTabIndex + 1]);
    }
  }

  return {
    isSaving,
    saveSection,
    handleSaveDraft,

    activeTab,
    isFirstTab,
    isLastTab,
    handleTabChange,
    handlePrevious,
    handleNext,
  };
}

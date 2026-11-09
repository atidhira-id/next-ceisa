"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { DocumentTabs } from "./documentTabs";
import type { DocumentTab } from "@/app/types";
import { tabs } from "@/app/constants/tabs";
import HeaderTab from "./tabs/header/headerTab";
import EntitasTab from "./tabs/entitas/entitasTab";
import DokumenTab from "./tabs/dokumen/dokumenTab";
import PengangkutTab from "./tabs/pengangkut/pengangkutTab";
import KemasanKontainerTab from "./tabs/kemasanKontainer/kemasanKontainerTab";
import TransaksiTab from "./tabs/transaksi/transaksiTab";
import BarangTab from "./tabs/barang/barangTab";
import PungutanTab from "./tabs/pungutan/pungutanTab";
import PernyataanTab from "./tabs/pernyataan/pernyataanTab";
import { MoveLeft, MoveRight } from "lucide-react";
import { NormalButton } from "../../components/buttons";

export function DocumentForm({ nomorAju }: { nomorAju: string }) {
  const { documentData } = useDocument();

  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<DocumentTab>("Header");
  const activeTabIndex = tabs.indexOf(activeTab);
  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === tabs.length - 1;

  if (!documentData) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Data dokumen tidak ditemukan.</p>
      </div>
    );
  }

  function handlePrevious() {
    if (isFirstTab) {
      return;
    }

    setActiveTab(tabs[activeTabIndex - 1]);
  }

  function handleNext() {
    if (isLastTab) {
      return;
    }

    setActiveTab(tabs[activeTabIndex + 1]);
  }

  async function handleSaveDraft() {
    if (!documentData) {
      alert("Data dokumen belum tersedia.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/documents/drafts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Gagal menyimpan draft.");
      }

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
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Gagal export Excel.");
    } finally {
      setIsExporting(false);
    }
  }

  function renderTabContent() {
    switch (activeTab) {
      case "Header":
        return <HeaderTab />;

      case "Entitas":
        return <EntitasTab />;

      case "Dokumen":
        return <DokumenTab />;

      case "Pengangkut":
        return <PengangkutTab />;

      case "Kemasan & Peti Kemas":
        return <KemasanKontainerTab />;

      case "Transaksi":
        return <TransaksiTab />;

      case "Barang":
        return <BarangTab />;

      case "Pungutan":
        return <PungutanTab />;

      case "Pernyataan":
        return <PernyataanTab />;

      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dokumen Pabean</span>
          <span>/</span>
          <span className="font-medium text-gray-700">{nomorAju}</span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
              Dokumen Pabean
            </h1>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-3">
              <NormalButton
                variant={"inverted"}
                disabled={!documentData || isExporting}
                onClick={handleExportExcel}
              >
                {isExporting ? "Exporting..." : "Export"}
              </NormalButton>

              <NormalButton
                disabled={!documentData || isSaving}
                onClick={handleSaveDraft}
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </NormalButton>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Tabs */}
        <DocumentTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="min-h-125 p-6">{renderTabContent()}</div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <NormalButton disabled={isFirstTab} onClick={handlePrevious}>
            <MoveLeft size={14} /> Kembali
          </NormalButton>

          {!isLastTab && (
            <NormalButton onClick={handleNext}>
              Berikutnya <MoveRight size={14} />
            </NormalButton>
          )}
        </div>
      </div>
    </div>
  );
}

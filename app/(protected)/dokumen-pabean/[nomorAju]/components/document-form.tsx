"use client";

import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { DocumentTabs, type DocumentTab } from "./document-tabs";
import { HeaderTab } from "./tabs/header-tab";

type DocumentFormProps = {
  nomorAju: string;
};

const tabOrder: DocumentTab[] = [
  "header",
  "entity",
  "document",
  "transport",
  "package",
  "transaction",
  "goods",
  "levy",
  "statement",
];

export function DocumentForm({ nomorAju }: DocumentFormProps) {
  const { documentData, updateDocumentData } = useDocument();
  const [isExporting, setIsExporting] = useState(false);

  const [activeTab, setActiveTab] = useState<DocumentTab>("header");
  const activeTabIndex = tabOrder.indexOf(activeTab);
  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === tabOrder.length - 1;

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

    setActiveTab(tabOrder[activeTabIndex - 1]);
  }

  function handleNext() {
    if (isLastTab) {
      return;
    }

    setActiveTab(tabOrder[activeTabIndex + 1]);
  }

  function handleSaveDraft() {
    console.log("Save draft:", {
      nomorAju,
      documentData,
    });
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
      case "header":
        return (
          <HeaderTab
            data={documentData!}
            onChange={(data) => updateDocumentData(data)}
          />
        );

      case "entity":
        return (
          <TabPlaceholder
            title="Entitas"
            description="Form data entitas akan dibuat di tahap berikutnya."
          />
        );

      case "document":
        return (
          <TabPlaceholder
            title="Dokumen"
            description="Form data dokumen akan dibuat di tahap berikutnya."
          />
        );

      case "transport":
        return (
          <TabPlaceholder
            title="Pengangkut"
            description="Form data pengangkut akan dibuat di tahap berikutnya."
          />
        );

      case "package":
        return (
          <TabPlaceholder
            title="Kemasan & Peti Kemas"
            description="Form data kemasan dan peti kemas akan dibuat di tahap berikutnya."
          />
        );

      case "transaction":
        return (
          <TabPlaceholder
            title="Transaksi"
            description="Form data transaksi akan dibuat di tahap berikutnya."
          />
        );

      case "goods":
        return (
          <TabPlaceholder
            title="Barang"
            description="Form data barang akan dibuat di tahap berikutnya."
          />
        );

      case "levy":
        return (
          <TabPlaceholder
            title="Pungutan"
            description="Form data pungutan akan dibuat di tahap berikutnya."
          />
        );

      case "statement":
        return (
          <TabPlaceholder
            title="Pernyataan"
            description="Form pernyataan akan dibuat di tahap berikutnya."
          />
        );

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
            <h1 className="text-2xl font-semibold text-gray-900">
              Dokumen Pabean
            </h1>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportExcel}
                disabled={!documentData || isExporting}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Simpan Draft
              </button>
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
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isFirstTab}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Sebelumnya
          </button>

          {!isLastTab && (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Berikutnya →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type TabPlaceholderProps = {
  title: string;
  description: string;
};

function TabPlaceholder({ title, description }: TabPlaceholderProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <p className="mt-1 text-sm text-gray-500">{description}</p>

      <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="text-sm text-gray-500">
          Form {title} akan dibuat setelah struktur field dokumen ditentukan.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useDraft } from "@/app/providers/draftProvider";

import { DocumentTabs } from "./documentTabs";
import HeaderTab from "../tabs/header";
import EntitiesTab from "../tabs/entities";
import DocumentsTab from "../tabs/documents";
import TransportTab from "../tabs/transport";
import PackageContainerTab from "../tabs/packageContainer";
import TransactionTab from "../tabs/transaction";
import GoodsTab from "../tabs/goods";
import LevyTab from "../tabs/levy";
import DeclarationTab from "../tabs/declaration";

import { MoveLeft, MoveRight } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";
import { useDocumentForm } from "./useDocumentForm";

export function DocumentForm({ id }: { id: string }) {
  const { draft } = useDraft();
  const {
    isSaving,
    handleSaveDraft,

    activeTab,
    isFirstTab,
    isLastTab,
    handleTabChange,
    handlePrevious,
    handleNext,
  } = useDocumentForm(draft);

  if (!draft) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Data dokumen tidak ditemukan.</p>
      </div>
    );
  }

  function renderTabContent() {
    switch (activeTab) {
      case "Header":
        return <HeaderTab />;

      case "Entitas":
        return <EntitiesTab />;

      case "Dokumen":
        return <DocumentsTab />;

      case "Pengangkut":
        return <TransportTab />;

      case "Kemasan & Peti Kemas":
        return <PackageContainerTab />;

      case "Transaksi":
        return <TransactionTab />;

      case "Barang":
        return <GoodsTab />;

      case "Pungutan":
        return <LevyTab />;

      case "Pernyataan":
        return <DeclarationTab />;

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
          <span className="font-medium text-gray-700">{id}</span>
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
                disabled={!draft || isSaving}
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
        <DocumentTabs
          activeTab={activeTab}
          onTabChange={(tab) => void handleTabChange(tab)}
        />

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

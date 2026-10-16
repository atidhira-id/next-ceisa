"use client";
import { useState } from "react";
import DocumentHeader from "@/app/(protected)/dokumen-pabean/components/document-header";
import AddDocumentModal from "@/app/(protected)/dokumen-pabean/components/add-document-modal";
import DocumentTable from "@/app/(protected)/dokumen-pabean/components/document-table";

export default function DokumenPabeanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <DocumentHeader onAddDocument={() => setIsModalOpen(true)} />

      {/* Modal */}
      {isModalOpen && (
        <AddDocumentModal onCloseModal={() => setIsModalOpen(false)} />
      )}
      {/* Table */}
      <DocumentTable />
    </div>
  );
}

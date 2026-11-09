"use client";
import { useState } from "react";
import DocumentHeader from "@/app/(protected)/dokumen-pabean/components/documentHeader";
import ModalNewDocument from "@/app/(protected)/dokumen-pabean/components/modalNewDocument";
import DocumentTable from "@/app/(protected)/dokumen-pabean/components/documentTable";

export default function DokumenPabeanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <DocumentHeader onAddDocument={() => setIsModalOpen(true)} />

      {/* Modal */}
      {isModalOpen && (
        <ModalNewDocument onCloseModal={() => setIsModalOpen(false)} />
      )}
      {/* Table */}
      <DocumentTable />
    </div>
  );
}

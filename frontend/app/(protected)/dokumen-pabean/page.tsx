"use client";
import { useState } from "react";
import DocumentHeader from "@/app/(protected)/dokumen-pabean/components/documentHeader";
import ModalNewDraft from "@/app/(protected)/dokumen-pabean/components/modalNewDraft";
import DocumentTable from "@/app/(protected)/dokumen-pabean/components/documentTable";

export default function DokumenPabeanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <DocumentHeader onAddDocument={() => setIsModalOpen(true)} />

      <DocumentTable />

      {isModalOpen && (
        <ModalNewDraft onCloseModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

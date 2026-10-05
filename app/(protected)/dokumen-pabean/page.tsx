"use client";
import { useState } from "react";
import DocumentHeader from "@/app/(protected)/dokumen-pabean/components/document-header";
import AddDocumentModal from "@/app/(protected)/dokumen-pabean/components/add-document-modal";
import DocumentTable, {
  type Document,
} from "@/app/(protected)/dokumen-pabean/components/document-table";
import DocumentEmpty from "./components/document-empty";

const documents: Document[] = [
  {
    documentCode: "BC 2.0",
    applicationNumber: "000001/IMP/2026",
    companyName: "PT Contoh Indonesia",
    customsOffice: "KPPBC TMP A Jakarta",
  },
  {
    documentCode: "BC 2.5",
    applicationNumber: "000002/IMP/2026",
    companyName: "PT Maju Bersama",
    customsOffice: "KPPBC TMP A Bekasi",
  },
  {
    documentCode: "BC 3.0",
    applicationNumber: "000003/EKS/2026",
    companyName: "PT Export Nusantara",
    customsOffice: "KPPBC TMP A Tanjung Priok",
  },
];

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
      {documents.length === 0 ? (
        <DocumentEmpty />
      ) : (
        <DocumentTable documents={documents} />
      )}
    </div>
  );
}

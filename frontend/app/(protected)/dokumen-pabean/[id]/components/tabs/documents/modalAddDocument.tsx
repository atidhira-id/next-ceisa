"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { type DocumentItemType } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";
import {
  kodeJenisOptions,
  kodeFasilitasOptions,
} from "@/app/constants/options/dokumenOptions";
import { required } from "@/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

const initialDocument: DocumentItemType = {
  series: 1,
  documentCode: "",
  documentNumber: "",
  documentDate: "",
  facilityCode: "",
  permissionCode: "",
};

type ModalAddDocumentItemProps = {
  document?: DocumentItemType;
  onCloseModal: () => void;
};

export default function ModalAddDocumentItem({
  document,
  onCloseModal,
}: ModalAddDocumentItemProps) {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const documents = documentData!.documents;

  const series = document?.series ?? documents.length + 1;
  const [newDocument, setNewDocument] = useState<DocumentItemType>(
    document ?? { ...initialDocument, series: series },
  );
  const isSaveDisabled =
    !newDocument.documentCode.trim() ||
    !newDocument.documentNumber.trim() ||
    !newDocument.documentDate.trim() ||
    (newDocument.documentCode === "861" && !newDocument.facilityCode?.trim()) ||
    (newDocument.documentCode === "888" && !newDocument.permissionCode?.trim());

  function handleSave() {
    const documentList = document
      ? documents.map((item) => (item.series === series ? newDocument : item))
      : [...documents, newDocument];
    updateDocumentData({ documents: documentList });

    onCloseModal();
  }

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader
        title={document ? "Edit Dokumen Lampiran" : "Dokumen Lampiran"}
        onCloseModal={onCloseModal}
      ></ModalHeader>

      <ModalContent>
        {/* Seri */}
        <InputNormal title="Seri" value={series.toString()} disabled />

        {/* Jenis Dokumen */}
        <InputSelect
          label="Jenis Dokumen"
          options={kodeJenisOptions}
          value={newDocument.documentCode}
          onChange={(value) =>
            setNewDocument({ ...newDocument, documentCode: value })
          }
          rules={[required()]}
        />

        {/* Nomor Dokumen */}
        <InputNormal
          title="Nomor Dokumen"
          value={newDocument.documentNumber}
          onChange={(value) =>
            setNewDocument({ ...newDocument, documentNumber: value })
          }
          rules={[required()]}
        />

        {/* Tanggal */}
        <InputDate
          label="Tanggal"
          value={newDocument.documentDate}
          onChange={(value) =>
            setNewDocument({ ...newDocument, documentDate: value })
          }
          rules={[required()]}
        />

        {/* Fasilitas Dokumen */}
        {newDocument.documentCode == "861" && (
          <InputSelect
            label="Fasilitas Dokumen"
            options={kodeFasilitasOptions}
            value={newDocument.facilityCode ?? ""}
            onChange={(value) =>
              setNewDocument({ ...newDocument, facilityCode: value })
            }
            rules={[required()]}
          />
        )}

        {/* Kode Izin */}
        {newDocument.documentCode == "888" && (
          <InputNormal
            title="Kode Izin"
            value={newDocument.permissionCode ?? ""}
            onChange={(value) =>
              setNewDocument({ ...newDocument, permissionCode: value })
            }
            rules={[required()]}
          />
        )}
      </ModalContent>

      <ModalFooter
        textYes="Simpan"
        disabled={isSaveDisabled}
        handleYes={handleSave}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

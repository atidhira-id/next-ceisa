"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { useSaveDraftItem } from "@/app/hooks/useSaveSectionItem";
import { type DocumentItemType } from "@/app/types/draft";

import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";
import { required } from "@/app/lib/validation";
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
  const { draft, updateDraftData } = useDraft();
  const documents = draft!.documents;

  const { handleSave, isSaving, validationErrors } =
    useSaveDraftItem<DocumentItemType>({
      draftId: draft!.id,
      section: "documents",
      items: documents,
      onUpdate: (updatedDocuments) => {
        updateDraftData({ documents: updatedDocuments });
      },
      onClose: onCloseModal,
    });

  const documentTypes = useOptions("DOCUMENT_TYPE");
  const facilitiesCode = useOptions("DOCUMENT_FACILITY");

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
          options={documentTypes.options}
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
            options={facilitiesCode.options}
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

        {validationErrors.length > 0 && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {validationErrors.map((error, index) => (
              <p key={index}>
                {error.path.length > 0 ? `${error.path.join(".")}: ` : ""}
                {error.message}
              </p>
            ))}
          </div>
        )}
      </ModalContent>

      <ModalFooter
        textYes={isSaving ? "Menyimpan..." : "Simpan"}
        disabled={isSaveDisabled || isSaving}
        handleYes={() => handleSave(newDocument)}
        handleNo={onCloseModal}
      />
    </ModalWrapper>
  );
}

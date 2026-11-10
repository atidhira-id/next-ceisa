"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type DocumentItemData } from "@/app/types";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import InputDate from "../../inputs/input-date";
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

const initialDocument: DocumentItemData = {
  seri: 0,
  kodeDokumen: "",
  nomorDokumen: "",
  tanggalDokumen: "",
  kodeFasilitas: "",
  kodeIjin: "",
};

type ModalAddDocumentItemProps = {
  document?: DocumentItemData;
  onCloseModal: () => void;
};

export default function ModalAddDocumentItem({
  document,
  onCloseModal,
}: ModalAddDocumentItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seri = document?.seri ?? data.listDokumen.length + 1;
  const [newDocument, setNewDocument] = useState<DocumentItemData>(
    document ?? { ...initialDocument, seri },
  );
  const isSaveDisabled =
    !newDocument.kodeDokumen.trim() ||
    !newDocument.nomorDokumen.trim() ||
    !newDocument.tanggalDokumen.trim() ||
    (newDocument.kodeDokumen === "861" &&
      !newDocument.kodeFasilitas?.trim()) ||
    (newDocument.kodeDokumen === "888" && !newDocument.kodeIjin?.trim());

  function handleSimpan() {
    const listDokumen = document
      ? data.listDokumen.map((item) =>
          item.seri === seri ? newDocument : item,
        )
      : [...data.listDokumen, newDocument];
    updateDocumentData({ listDokumen });

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
        <InputNormal title="Seri" value={seri.toString()} disabled />

        {/* Jenis Dokumen */}
        <InputSelect
          label="Jenis Dokumen"
          options={kodeJenisOptions}
          value={newDocument.kodeDokumen}
          onChange={(value) =>
            setNewDocument({ ...newDocument, kodeDokumen: value })
          }
          rules={[required()]}
        />

        {/* Nomor Dokumen */}
        <InputNormal
          title="Nomor Dokumen"
          value={newDocument.nomorDokumen}
          onChange={(value) =>
            setNewDocument({ ...newDocument, nomorDokumen: value })
          }
          rules={[required()]}
        />

        {/* Tanggal */}
        <InputDate
          label="Tanggal"
          value={newDocument.tanggalDokumen}
          onChange={(value) =>
            setNewDocument({ ...newDocument, tanggalDokumen: value })
          }
          rules={[required()]}
        />

        {/* Fasilitas Dokumen */}
        {newDocument.kodeDokumen == "861" && (
          <InputSelect
            label="Fasilitas Dokumen"
            options={kodeFasilitasOptions}
            value={newDocument.kodeFasilitas ?? ""}
            onChange={(value) =>
              setNewDocument({ ...newDocument, kodeFasilitas: value })
            }
            rules={[required()]}
          />
        )}

        {/* Kode Izin */}
        {newDocument.kodeDokumen == "888" && (
          <InputNormal
            title="Kode Izin"
            value={newDocument.kodeIjin ?? ""}
            onChange={(value) =>
              setNewDocument({ ...newDocument, kodeIjin: value })
            }
            rules={[required()]}
          />
        )}
      </ModalContent>

      <ModalFooter
        textYes="Simpan"
        disabled={isSaveDisabled}
        handleYes={handleSimpan}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type DocumentItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import {
  kodeJenisOptions,
  kodeFasilitasOptions,
} from "@/app/constants/dokumen-options";
import { required } from "@/lib/validation";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            {document ? "Edit Dokumen Lampiran" : "Dokumen Lampiran"}
          </h2>
        </div>

        <div className="space-y-5 px-6 py-5">
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
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={onCloseModal}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSimpan}
            disabled={
              !newDocument.kodeDokumen ||
              !newDocument.nomorDokumen ||
              !newDocument.tanggalDokumen ||
              (newDocument.kodeDokumen === "861" &&
                !newDocument.kodeFasilitas) ||
              (newDocument.kodeDokumen === "888" && !newDocument.kodeIjin)
            }
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {document ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

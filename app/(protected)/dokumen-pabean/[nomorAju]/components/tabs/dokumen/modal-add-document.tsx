"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type DocumentItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import {
  fasilitasDokumenOptions,
  jenisDokumenLampiranOptions,
} from "@/lib/options";
import { required } from "@/lib/validation";

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

  const seri =
    document?.seri ??
    Math.max(0, ...data.listDokumen.map((item) => item.seri)) + 1;
  const [kodeDokumen, setKodeDokumen] = useState(document?.kodeDokumen ?? "");
  const [nomorDokumen, setNomorDokumen] = useState(
    document?.nomorDokumen ?? "",
  );
  const [tanggal, setTanggal] = useState(document?.tanggalDokumen ?? "");
  const [fasilitasDokumen, setFasilitasDokumen] = useState(
    document?.kodeFasilitas ?? "",
  );

  function handleSimpan() {
    const newDocumentItem: DocumentItemData = {
      seri,
      kodeDokumen: kodeDokumen,
      nomorDokumen: nomorDokumen,
      tanggalDokumen: tanggal,
      ...(kodeDokumen === "861" && { kodeFasilitas: fasilitasDokumen }),
    };

    const listDokumen = document
      ? data.listDokumen.map((item) =>
          item.seri === document.seri ? newDocumentItem : item,
        )
      : [...data.listDokumen, newDocumentItem];
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
            options={jenisDokumenLampiranOptions}
            value={kodeDokumen}
            onChange={(value) => setKodeDokumen(value)}
            rules={[required()]}
          />

          {/* Nomor Dokumen */}
          <InputNormal
            title="Nomor Dokumen"
            value={nomorDokumen}
            onChange={(value) => setNomorDokumen(value)}
            rules={[required()]}
          />

          {/* Tanggal */}
          <InputDate
            label="Tanggal"
            value={tanggal}
            onChange={(value) => setTanggal(value)}
            rules={[required()]}
          />

          {/* Fasilitas Dokumen */}
          {kodeDokumen == "861" && (
            <InputSelect
              label="Fasilitas Dokumen"
              options={fasilitasDokumenOptions}
              value={fasilitasDokumen}
              onChange={(value) => setFasilitasDokumen(value)}
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
              !kodeDokumen ||
              !nomorDokumen ||
              !tanggal ||
              (kodeDokumen === "861" && !fasilitasDokumen)
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

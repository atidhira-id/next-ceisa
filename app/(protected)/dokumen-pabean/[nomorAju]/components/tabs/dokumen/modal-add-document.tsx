"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type DocumentItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import { jenisDokumenLampiranOptions } from "@/lib/options";
import { required } from "@/lib/validation";

type ModalAddDocumentItemProps = {
  onCloseModal: () => void;
};

export default function ModalAddDocumentItem({
  onCloseModal,
}: ModalAddDocumentItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const seriNumber = data.listDokumen.length + 1;
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [nomorDokumen, setNomorDokumen] = useState("");
  const [tanggal, setTanggal] = useState("");

  function handleSimpan() {
    const newDocumentItem: DocumentItemData = {
      seri: seriNumber,
      kodeDokumen: jenisDokumen,
      nomorDokumen: nomorDokumen,
      tanggalDokumen: tanggal,
    };

    updateDocumentData({
      listDokumen: [...data.listDokumen, newDocumentItem],
    });

    onCloseModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Dokumen Lampiran</h2>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Seri */}
          <InputNormal title="Seri" value={seriNumber.toString()} disabled />

          {/* Jenis Dokumen */}
          <InputSelect
            label="Jenis Dokumen"
            options={jenisDokumenLampiranOptions}
            value={jenisDokumen}
            onChange={(value) => setJenisDokumen(value)}
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
            disabled={!jenisDokumen || !nomorDokumen || !tanggal}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

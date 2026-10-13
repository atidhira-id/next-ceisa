"use client";
import { useState } from "react";
import {
  type DocumentData,
  useDocument,
} from "@/app/providers/document-provider";
import { type KontainerItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/lib/options";

type ModalAddKontainerItemProps = {
  data: DocumentData;
  onCloseModal: () => void;
};

export default function ModalAddKontainerItem({
  data,
  onCloseModal,
}: ModalAddKontainerItemProps) {
  const { updateDocumentData } = useDocument();

  const seriNumber = data.kontainer.length + 1;
  const [nomor, setNomor] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [jenis, setJenis] = useState("");
  const [tipe, setTipe] = useState("");

  function handleSimpan() {
    const newKontainerItem: KontainerItemData = {
      seri: seriNumber,
      nomorKontiner: nomor,
      kodeUkuranKontainer: ukuran,
      kodeJenisKontainer: jenis,
      kodeTipeKontainer: jenis,
    };

    updateDocumentData({
      kontainer: [...data.kontainer, newKontainerItem],
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

          {/* Nomor Kontainer */}
          <InputNormal
            title="Nomor"
            value={nomor}
            onChange={(value) => setNomor(value)}
          />

          {/* Ukuran Kontainer */}
          <InputSelect
            label="Ukuran"
            options={ukuranKontainerOptions}
            value={ukuran}
            onChange={(value) => setUkuran(value)}
          />

          {/* Jenis Muatan */}
          <InputSelect
            label="Jenis Muatan"
            options={jenisMuatanOptions}
            value={jenis}
            onChange={(value) => setJenis(value)}
          />

          {/* Tipe Kontainer */}
          <InputSelect
            label="Tipe"
            options={tipeKontainerOptions}
            value={tipe}
            onChange={(value) => setTipe(value)}
          />
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={() => onCloseModal()}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSimpan}
            disabled={!nomor || !ukuran || !jenis || !tipe}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

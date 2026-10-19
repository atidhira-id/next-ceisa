"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KemasanItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { jenisKemasanOptions } from "@/lib/options";

type ModalAddKemasanItemProps = {
  onCloseModal: () => void;
};

export default function ModalAddKemasanItem({
  onCloseModal,
}: ModalAddKemasanItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const seriNumber = data.listKemasan.length + 1;
  const [jumlah, setJumlah] = useState(0);
  const [jenis, setJenis] = useState("");
  const [merek, setMerek] = useState("");

  function handleSimpan() {
    const newKemasanItem: KemasanItemData = {
      seri: seriNumber,
      jumlahKemasan: jumlah,
      kodeKemasan: jenis,
      merek: merek,
    };

    updateDocumentData({
      listKemasan: [...data.listKemasan, newKemasanItem],
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

          {/* Jumlah Kemasan */}
          <InputNormal
            title="Jumlah"
            value={String(jumlah)}
            onChange={(value) => setJumlah(Number(value))}
          />

          {/* Jenis Kemasan */}
          <InputSelect
            label="Jenis"
            options={jenisKemasanOptions}
            value={jenis}
            onChange={(value) => setJenis(value)}
          />

          {/* Merek */}
          <InputNormal
            title="Merek"
            value={merek}
            onChange={(value) => setMerek(value)}
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
            disabled={!jumlah || !jenis || !merek}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

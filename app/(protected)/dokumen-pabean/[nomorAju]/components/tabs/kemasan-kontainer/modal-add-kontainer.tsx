"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KontainerItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/app/constants/kemas-kontainer-options";
import { kontainerName, required } from "@/lib/validation";

type ModalAddKontainerItemProps = {
  kontainer?: KontainerItemData;
  onCloseModal: () => void;
};

export default function ModalAddKontainerItem({
  kontainer,
  onCloseModal,
}: ModalAddKontainerItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seri =
    kontainer?.seri ??
    Math.max(0, ...data.listKontainer.map((item) => item.seri)) + 1;
  const [nomor, setNomor] = useState(kontainer?.nomorKontiner ?? "");
  const [ukuran, setUkuran] = useState(kontainer?.kodeUkuranKontainer ?? "");
  const [jenis, setJenis] = useState(kontainer?.kodeJenisKontainer ?? "");
  const [tipe, setTipe] = useState(kontainer?.kodeTipeKontainer ?? "");

  function handleSimpan() {
    const newKontainerItem: KontainerItemData = {
      seri: seri,
      nomorKontiner: nomor,
      kodeUkuranKontainer: ukuran,
      kodeJenisKontainer: jenis,
      kodeTipeKontainer: tipe,
    };

    const listKontainer = kontainer
      ? data.listKontainer.map((item) =>
          item.seri === kontainer.seri ? newKontainerItem : item,
        )
      : [...data.listKontainer, newKontainerItem];

    updateDocumentData({
      listKontainer,
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
          <InputNormal title="Seri" value={seri.toString()} disabled />

          {/* Nomor Kontainer */}
          <InputNormal
            title="Nomor"
            value={nomor}
            onChange={(value) => setNomor(value)}
            rules={[required(), kontainerName()]}
          />

          {/* Ukuran Kontainer */}
          <InputSelect
            label="Ukuran"
            options={ukuranKontainerOptions}
            value={ukuran}
            onChange={(value) => setUkuran(value)}
            rules={[required()]}
          />

          {/* Jenis Muatan */}
          <InputSelect
            label="Jenis Muatan"
            options={jenisMuatanOptions}
            value={jenis}
            onChange={(value) => setJenis(value)}
            rules={[required()]}
          />

          {/* Tipe Kontainer */}
          <InputSelect
            label="Tipe"
            options={tipeKontainerOptions}
            value={tipe}
            onChange={(value) => setTipe(value)}
            rules={[required()]}
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

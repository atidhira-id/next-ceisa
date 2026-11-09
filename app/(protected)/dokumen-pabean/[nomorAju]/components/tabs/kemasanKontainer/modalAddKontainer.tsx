"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KontainerItemData } from "@/app/types";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import {
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/app/constants/options/kemasKontainerOptions";
import { kontainerName, required } from "@/lib/validation";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

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
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Tambah Kontainer</h2>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Seri */}
          <InputNormal title="Seri" value={seri.toString()} disabled />

          {/* Nomor Kontainer */}
          <InputNormal
            title="Nomor"
            maxLength={11}
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

        <div className="flex justify-end gap-3 px-6 py-4">
          <NormalButton variant={"inverted"} onClick={() => onCloseModal()}>
            Batal
          </NormalButton>

          <NormalButton
            disabled={!nomor || !ukuran || !jenis || !tipe}
            onClick={handleSimpan}
          >
            Simpan
          </NormalButton>
        </div>
      </div>
    </div>
  );
}

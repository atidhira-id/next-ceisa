"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KontainerItemData } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import {
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/app/constants/options/kemasKontainerOptions";
import { kontainerName, required } from "@/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

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
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader
        title="Tambah Kontainer"
        onCloseModal={onCloseModal}
      ></ModalHeader>

      <ModalContent>
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
      </ModalContent>
      <ModalFooter
        textYes="Simpan"
        disabled={!nomor || !ukuran || !jenis || !tipe}
        handleYes={handleSimpan}
        handleNo={onCloseModal}
      />
    </ModalWrapper>
  );
}

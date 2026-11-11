"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KemasanItemData } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputNumber from "@/app/components/inputs/input-number";
import { jenisKemasanOptions } from "@/app/constants/options/kemasKontainerOptions";
import { required, min } from "@/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

type ModalAddKemasanItemProps = {
  kemasan?: KemasanItemData;
  onCloseModal: () => void;
};

export default function ModalAddKemasanItem({
  kemasan,
  onCloseModal,
}: ModalAddKemasanItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seri =
    kemasan?.seri ??
    Math.max(0, ...data.listKemasan.map((item) => item.seri)) + 1;
  const [jumlah, setJumlah] = useState(kemasan?.jumlahKemasan ?? 0);
  const [jenis, setJenis] = useState(kemasan?.kodeKemasan ?? "");
  const [merek, setMerek] = useState(kemasan?.merek ?? "");

  function handleSimpan() {
    const newKemasanItem: KemasanItemData = {
      seri: seri,
      jumlahKemasan: jumlah,
      kodeKemasan: jenis,
      merek: merek,
    };

    const listKemasan = kemasan
      ? data.listKemasan.map((item) =>
          item.seri === kemasan.seri ? newKemasanItem : item,
        )
      : [...data.listKemasan, newKemasanItem];

    updateDocumentData({ listKemasan });

    onCloseModal();
  }

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader title="Tambah Kemasan" onCloseModal={onCloseModal} />
      <ModalContent>
        {/* Seri */}
        <InputNormal title="Seri" value={seri.toString()} disabled />

        {/* Jumlah Kemasan */}
        <InputNumber
          title="Jumlah"
          value={jumlah}
          onChange={(value) => setJumlah(Number(value))}
          rules={[min(1)]}
        />

        {/* Jenis Kemasan */}
        <InputSelect
          label="Jenis"
          options={jenisKemasanOptions}
          value={jenis}
          onChange={(value) => setJenis(value)}
          rules={[required()]}
        />

        {/* Merek */}
        <InputNormal
          title="Merek"
          value={merek}
          onChange={(value) => setMerek(value)}
          rules={[required()]}
        />
      </ModalContent>

      <ModalFooter
        textYes="Simpan"
        disabled={!jumlah || !jenis || !merek}
        handleYes={handleSimpan}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

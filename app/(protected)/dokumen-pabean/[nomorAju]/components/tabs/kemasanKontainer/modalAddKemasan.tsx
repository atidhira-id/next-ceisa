"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type KemasanItemData } from "@/app/types";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import InputNumber from "../../inputs/input-number";
import { jenisKemasanOptions } from "@/app/constants/options/kemasKontainerOptions";
import { required, min } from "@/lib/validation";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Tambah Kemasan</h2>
        </div>

        <div className="space-y-5 px-6 py-5">
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
        </div>

        <div className="flex justify-end gap-3 px-6 py-4">
          <NormalButton variant={"inverted"} onClick={() => onCloseModal()}>
            Batal
          </NormalButton>
          <NormalButton
            disabled={!jumlah || !jenis || !merek}
            onClick={handleSimpan}
          >
            Simpan
          </NormalButton>
        </div>
      </div>
    </div>
  );
}

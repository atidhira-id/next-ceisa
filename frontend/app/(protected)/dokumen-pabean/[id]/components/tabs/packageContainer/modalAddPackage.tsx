"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { type PackageItemType } from "@/app/types";
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

type ModalAddPackageProps = {
  pack?: PackageItemType;
  onCloseModal: () => void;
};

export default function ModalAddPackage({
  pack,
  onCloseModal,
}: ModalAddPackageProps) {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;

  const series =
    pack?.series ??
    Math.max(0, ...data.packages.map((item) => item.series)) + 1;
  const [quantity, setQuantity] = useState(pack?.quantity ?? 0);
  const [packageCode, setPackageCode] = useState(pack?.packageCode ?? "");
  const [brand, setBrand] = useState(pack?.brand ?? "");

  function handleSave() {
    const newPackage: PackageItemType = {
      series,
      quantity,
      packageCode,
      brand,
    };

    const packageList = pack
      ? data.packages.map((item) =>
          item.series === pack.series ? newPackage : item,
        )
      : [...data.packages, newPackage];

    updateDocumentData({ packages: packageList });

    onCloseModal();
  }

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader title="Tambah Kemasan" onCloseModal={onCloseModal} />
      <ModalContent>
        {/* Seri */}
        <InputNormal title="Seri" value={series.toString()} disabled />

        {/* Jumlah Kemasan */}
        <InputNumber
          title="Jumlah"
          value={quantity}
          onChange={(value) => setQuantity(Number(value))}
          rules={[min(1)]}
        />

        {/* Jenis Kemasan */}
        <InputSelect
          label="Jenis"
          options={jenisKemasanOptions}
          value={packageCode}
          onChange={(value) => setPackageCode(value)}
          rules={[required()]}
        />

        {/* Merek */}
        <InputNormal
          title="Merek"
          value={brand}
          onChange={(value) => setBrand(value)}
          rules={[required()]}
        />
      </ModalContent>

      <ModalFooter
        textYes="Simpan"
        disabled={!quantity || !packageCode || !brand}
        handleYes={handleSave}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

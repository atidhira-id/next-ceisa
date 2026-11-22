"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { useSaveDraftItem } from "@/app/hooks/useSaveSectionItem";
import { type PackageItemType } from "@/app/types/draft";
import { required, min } from "@/app/lib/validation";

import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputNumber from "@/app/components/inputs/input-number";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

const initialPackage: PackageItemType = {
  series: 1,
  packageCode: "",
  quantity: 1,
  brand: "",
  sealNumber: undefined,
};

type ModalAddPackageProps = {
  pack?: PackageItemType;
  onCloseModal: () => void;
};

export default function ModalAddPackage({
  pack,
  onCloseModal,
}: ModalAddPackageProps) {
  const { draft, updateDraftData } = useDraft();
  const data = draft!;
  const packages = data.packages;

  const { handleSave, isSaving, validationErrors } =
    useSaveDraftItem<PackageItemType>({
      draftId: draft!.id,
      section: "packages",
      items: packages,
      onUpdate: (updatedPackages) => {
        updateDraftData({ packages: updatedPackages });
      },
      onClose: onCloseModal,
    });

  const packageTypes = useOptions("PACKAGE_TYPE");

  const series =
    pack?.series ??
    Math.max(0, ...data.packages.map((item) => item.series)) + 1;
  const [newPackage, setNewPackage] = useState<PackageItemType>(
    pack ?? { ...initialPackage, series: series },
  );

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader title="Tambah Kemasan" onCloseModal={onCloseModal} />
      <ModalContent>
        {/* Seri */}
        <InputNormal
          title="Seri"
          value={newPackage.series.toString()}
          disabled
        />

        {/* Jumlah Kemasan */}
        <InputNumber
          title="Jumlah"
          value={newPackage.quantity}
          onChange={(value) =>
            setNewPackage({ ...newPackage, quantity: value })
          }
          rules={[min(1)]}
        />

        {/* Jenis Kemasan */}
        <InputSelect
          label="Jenis"
          options={packageTypes.options}
          value={newPackage.packageCode}
          onChange={(value) =>
            setNewPackage({ ...newPackage, packageCode: value })
          }
          rules={[required()]}
        />

        {/* Merek */}
        <InputNormal
          title="Merek"
          value={newPackage.brand}
          onChange={(value) => setNewPackage({ ...newPackage, brand: value })}
          rules={[required()]}
        />

        {validationErrors.length > 0 && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {validationErrors.map((error, index) => (
              <p key={index}>
                {error.path.length > 0 ? `${error.path.join(".")}: ` : ""}
                {error.message}
              </p>
            ))}
          </div>
        )}
      </ModalContent>

      <ModalFooter
        textYes={isSaving ? "Menyimpan..." : "Simpan"}
        disabled={
          !newPackage.quantity ||
          !newPackage.packageCode ||
          !newPackage.brand ||
          isSaving
        }
        handleYes={() => handleSave(newPackage)}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

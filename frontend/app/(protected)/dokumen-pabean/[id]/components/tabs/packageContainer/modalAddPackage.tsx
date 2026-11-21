"use client";
import { useState } from "react";
import { useOptions } from "@/app/hooks/useOptions";
import { useDraft } from "@/app/providers/draftProvider";
import { saveDraft, validateItem } from "@/app/services/draft.service";
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

  const packageTypes = useOptions("PACKAGE_TYPE");

  const series =
    pack?.series ??
    Math.max(0, ...data.packages.map((item) => item.series)) + 1;
  const [newPackage, setNewPackage] = useState<PackageItemType>(
    pack ?? { ...initialPackage, series: series },
  );

  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    { field: string; message: string }[]
  >([]);

  async function handleSave() {
    try {
      setIsValidating(true);
      setValidationErrors([]);

      const result = await validateItem("package", newPackage);
      if (!result.valid) {
        setValidationErrors(result.errors);
        return;
      }

      const packageList = pack
        ? packages.map((item) => (item.series === series ? newPackage : item))
        : [...packages, newPackage];

      await saveDraft(draft!.id, "packages", packageList);

      updateDraftData({ packages: packageList });

      onCloseModal();
    } catch (error) {
      setValidationErrors([
        {
          field: "",
          message:
            error instanceof Error
              ? error.message
              : "Gagal memvalidasi package.",
        },
      ]);
    } finally {
      setIsValidating(false);
    }
  }

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
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
      </ModalContent>

      <ModalFooter
        textYes={isValidating ? "Memvalidasi..." : "Simpan"}
        disabled={
          !newPackage.quantity ||
          !newPackage.packageCode ||
          !newPackage.brand ||
          isValidating
        }
        handleYes={handleSave}
        handleNo={onCloseModal}
      ></ModalFooter>
    </ModalWrapper>
  );
}

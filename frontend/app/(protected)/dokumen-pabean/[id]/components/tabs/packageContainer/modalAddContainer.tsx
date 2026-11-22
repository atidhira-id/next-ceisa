"use client";
import { useState } from "react";
import { useOptions } from "@/app/hooks/useOptions";
import { useDraft } from "@/app/providers/draftProvider";
import { type ContainerItemType } from "@/app/types/draft";
import { kontainerName, required } from "@/app/lib/validation";

import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";
import { useSaveDraftItem } from "@/app/hooks/useSaveSectionItem";

const initialContainer: ContainerItemType = {
  series: 1,
  containerNumber: "",
  containerCategoryCode: "",
  containerSizeCode: "",
  containerTypeCode: "",
};

type ModalAddContainerProps = {
  container?: ContainerItemType;
  onCloseModal: () => void;
};

export default function ModalAddContainer({
  container,
  onCloseModal,
}: ModalAddContainerProps) {
  const { draft, updateDraftData } = useDraft();
  const data = draft!;
  const containers = data.containers;

  const { handleSave, isSaving, validationErrors } =
    useSaveDraftItem<ContainerItemType>({
      draftId: draft!.id,
      section: "containers",
      items: containers,
      onUpdate: (updatedContainers) => {
        updateDraftData({ containers: updatedContainers });
      },
      onClose: onCloseModal,
    });

  const containerTypes = useOptions("CONTAINER_TYPE");
  const containerSizes = useOptions("CONTAINER_SIZE");
  const cargoTypes = useOptions("CARGO_TYPE");

  const series =
    container?.series ??
    Math.max(0, ...data.containers.map((item) => item.series)) + 1;
  const [newContainer, setNewContainer] = useState<ContainerItemType>(
    container ?? { ...initialContainer, series: series },
  );

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader
        title="Tambah Kontainer"
        onCloseModal={onCloseModal}
      ></ModalHeader>

      <ModalContent>
        {/* Seri */}
        <InputNormal
          title="Seri"
          value={newContainer.series.toString()}
          disabled
        />

        {/* Nomor Kontainer */}
        <InputNormal
          title="Nomor"
          maxLength={11}
          value={newContainer.containerNumber}
          onChange={(value) =>
            setNewContainer({ ...newContainer, containerNumber: value })
          }
          rules={[required(), kontainerName()]}
        />

        {/* Ukuran Kontainer */}
        <InputSelect
          label="Ukuran"
          options={containerSizes.options}
          value={newContainer.containerSizeCode}
          onChange={(value) =>
            setNewContainer({ ...newContainer, containerSizeCode: value })
          }
          rules={[required()]}
        />

        {/* Jenis Muatan */}
        <InputSelect
          label="Jenis Muatan"
          options={cargoTypes.options}
          value={newContainer.containerCategoryCode}
          onChange={(value) =>
            setNewContainer({ ...newContainer, containerCategoryCode: value })
          }
          rules={[required()]}
        />

        {/* Tipe Kontainer */}
        <InputSelect
          label="Tipe"
          options={containerTypes.options}
          value={newContainer.containerTypeCode}
          onChange={(value) =>
            setNewContainer({ ...newContainer, containerTypeCode: value })
          }
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
          !newContainer.containerNumber ||
          !newContainer.containerSizeCode ||
          !newContainer.containerCategoryCode ||
          !newContainer.containerTypeCode ||
          isSaving
        }
        handleYes={() => handleSave(newContainer)}
        handleNo={onCloseModal}
      />
    </ModalWrapper>
  );
}

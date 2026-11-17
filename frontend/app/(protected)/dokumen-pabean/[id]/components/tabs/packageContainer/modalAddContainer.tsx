"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { type ContainerItemType } from "@/app/types";
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

type ModalAddContainerProps = {
  container?: ContainerItemType;
  onCloseModal: () => void;
};

export default function ModalAddContainer({
  container,
  onCloseModal,
}: ModalAddContainerProps) {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;

  const series =
    container?.series ??
    Math.max(0, ...data.containers.map((item) => item.series)) + 1;
  const [containerNumber, setContainerNumber] = useState(
    container?.containerNumber ?? "",
  );
  const [containerSizeCode, setContainerSizeCode] = useState(
    container?.containerSizeCode ?? "",
  );
  const [containerCategoryCode, setContainerCategoryCode] = useState(
    container?.containerCategoryCode ?? "",
  );
  const [containerTypeCode, setContainerTypeCode] = useState(
    container?.containerTypeCode ?? "",
  );

  function handleSave() {
    const newContainer: ContainerItemType = {
      series,
      containerNumber,
      containerSizeCode,
      containerCategoryCode,
      containerTypeCode,
    };

    const containerList = container
      ? data.containers.map((item) =>
          item.series === container.series ? newContainer : item,
        )
      : [...data.containers, newContainer];

    updateDocumentData({
      containers: containerList,
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
        <InputNormal title="Seri" value={series.toString()} disabled />

        {/* Nomor Kontainer */}
        <InputNormal
          title="Nomor"
          maxLength={11}
          value={containerNumber}
          onChange={(value) => setContainerNumber(value)}
          rules={[required(), kontainerName()]}
        />

        {/* Ukuran Kontainer */}
        <InputSelect
          label="Ukuran"
          options={ukuranKontainerOptions}
          value={containerSizeCode}
          onChange={(value) => setContainerSizeCode(value)}
          rules={[required()]}
        />

        {/* Jenis Muatan */}
        <InputSelect
          label="Jenis Muatan"
          options={jenisMuatanOptions}
          value={containerCategoryCode}
          onChange={(value) => setContainerCategoryCode(value)}
          rules={[required()]}
        />

        {/* Tipe Kontainer */}
        <InputSelect
          label="Tipe"
          options={tipeKontainerOptions}
          value={containerTypeCode}
          onChange={(value) => setContainerTypeCode(value)}
          rules={[required()]}
        />
      </ModalContent>
      <ModalFooter
        textYes="Simpan"
        disabled={
          !containerNumber ||
          !containerSizeCode ||
          !containerCategoryCode ||
          !containerTypeCode
        }
        handleYes={handleSave}
        handleNo={onCloseModal}
      />
    </ModalWrapper>
  );
}

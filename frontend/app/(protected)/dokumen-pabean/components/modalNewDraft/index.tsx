"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import InputSelect from "../../../../components/inputs/input-select";
import { required } from "@/app/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";
import { createNewDraft } from "./modalNewDraftActions";
import { useOptions } from "@/app/hooks/useOptions";

type ModalNewDraftProps = {
  onCloseModal: () => void;
};

export default function ModalNewDraft({ onCloseModal }: ModalNewDraftProps) {
  const router = useRouter();
  const { setDraftData } = useDraft();

  const [entity, setEntity] = useState("");
  const [documentCode, setDocumentCode] = useState("");

  const entities = useOptions("DRAFT_ENTITY");
  const documentTypes = useOptions("DRAFT_DOCUMENT_TYPE");

  async function handleCreateDraft() {
    if (!entity || !documentCode) {
      return;
    }

    try {
      const initialDocumentData = await createNewDraft(entity, documentCode);
      setDraftData(initialDocumentData);

      onCloseModal();

      router.push(
        `/dokumen-pabean/${encodeURIComponent(initialDocumentData.id)}`,
      );
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat membuat dokumen.",
      );
    }
  }

  return (
    <>
      <ModalWrapper className="w-full max-w-md">
        <ModalHeader title="Tambah Dokumen" onCloseModal={onCloseModal}>
          <p className="mt-1 text-sm text-gray-500">
            Pilih entitas dan jenis dokumen yang akan dibuat.
          </p>
        </ModalHeader>

        <ModalContent>
          <InputSelect
            label="Entitas"
            value={entity}
            options={entities.options}
            onChange={(value) => setEntity(value)}
            rules={[required()]}
          />
          <InputSelect
            label="Jenis Dokumen"
            value={documentCode}
            options={documentTypes.options}
            onChange={(value) => setDocumentCode(value)}
            rules={[required()]}
          />
        </ModalContent>

        <ModalFooter
          disabled={!entity || !documentCode}
          textYes="Simpan"
          handleYes={handleCreateDraft}
          handleNo={onCloseModal}
        />
      </ModalWrapper>
    </>
  );
}

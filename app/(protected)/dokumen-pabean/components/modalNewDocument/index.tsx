"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import {
  entitasOptions,
  jenisDokumenOptions,
} from "@/app/constants/options/newDocumentOptions";
import InputSelect from "../../../../components/inputs/input-select";
import { required } from "@/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";
import { createDocument } from "./createDocument";

type ModalNewDocumentProps = {
  onCloseModal: () => void;
};

export default function ModalNewDocument({
  onCloseModal,
}: ModalNewDocumentProps) {
  const router = useRouter();
  const { setDocumentData } = useDocument();

  const [entitas, setEntitas] = useState("");
  const [kodeDokumen, setKodeDokumen] = useState("");

  async function handleContinue() {
    if (!entitas || !kodeDokumen) {
      return;
    }

    try {
      // Create new document
      const initialDocumentData = await createDocument(entitas, kodeDokumen);

      // Update state client
      setDocumentData(initialDocumentData);

      // Close modal and redirect to [nomorAju] page
      onCloseModal();
      router.push(
        `/dokumen-pabean/${encodeURIComponent(initialDocumentData.nomorAju)}`,
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
            value={entitas}
            options={entitasOptions}
            onChange={(value) => setEntitas(value)}
            rules={[required()]}
          />
          <InputSelect
            label="Jenis Dokumen"
            value={kodeDokumen}
            options={jenisDokumenOptions}
            onChange={(value) => setKodeDokumen(value)}
            rules={[required()]}
          />
        </ModalContent>

        <ModalFooter
          disabled={!entitas || !kodeDokumen}
          textYes="Simpan"
          handleYes={handleContinue}
          handleNo={onCloseModal}
        />
      </ModalWrapper>
    </>
  );
}

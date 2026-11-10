"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import {
  entitasOptions,
  jenisDokumenOptions,
} from "@/app/constants/options/newDocumentOptions";
import { FormInputs } from "@/app/types";
import { generateNewDocument } from "@/app/constants/newDocument";
import InputSelect from "../[nomorAju]/components/inputs/input-select";
import { required } from "@/lib/validation";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

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
      // Get nomorAju from server
      const response = await fetch("/api/documents/generate-nomor-aju", {
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Gagal membuat nomor AJU.");
      }

      const nomorAju: string = result.nomorAju;
      if (typeof nomorAju !== "string" || nomorAju.length !== 26) {
        throw new Error("Format nomor AJU yang diterima tidak valid.");
      }

      const initialDocumentData: FormInputs = generateNewDocument(
        nomorAju,
        entitas,
        kodeDokumen,
      );

      // Save initial draft into Neon
      const saveResponse = await fetch("/api/documents/drafts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...initialDocumentData,
        }),
      });

      const saveResult = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(
          saveResult.message ?? "Gagal menyimpan draft ke database.",
        );
      }

      // Update state client
      setDocumentData(initialDocumentData);

      // Close modal and redirect to [nomorAju] page
      onCloseModal();
      router.push(`/dokumen-pabean/${encodeURIComponent(nomorAju)}`);
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

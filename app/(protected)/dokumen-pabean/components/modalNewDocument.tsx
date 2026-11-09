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
import { NormalButton } from "./buttons";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold">Tambah Dokumen</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pilih entitas dan jenis dokumen yang akan dibuat.
            </p>
          </div>

          <div className="space-y-8 px-6 pt-3 pb-8">
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
          </div>

          <div className="flex justify-end gap-3 px-6 py-4">
            <NormalButton variant={"inverted"} onClick={onCloseModal}>
              Batal
            </NormalButton>

            <NormalButton
              disabled={!entitas || !kodeDokumen}
              onClick={handleContinue}
            >
              OK
            </NormalButton>
          </div>
        </div>
      </div>
    </>
  );
}

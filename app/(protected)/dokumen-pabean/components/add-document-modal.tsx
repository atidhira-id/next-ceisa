"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { entitasOptions, jenisDokumenOptions } from "@/lib/options";

type AddDocumentModalProps = {
  onCloseModal: () => void;
};

export default function AddDocumentModal({
  onCloseModal,
}: AddDocumentModalProps) {
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

      const initialDocumentData = {
        nomorAju,
        kodeDokumen,
        jenisEntitas: entitas,
        header: {},
        entitas1: {
          nomorAju: nomorAju,
          seri: "1",
          kodeEntitas: "1",
          kodeNegara: "ID",
        },
        entitas7: {
          nomorAju: nomorAju,
          seri: "7",
          kodeEntitas: "7",
          kodeNegara: "ID",
        },
        entitas9: { nomorAju: nomorAju, seri: "9", kodeEntitas: "9" },
        entitas10: { nomorAju: nomorAju, seri: "10", kodeEntitas: "10" },
        entitas11: {
          nomorAju: nomorAju,
          seri: "11",
          kodeEntitas: "11",
          kodeNegara: "ID",
        },
        dokumen: [],
        pengangkut: {},
        kemasan: [],
        kontainer: [],
      };

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
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Tambah Dokumen</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pilih entitas dan jenis dokumen yang akan dibuat.
            </p>
          </div>

          <div className="space-y-5 px-6 py-5">
            {/* Entitas */}
            <div>
              <label
                htmlFor="entity"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Entitas
              </label>

              <select
                id="entity"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                value={entitas}
                onChange={(e) => setEntitas(e.target.value)}
              >
                <option value="" disabled>
                  Pilih entitas
                </option>
                {entitasOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Jenis Dokumen */}
            <div>
              <label
                htmlFor="documentType"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Jenis Dokumen
              </label>

              <select
                id="documentType"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                value={kodeDokumen}
                onChange={(e) => setKodeDokumen(e.target.value)}
              >
                <option value="" disabled>
                  Pilih jenis dokumen
                </option>
                {jenisDokumenOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!entitas || !kodeDokumen}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

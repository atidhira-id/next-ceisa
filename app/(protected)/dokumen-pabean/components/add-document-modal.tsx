"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDocument } from "@/app/providers/document-provider";

function generateNomorAju() {
  return Array.from({ length: 18 }, () => Math.floor(Math.random() * 10)).join(
    "",
  );
}

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

  function handleContinue() {
    if (!entitas || !kodeDokumen) {
      return;
    }

    const nomorAju = generateNomorAju();

    setDocumentData({
      nomorAju,
      entitas,
      kodeDokumen,
      entity: {},
      document: {},
      transport: {},
      package: {},
      transaction: {},
      goods: {},
      levy: {},
      statement: {},
    });

    router.push(`/dokumen-pabean/${nomorAju}`);
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
                <option value="importir">Importir</option>
                <option value="eksportir">Eksportir</option>
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
                <option value="20">BC 2.0</option>
                <option value="24">BC 2.4</option>
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

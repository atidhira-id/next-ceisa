"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import type { BarangItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { kodeHSOption } from "@/lib/options";
import { required } from "@/lib/validation";

const initialBarangData: BarangItemData = {};

type ModalAddBarangProps = {
  onCloseModal: () => void;
};

export default function ModalAddBarang({ onCloseModal }: ModalAddBarangProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seriNumber = data.listBarang.length + 1;
  const [newBarang, setNewBarang] = useState(initialBarangData);

  function updateData(field: keyof BarangItemData, value: number | string) {
    setNewBarang({ ...newBarang, [field]: value });
  }

  function handleSimpan() {
    updateDocumentData({
      listBarang: [
        ...data.listBarang,
        { ...newBarang, seriBarang: seriNumber },
      ],
    });

    onCloseModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-7xl h-full max-h-225 flex flex-col rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Dokumen Lampiran</h2>
        </div>

        <div className="grow space-y-5 px-6 py-5 overflow-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              {/* Seri */}
              <InputNormal
                labelPosition="left"
                title="Seri"
                value={seriNumber.toString()}
                disabled
              />
              {/* Pos Tarif/HS */}
              <InputSelect
                labelPosition="left"
                label="Pos Tarif/HS"
                options={kodeHSOption}
                value={newBarang.hs ?? ""}
                onChange={(value) => updateData("hs", value)}
                rules={[required()]}
              />
              <p>TODO :Lartas</p>
              <p>Barang Kena Cukai</p>
            </div>
            {/* Column 2 */}
            <div>
              <p>KOLOM 2</p>
            </div>
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
            onClick={handleSimpan}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

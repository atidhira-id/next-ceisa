"use client";

import { type DocumentData } from "@/app/providers/document-provider";
import FormWrapper from "../form-wrapper";

type HeaderTabProps = {
  data: DocumentData;
  onChange: (data: DocumentData) => void;
};

export function HeaderTab({ data, onChange }: HeaderTabProps) {
  function updateField(field: keyof DocumentData, value: string) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Pengajuan */}
        <FormWrapper title="Pengajuan">
          <div>
            <label
              htmlFor="nomorAju"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nomor Aju
            </label>

            <input
              id="nomorAju"
              type="text"
              value={data.nomorAju}
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 outline-none"
            />
          </div>
        </FormWrapper>

        {/* Kantor Pabean */}
        <FormWrapper title="Kantor Pabean">
          <div>
            <label
              htmlFor="pelabuhanTujuan"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Pelabuhan Tujuan
            </label>

            <input
              id="pelabuhanTujuan"
              type="text"
              value={data.pelabuhanTujuan ?? ""}
              onChange={(event) =>
                updateField("pelabuhanTujuan", event.target.value)
              }
              placeholder="Masukkan pelabuhan tujuan"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="kantorPabean"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kantor Pabean
            </label>

            <input
              id="kantorPabean"
              type="text"
              value={data.kantorPabean ?? ""}
              onChange={(event) =>
                updateField("kantorPabean", event.target.value)
              }
              placeholder="Masukkan kantor pabean"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </FormWrapper>

        {/* Keterangan Lain */}
        <FormWrapper title="Keterangan Lain">
          <div>
            <label
              htmlFor="jenisPIB"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Jenis PIB
            </label>

            <input
              id="jenisPIB"
              type="text"
              value={data.jenisPIB ?? ""}
              onChange={(event) => updateField("jenisPIB", event.target.value)}
              placeholder="Masukkan jenis PIB"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="jenisImport"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Jenis Import
            </label>

            <input
              id="jenisImport"
              type="text"
              value={data.jenisImport ?? ""}
              onChange={(event) =>
                updateField("jenisImport", event.target.value)
              }
              placeholder="Masukkan jenis import"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="caraPembayaran"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Cara Pembayaran
            </label>

            <input
              id="caraPembayaran"
              type="text"
              value={data.caraPembayaran ?? ""}
              onChange={(event) =>
                updateField("caraPembayaran", event.target.value)
              }
              placeholder="Masukkan cara pembayaran"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}

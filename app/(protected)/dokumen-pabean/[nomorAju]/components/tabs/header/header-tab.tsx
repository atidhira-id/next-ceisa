"use client";

import { type DocumentData } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputSelect from "../../input-select";
import {
  pelabuhanTujuanOptions,
  kantorPabeanOptions,
  jenisPIBOptions,
  jenisImportOptions,
  caraPembayaranOptions,
} from "./options";

type HeaderTabProps = {
  data: DocumentData;
  onChange: (data: DocumentData) => void;
};

export function HeaderTab({ data, onChange }: HeaderTabProps) {
  function updateHeader(field: keyof DocumentData["header"], value: string) {
    onChange({
      ...data,
      header: {
        ...data.header,
        [field]: value,
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Pengajuan */}
        <InputWrapper title="Pengajuan">
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
        </InputWrapper>

        {/* Kantor Pabean */}
        <InputWrapper title="Kantor Pabean">
          <InputSelect
            label="Pelabuhan Tujuan"
            value={data.header?.kodePelabuhanTujuan ?? ""}
            options={pelabuhanTujuanOptions}
            onChange={(value) => updateHeader("kodePelabuhanTujuan", value)}
          />
          <InputSelect
            label="Kantor Pabean"
            value={data.header.kodeKantor ?? ""}
            options={kantorPabeanOptions}
            onChange={(value) => updateHeader("kodeKantor", value)}
          />
        </InputWrapper>

        {/* Keterangan Lain */}
        <InputWrapper title="Keterangan Lain">
          <InputSelect
            label="Jenis PIB"
            value={data.header.kodeJenisImpor ?? ""}
            options={jenisPIBOptions}
            onChange={(value) => updateHeader("kodeJenisImpor", value)}
          />
          <InputSelect
            label="Jenis Import"
            value={data.header.kodeJenisProsedur ?? ""}
            options={jenisImportOptions}
            onChange={(value) => updateHeader("kodeJenisProsedur", value)}
          />
          <InputSelect
            label="Cara Pembayaran"
            value={data.header.kodeCaraBayar ?? ""}
            options={caraPembayaranOptions}
            onChange={(value) => updateHeader("kodeCaraBayar", value)}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

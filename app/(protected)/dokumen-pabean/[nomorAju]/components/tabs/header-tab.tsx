"use client";

import { type DocumentData } from "@/app/providers/document-provider";
import FormWrapper from "../form-wrapper";
import InputSelect from "../input-select";

const pelabuhanTujuanOptions = [
  { value: "IDTTP", label: "IDTTP - Tanjung Priok" },
  { value: "IDSAN", label: "IDSAN - Bangkalan" },
  { value: "IDSBA", label: "IDSBA - Bayah" },
  { value: "IDSBO", label: "IDSBO - Bondowoso" },
];

const kantorPabeanOptions = [
  { value: "IDJKT", label: "IDJKT - Jakarta" },
  { value: "IDSBY", label: "IDSBY - Surabaya" },
  { value: "IDBDO", label: "IDBDO - Bandung" },
  { value: "IDMLG", label: "IDMLG - Malang" },
];

const jenisPIBOptions = [
  { value: "Biasa", label: "1 - Biasa" },
  { value: "Berkala", label: "2 - Berkala" },
];

const jenisImportOptions = [
  { value: "Untuk Dipakai", label: "1 - Untuk Dipakai" },
  { value: "Sementara", label: "2 - Sementara" },
  { value: "Rush Handling", label: "3 - Rush Handling" },
];

const caraPembayaranOptions = [
  { value: "Tunai", label: "1 - Tunai" },
  { value: "Kredit", label: "2 - Kredit" },
];

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
          <InputSelect
            label="Pelabuhan Tujuan"
            value={data.pelabuhanTujuan ?? ""}
            options={pelabuhanTujuanOptions}
            onChange={(value) => updateField("pelabuhanTujuan", value)}
          />
          <InputSelect
            label="Kantor Pabean"
            value={data.kantorPabean ?? ""}
            options={kantorPabeanOptions}
            onChange={(value) => updateField("kantorPabean", value)}
          />
        </FormWrapper>

        {/* Keterangan Lain */}
        <FormWrapper title="Keterangan Lain">
          <InputSelect
            label="Jenis PIB"
            value={data.jenisPIB ?? ""}
            options={jenisPIBOptions}
            onChange={(value) => updateField("jenisPIB", value)}
          />
          <InputSelect
            label="Jenis Import"
            value={data.jenisImport ?? ""}
            options={jenisImportOptions}
            onChange={(value) => updateField("jenisImport", value)}
          />
          <InputSelect
            label="Cara Pembayaran"
            value={data.caraPembayaran ?? ""}
            options={caraPembayaranOptions}
            onChange={(value) => updateField("caraPembayaran", value)}
          />
        </FormWrapper>
      </div>
    </div>
  );
}

"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import {
  pelabuhanOptions,
  kantorPabeanOptions,
  jenisPIBOptions,
  jenisImportOptions,
  caraPembayaranOptions,
} from "@/app/constants/options/headerOptions";
import { required } from "@/lib/validation";
import { HeaderType } from "@/app/types";

export default function HeaderTab() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const header = data.header;

  function updateHeader(field: keyof HeaderType, value: string) {
    updateDraftData({ header: { ...header, [field]: value } });
    markSectionDirty("header");
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
              value={data.ajuNumber}
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 outline-none"
            />
          </div>
        </InputWrapper>

        {/* Kantor Pabean */}
        <InputWrapper title="Kantor Pabean">
          <InputSelect
            label="Pelabuhan Tujuan"
            value={header.destinationPortCode ?? ""}
            options={pelabuhanOptions}
            onChange={(value) => updateHeader("destinationPortCode", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Kantor Pabean"
            value={header.customsOfficeCode ?? ""}
            options={kantorPabeanOptions}
            onChange={(value) => updateHeader("customsOfficeCode", value)}
            rules={[required()]}
          />
        </InputWrapper>

        {/* Keterangan Lain */}
        <InputWrapper title="Keterangan Lain">
          <InputSelect
            label="Jenis PIB"
            value={header.pibType ?? ""}
            options={jenisPIBOptions}
            onChange={(value) => updateHeader("pibType", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Jenis Import"
            value={header.importTypeCode ?? ""}
            options={jenisImportOptions}
            onChange={(value) => updateHeader("importTypeCode", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Cara Pembayaran"
            value={header.paymentMethodCode ?? ""}
            options={caraPembayaranOptions}
            onChange={(value) => updateHeader("paymentMethodCode", value)}
            rules={[required()]}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

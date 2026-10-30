"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputSelect from "../../input-select";
import {
  pelabuhanOptions,
  kantorPabeanOptions,
  jenisPIBOptions,
  jenisImportOptions,
  caraPembayaranOptions,
} from "@/app/constants/header-options";
import { required } from "@/lib/validation";

export function HeaderTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const header = data.header;

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
            value={header.kodePelabuhanTujuan ?? ""}
            options={pelabuhanOptions}
            onChange={(value) =>
              updateDocumentData({
                header: { ...header, kodePelabuhanTujuan: value },
              })
            }
            rules={[required()]}
          />
          <InputSelect
            label="Kantor Pabean"
            value={header.kodeKantorPabean ?? ""}
            options={kantorPabeanOptions}
            onChange={(value) =>
              updateDocumentData({
                header: { ...header, kodeKantorPabean: value },
              })
            }
            rules={[required()]}
          />
        </InputWrapper>

        {/* Keterangan Lain */}
        <InputWrapper title="Keterangan Lain">
          <InputSelect
            label="Jenis PIB"
            value={header.kodeJenisPib ?? ""}
            options={jenisPIBOptions}
            onChange={(value) =>
              updateDocumentData({ header: { ...header, kodeJenisPib: value } })
            }
            rules={[required()]}
          />
          <InputSelect
            label="Jenis Import"
            value={header.kodeJenisImport ?? ""}
            options={jenisImportOptions}
            onChange={(value) =>
              updateDocumentData({
                header: { ...header, kodeJenisImport: value },
              })
            }
            rules={[required()]}
          />
          <InputSelect
            label="Cara Pembayaran"
            value={header.kodeCaraPembayaran ?? ""}
            options={caraPembayaranOptions}
            onChange={(value) =>
              updateDocumentData({
                header: { ...header, kodeCaraPembayaran: value },
              })
            }
            rules={[required()]}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

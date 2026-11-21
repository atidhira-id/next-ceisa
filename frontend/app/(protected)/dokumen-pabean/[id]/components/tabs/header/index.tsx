"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import { required } from "@/app/lib/validation";
import { useOptions } from "@/app/hooks/useOptions";
import { HeaderType } from "@/app/types/draft";

export default function HeaderTab() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const header = data.header;

  const port = useOptions("PORT");
  const customOffice = useOptions("CUSTOMS_OFFICE");
  const pibType = useOptions("PIB_TYPE");
  const importType = useOptions("IMPORT_TYPE");
  const paymentMethod = useOptions("PAYMENT_METHOD");

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
            options={port.options}
            onChange={(value) => updateHeader("destinationPortCode", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Kantor Pabean"
            value={header.customsOfficeCode ?? ""}
            options={customOffice.options}
            onChange={(value) => updateHeader("customsOfficeCode", value)}
            rules={[required()]}
          />
        </InputWrapper>

        {/* Keterangan Lain */}
        <InputWrapper title="Keterangan Lain">
          <InputSelect
            label="Jenis PIB"
            value={header.pibType ?? ""}
            options={pibType.options}
            onChange={(value) => updateHeader("pibType", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Jenis Import"
            value={header.importTypeCode ?? ""}
            options={importType.options}
            onChange={(value) => updateHeader("importTypeCode", value)}
            rules={[required()]}
          />
          <InputSelect
            label="Cara Pembayaran"
            value={header.paymentMethodCode ?? ""}
            options={paymentMethod.options}
            onChange={(value) => updateHeader("paymentMethodCode", value)}
            rules={[required()]}
          />
        </InputWrapper>
      </div>

      {[port, customOffice, pibType, importType, paymentMethod].some(
        (item) => item.isLoading,
      ) && <p className="text-sm text-gray-500">Memuat options...</p>}

      {[port, customOffice, pibType, importType, paymentMethod].some(
        (item) => item.error,
      ) && (
        <p className="text-sm text-red-600">
          Gagal memuat data options. Silakan coba muat ulang halaman.
        </p>
      )}
    </div>
  );
}

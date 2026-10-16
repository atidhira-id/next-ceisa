"use client";
import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { jenisTransaksiOptions, jenisValutaOptions } from "@/lib/options";

export function TransaksiTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateHeader(field: keyof DocumentData["header"], value: string) {
    updateDocumentData({
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
        {/* Harga */}
        <InputWrapper title="Harga">
          <InputSelect
            label="Jenis Valuta"
            value={data.header.kodeValuta ?? ""}
            options={jenisValutaOptions}
            onChange={(value) => updateHeader("kodeValuta", value)}
          />

          <InputNormal title="NDPBM" value="" disabled />

          <InputSelect
            label="Jenis Transaksi"
            value={data.header.kodeJenisNilai ?? ""}
            options={jenisTransaksiOptions}
            onChange={(value) => updateHeader("kodeJenisNilai", value)}
          />

          <p>TODO: INFORMASI KOMPONEN BIAYA</p>
        </InputWrapper>

        {/* Biaya Lainnya */}
        <InputWrapper title="Biaya Lainnya">
          <InputNormal title="Biaya Penambah" value="0.00" disabled />
          <InputNormal title="Biaya Pengurang" value="0.00" disabled />
          <InputNormal title="Freight" value="0.00" disabled />
          <p>TODO: ASURANSI</p>
          <InputNormal title="Voluntary Declaration" value="0.00" disabled />
        </InputWrapper>

        {/* Berat */}
        <InputWrapper title="Berat">
          <InputNormal title="Biaya Kotor (KGM)" value="0.00" disabled />
          <p>TODO: PERHITUNGAN PROPORSIONAL</p>
          <InputNormal title="Biaya Bersih (KGM)" value="0.00" disabled />
        </InputWrapper>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import {
  jenisIdentitasOptions,
  kodeJenisApiOptions,
  kodeStatusOptions,
} from "@/lib/options";

export default function FormImportir() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateEntitas1(
    field: keyof DocumentData["entitas1"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      entitas1: {
        ...data.entitas1,
        [field]: value,
      },
    });
  }

  const [identityNumber, setIdentityNumber] = useState(
    data.entitas1.nomorIdentitas ?? "",
  );

  const updateNitku = (value: string) => {
    setIdentityNumber(value);
    const nitku = value + "000000";
    updateEntitas1("nomorIdentitas", nitku);
  };

  return (
    <InputWrapper title="Importir">
      {/* Nomor Identitas */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Identitas
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={data.entitas1.kodeJenisIdentitas ?? ""}
            options={jenisIdentitasOptions}
            onChange={(value) => updateEntitas1("kodeJenisIdentitas", value)}
          />
          <InputNormal
            value={identityNumber ?? ""}
            onChange={(value) => updateNitku(value)}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={identityNumber + "0".repeat(6)}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={data.entitas1.namaEntitas ?? ""}
        onChange={(value) => updateEntitas1("namaEntitas", value)}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={data.entitas1.alamatEntitas ?? ""}
        onChange={(value) => updateEntitas1("alamatEntitas", value)}
      />

      {/* API/NIB */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">API/NIB</p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={data.entitas1.kodeJenisApi ?? ""}
            options={kodeJenisApiOptions}
            onChange={(value) => updateEntitas1("kodeJenisApi", value)}
          />
          <InputNormal
            value={data.entitas1.nibEntitas ?? ""}
            onChange={(value) => updateEntitas1("nibEntitas", value)}
          />
        </div>
      </div>

      {/* Status */}
      <InputSelect
        label="Status"
        value={data.entitas1.kodeStatus ?? ""}
        options={kodeStatusOptions}
        onChange={(value) => updateEntitas1("kodeStatus", value)}
      />
    </InputWrapper>
  );
}

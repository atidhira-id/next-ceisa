"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
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
  const importir = data.entitasImportir;

  const [identityNumber, setIdentityNumber] = useState(
    importir.nomorIdentitas ?? "",
  );

  const updateNitku = (value: string) => {
    setIdentityNumber(value);
    const nitku = value + "000000";
    updateDocumentData({
      entitasImportir: {
        ...importir,
        nomorIdentitas: value,
        nomorNitku: nitku,
      },
    });
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
            value={importir.kodeNomorIdentitas ?? ""}
            options={jenisIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, kodeNomorIdentitas: value },
              })
            }
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
        value={importir.nomorNitku ?? identityNumber + "0".repeat(6)}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={importir.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({ entitasImportir: { ...importir, nama: value } })
        }
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={importir.alamat ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasImportir: { ...importir, alamat: value },
          })
        }
      />

      {/* API/NIB */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">API/NIB</p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={importir.kodeApi ?? ""}
            options={kodeJenisApiOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, kodeApi: value },
              })
            }
          />
          <InputNormal
            value={importir.api ?? ""}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, api: value },
              })
            }
          />
        </div>
      </div>

      {/* Status */}
      <InputSelect
        label="Status"
        value={importir.kodeStatus ?? ""}
        options={kodeStatusOptions}
        onChange={(value) =>
          updateDocumentData({
            entitasImportir: { ...importir, kodeStatus: value },
          })
        }
      />
    </InputWrapper>
  );
}

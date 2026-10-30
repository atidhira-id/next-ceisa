"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import {
  kodeNomorIdentitasOptions,
  kodeApiNibOptions,
  kodeStatusOptions,
} from "@/app/constants/entitas-options";
import { maxLength, minLength, required } from "@/lib/validation";

export default function FormImportir() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const importir = data.entitasImportir;

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
            options={kodeNomorIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, kodeNomorIdentitas: value },
              })
            }
            rules={[required()]}
          />
          <InputNormal
            value={importir.nomorIdentitas ?? ""}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, nomorIdentitas: value },
              })
            }
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={
          importir.nomorIdentitas ? importir.nomorIdentitas + "0".repeat(6) : ""
        }
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={importir.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({ entitasImportir: { ...importir, nama: value } })
        }
        rules={[required()]}
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
        rules={[required()]}
      />

      {/* API/NIB */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">API/NIB</p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={importir.kodeApi ?? ""}
            options={kodeApiNibOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, kodeApi: value },
              })
            }
            rules={[required()]}
          />
          <InputNormal
            value={importir.api ?? ""}
            onChange={(value) =>
              updateDocumentData({
                entitasImportir: { ...importir, api: value },
              })
            }
            rules={[required()]}
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
        rules={[required()]}
      />
    </InputWrapper>
  );
}

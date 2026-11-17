"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import {
  kodeNomorIdentitasOptions,
  kodeApiNibOptions,
  kodeStatusOptions,
} from "@/app/constants/options/entitasOptions";
import { maxLength, minLength, required } from "@/lib/validation";
import { ImporterType } from "@/app/types";

export default function FormImporter() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const entities = data.entities;
  const importer = entities.importer;

  function updateImporter(field: keyof ImporterType, value: string) {
    updateDocumentData({
      entities: { ...entities, importer: { ...importer, [field]: value } },
    });
  }

  return (
    <InputWrapper title="Importir">
      {/* Nomor Identitas */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Identitas
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={importer.identityNumberCode ?? ""}
            options={kodeNomorIdentitasOptions}
            onChange={(value) => updateImporter("identityNumberCode", value)}
            rules={[required()]}
          />
          <InputNormal
            value={importer.identityNumber ?? ""}
            onChange={(value) => updateImporter("identityNumber", value)}
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={
          importer.identityNumber ? importer.identityNumber + "0".repeat(6) : ""
        }
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={importer.name ?? ""}
        onChange={(value) => updateImporter("name", value)}
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={importer.address ?? ""}
        onChange={(value) => updateImporter("address", value)}
        rules={[required()]}
      />

      {/* API/NIB */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">API/NIB</p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={importer.apiCode ?? ""}
            options={kodeApiNibOptions}
            onChange={(value) => updateImporter("apiCode", value)}
            rules={[required()]}
          />
          <InputNormal
            value={importer.api ?? ""}
            onChange={(value) => updateImporter("api", value)}
            rules={[required()]}
          />
        </div>
      </div>

      {/* Status */}
      <InputSelect
        label="Status"
        value={importer.statusCode ?? ""}
        options={kodeStatusOptions}
        onChange={(value) => updateImporter("statusCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { maxLength, minLength, required } from "@/app/lib/validation";
import { useOptions } from "@/app/hooks/useOptions";
import { useCompanies } from "@/app/hooks/useCompanies";
import { ImporterType } from "@/app/types/draft";

export default function FormImporter() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const entities = data.entities;
  const importer = entities.importer;

  const {
    companies,
    companyOptions,
    isLoading: companiesLoading,
    error: companiesError,
  } = useCompanies();

  const identityTypes = useOptions("IDENTITY_TYPE");
  const apiTypes = useOptions("API_TYPE");
  const entityStatuses = useOptions("ENTITY_STATUS");

  function selectCompany(companyId: string) {
    const company = companies.find((item) => item.id === companyId);

    if (!company) return;

    updateDraftData({
      entities: {
        ...entities,
        importer: {
          ...importer,
          companyId: company.id,
          identityNumberCode: company.identityTypeCode,
          identityNumber: company.identityNumber,
          name: company.name,
          address: company.address,
          apiCode: company.apiTypeCode,
          api: company.apiNumber,
          statusCode: company.statusCode,
        },
      },
    });

    markSectionDirty("entities");
  }

  function updateImporter(field: keyof ImporterType, value: string) {
    updateDraftData({
      entities: { ...entities, importer: { ...importer, [field]: value } },
    });
    markSectionDirty("entities");
  }

  return (
    <InputWrapper title="Importir">
      <InputSelect
        label="Pilih Perusahaan"
        value={importer.companyId ?? ""}
        options={companyOptions}
        onChange={selectCompany}
      />

      {/* Nomor Identitas */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Identitas
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={importer.identityNumberCode ?? ""}
            options={identityTypes.options}
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
            options={apiTypes.options}
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
        options={entityStatuses.options}
        onChange={(value) => updateImporter("statusCode", value)}
        rules={[required()]}
      />

      {companiesLoading && (
        <p className="text-sm text-gray-500">Memuat data perusahaan...</p>
      )}

      {companiesError && (
        <p className="text-sm text-red-600">Gagal memuat data perusahaan.</p>
      )}
    </InputWrapper>
  );
}

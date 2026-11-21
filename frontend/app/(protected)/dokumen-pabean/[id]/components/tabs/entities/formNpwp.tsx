import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { maxLength, minLength, required } from "@/app/lib/validation";
import { NormalButton } from "@/app/components/buttons";
import { ImporterType } from "@/app/types/draft";
import { useOptions } from "@/app/hooks/useOptions";

export default function FormNpwp() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const entities = data.entities;
  const importer = entities.importer;
  const npwp = entities.npwp;

  const identityTypes = useOptions("IDENTITY_TYPE");

  function copyImporterData() {
    updateDraftData({
      entities: {
        ...entities,
        npwp: { ...importer },
      },
    });

    markSectionDirty("entities");
  }

  function updateNpwp(field: keyof ImporterType, value: string) {
    updateDraftData({
      entities: { ...entities, npwp: { ...npwp, [field]: value } },
    });

    markSectionDirty("entities");
  }

  return (
    <InputWrapper
      title="NPWP Pemusatan"
      headerChildren={
        <NormalButton onClick={() => copyImporterData()}>
          Salin Importir
        </NormalButton>
      }
    >
      {/* Nomor Identitas */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Identitas
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={npwp.identityNumberCode ?? ""}
            options={identityTypes.options}
            onChange={(value) => updateNpwp("identityNumberCode", value)}
            rules={[required()]}
          />
          <InputNormal
            value={npwp.identityNumber ?? ""}
            onChange={(value) => updateNpwp("identityNumber", value)}
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={npwp.identityNumber ? npwp.identityNumber + "0".repeat(6) : ""}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={npwp.name ?? ""}
        onChange={(value) => updateNpwp("name", value)}
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={npwp.address ?? ""}
        onChange={(value) => updateNpwp("address", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { maxLength, minLength, required } from "@/app/lib/validation";
import { NormalButton } from "@/app/components/buttons";
import { OwnerType } from "@/app/types/draft";
import { useOptions } from "@/app/hooks/useOptions";

export default function FormOwner() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const entities = data.entities;
  const importer = entities.importer;
  const owner = entities.owner;

  const identityTypes = useOptions("IDENTITY_TYPE");
  const affiliationTypes = useOptions("ENTITY_AFFILIATION");

  function copyImporterData() {
    updateDraftData({
      entities: {
        ...entities,
        owner: { ...importer, affiliation: "" },
      },
    });

    markSectionDirty("entities");
  }

  function updateOwner(field: keyof OwnerType, value: string) {
    updateDraftData({
      entities: { ...entities, owner: { ...owner, [field]: value } },
    });

    markSectionDirty("entities");
  }

  return (
    <InputWrapper
      title="Pemilik Barang"
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
            value={owner.identityNumberCode ?? ""}
            options={identityTypes.options}
            onChange={(value) => updateOwner("identityNumberCode", value)}
            rules={[required()]}
          />
          <InputNormal
            value={owner.identityNumber ?? ""}
            onChange={(value) => updateOwner("identityNumber", value)}
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={owner.identityNumber ? owner.identityNumber + "0".repeat(6) : ""}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={owner.name ?? ""}
        onChange={(value) => updateOwner("name", value)}
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={owner.address ?? ""}
        onChange={(value) => updateOwner("address", value)}
        rules={[required()]}
      />

      {/* Afiliasi */}
      <InputSelect
        label="Afiliasi"
        value={owner.affiliation ?? ""}
        options={affiliationTypes.options}
        onChange={(value) => updateOwner("affiliation", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

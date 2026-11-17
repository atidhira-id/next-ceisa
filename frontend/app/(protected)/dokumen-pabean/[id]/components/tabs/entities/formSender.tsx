import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { kodeNegaraOptions } from "@/app/constants/options/entitasOptions";
import { required } from "@/lib/validation";
import { SupplierType } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";

export default function FormSender() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const entities = data.entities;
  const sender = entities.sender;

  function updateSender(field: keyof SupplierType, value: string) {
    updateDocumentData({
      entities: { ...entities, sender: { ...sender, [field]: value } },
    });
  }

  return (
    <InputWrapper title="Pengirim">
      {/* Nama */}
      <InputNormal
        title="Nama"
        value={sender.name ?? ""}
        onChange={(value) => updateSender("name", value)}
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={sender.address ?? ""}
        onChange={(value) => updateSender("address", value)}
        rules={[required()]}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={sender.countryCode ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) => updateSender("countryCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

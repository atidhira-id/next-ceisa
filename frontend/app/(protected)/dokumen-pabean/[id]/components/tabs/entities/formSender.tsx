import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { required } from "@/app/lib/validation";
import { SupplierType } from "@/app/types/draft";
import { useSuppliers } from "@/app/hooks/useSupplier";
import { useOptions } from "@/app/hooks/useOptions";

export default function FormSender() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const { suppliers, supplierOptions } = useSuppliers();

  const data = draft!;
  const entities = data.entities;
  const sender = entities.sender;

  const countryCodes = useOptions("COUNTRY");

  function updateSender(field: keyof SupplierType, value: string) {
    updateDraftData({
      entities: { ...entities, sender: { ...sender, [field]: value } },
    });

    markSectionDirty("entities");
  }

  function selectSupplier(supplierName: string) {
    const supplier = suppliers.find((item) => item.name === supplierName);
    if (!supplier) return;

    updateDraftData({
      entities: {
        ...entities,
        sender: {
          ...sender,
          name: supplier.name,
          address: supplier.address,
          countryCode: supplier.countryCode,
        },
      },
    });

    markSectionDirty("entities");
  }

  return (
    <InputWrapper title="Pengirim">
      {/* Nama */}
      <InputSelect
        label="Nama"
        value={sender.name ?? ""}
        options={supplierOptions}
        onChange={(value) => selectSupplier(value)}
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
        options={countryCodes.options}
        onChange={(value) => updateSender("countryCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

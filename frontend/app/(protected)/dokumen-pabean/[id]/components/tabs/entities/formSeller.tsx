import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { required } from "@/app/lib/validation";
import { NormalButton } from "@/app/components/buttons";
import { SupplierType } from "@/app/types/draft";
import { useSuppliers } from "@/app/hooks/useSupplier";
import { useOptions } from "@/app/hooks/useOptions";

export default function FormSeller() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const { suppliers, supplierOptions } = useSuppliers();

  const data = draft!;
  const entities = data.entities;
  const sender = entities.sender;
  const seller = entities.seller;

  const countryCodes = useOptions("COUNTRY");

  function copySenderData() {
    updateDraftData({
      entities: { ...entities, seller: { ...sender } },
    });

    markSectionDirty("entities");
  }

  function updateSeller(field: keyof SupplierType, value: string) {
    updateDraftData({
      entities: { ...entities, seller: { ...seller, [field]: value } },
    });

    markSectionDirty("entities");
  }

  function selectSupplier(supplierName: string) {
    const supplier = suppliers.find((item) => item.name === supplierName);
    if (!supplier) return;

    updateDraftData({
      entities: {
        ...entities,
        seller: {
          ...seller,
          name: supplier.name,
          address: supplier.address,
          countryCode: supplier.countryCode,
        },
      },
    });

    markSectionDirty("entities");
  }

  return (
    <InputWrapper
      title="Penjual"
      headerChildren={
        <NormalButton onClick={() => copySenderData()}>
          Salin Data Pengirim
        </NormalButton>
      }
    >
      {/* Nama */}
      <InputSelect
        label="Nama"
        value={seller.name ?? ""}
        options={supplierOptions}
        onChange={(value) => selectSupplier(value)}
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={seller.address ?? ""}
        onChange={(value) => updateSeller("address", value)}
        rules={[required()]}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={seller.countryCode ?? ""}
        options={countryCodes.options}
        onChange={(value) => updateSeller("countryCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

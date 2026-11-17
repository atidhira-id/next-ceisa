import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import { kodeNegaraOptions } from "@/app/constants/options/entitasOptions";
import { required } from "@/lib/validation";
import { NormalButton } from "@/app/components/buttons";
import { SupplierType } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";

export default function FormSeller() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const entities = data.entities;
  const sender = entities.sender;
  const seller = entities.seller;

  function copySenderData() {
    updateDocumentData({
      entities: { ...entities, seller: { ...sender } },
    });
  }

  function updateSeller(field: keyof SupplierType, value: string) {
    updateDocumentData({
      entities: { ...entities, seller: { ...seller, [field]: value } },
    });
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
      <InputNormal
        title="Nama"
        value={seller.name ?? ""}
        onChange={(value) => updateSeller("name", value)}
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
        options={kodeNegaraOptions}
        onChange={(value) => updateSeller("countryCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

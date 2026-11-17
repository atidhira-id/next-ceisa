"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import { pelabuhanOptions } from "@/app/constants/options/headerOptions";
import { tempatPenimbunanOptions } from "@/app/constants/options/pengangkutOptions";
import { required } from "@/lib/validation";
import { TransportType } from "@/app/types";

export default function FormPort() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const transport = data.transport;

  function updateTransport(field: keyof TransportType, value: string) {
    updateDocumentData({ transport: { ...transport, [field]: value } });
  }

  return (
    <InputWrapper title="Pelabuhan & Tempat Penimbunan">
      {/* Pelabuhan Muat */}
      <InputSelect
        label="Pelabuhan Muat"
        value={transport.loadingPortCode ?? ""}
        options={pelabuhanOptions}
        onChange={(value) => updateTransport("loadingPortCode", value)}
        rules={[required()]}
      />

      {/* Pelabuhan Transit */}
      <InputSelect
        label="Pelabuhan Transit"
        value={transport.transitPortCode ?? ""}
        options={pelabuhanOptions}
        onChange={(value) => updateTransport("transitPortCode", value)}
        rules={[required()]}
      />

      {/* Tempat Penimbunan */}
      <InputSelect
        label="Tempat Penimbunan"
        value={transport.storagePlaceCode ?? ""}
        options={tempatPenimbunanOptions}
        onChange={(value) => updateTransport("storagePlaceCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

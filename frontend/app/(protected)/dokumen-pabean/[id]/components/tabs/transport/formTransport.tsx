"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";
import { caraPengangkutanOptions } from "@/app/constants/options/pengangkutOptions";
import { kodeNegaraOptions } from "@/app/constants/options/entitasOptions";
import { required } from "@/lib/validation";
import { TransportType } from "@/app/types";

export default function FormTransport() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const transport = data.transport;

  function updateTransport(field: keyof TransportType, value: string) {
    updateDocumentData({ transport: { ...transport, [field]: value } });
  }

  return (
    <InputWrapper title="Pengangkutan">
      {/* Cara Pengangkutan */}
      <InputSelect
        label="Cara Pengangkutan"
        value={transport.transportModeCode ?? ""}
        options={caraPengangkutanOptions}
        onChange={(value) => updateTransport("transportModeCode", value)}
        rules={[required()]}
      />

      {/* Nama Sarana Angkut */}
      <InputNormal
        title="Nama Sarana Angkut"
        value={transport.conveyanceName ?? ""}
        onChange={(value) => updateTransport("conveyanceName", value)}
        rules={[required()]}
      />

      {/* Nomor Voy/Flight/Nopol/Lainnya */}
      <InputNormal
        title="Nomor Voy/Flight/Nopol/Lainnya"
        value={transport.voyageNumber ?? ""}
        onChange={(value) => updateTransport("voyageNumber", value)}
        rules={[required()]}
      />

      {/* Bendera */}
      <InputSelect
        label="Bendera"
        value={transport.flagCode ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) => updateTransport("flagCode", value)}
        rules={[required()]}
      />

      {/* Perkiraan Tanggal Tiba */}
      <InputDate
        label="Perkiraan Tanggal Tiba"
        value={transport.estimatedArrivalDate ?? ""}
        onChange={(value) => updateTransport("estimatedArrivalDate", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

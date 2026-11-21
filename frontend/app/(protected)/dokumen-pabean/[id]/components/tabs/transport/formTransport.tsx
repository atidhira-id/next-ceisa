"use client";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { TransportType } from "@/app/types/draft";
import { required } from "@/app/lib/validation";

import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";

export default function FormTransport() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const transport = data.transport;

  const countries = useOptions("COUNTRY");
  const transportMethods = useOptions("TRANSPORT_METHOD");

  function updateTransport(field: keyof TransportType, value: string) {
    updateDraftData({ transport: { ...transport, [field]: value } });

    markSectionDirty("transport");
  }

  return (
    <InputWrapper title="Pengangkutan">
      {/* Cara Pengangkutan */}
      <InputSelect
        label="Cara Pengangkutan"
        value={transport.transportModeCode ?? ""}
        options={transportMethods.options}
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
        options={countries.options}
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

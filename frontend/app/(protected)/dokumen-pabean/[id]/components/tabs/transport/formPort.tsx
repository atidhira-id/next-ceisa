"use client";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { TransportType } from "@/app/types/draft";
import { required } from "@/app/lib/validation";

import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputSelect from "@/app/components/inputs/input-select";
import InputNormal from "@/app/components/inputs/input-normal";
import { getLabel } from "@/app/lib/utils";

export default function FormPort() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const transport = data.transport;

  const ports = useOptions("PORT");
  const storagesLocation = useOptions("STORAGE_LOCATION");

  function updateTransport(field: keyof TransportType, value: string) {
    updateDraftData({ transport: { ...transport, [field]: value } });

    markSectionDirty("transport");
  }

  return (
    <InputWrapper title="Pelabuhan & Tempat Penimbunan">
      <InputSelect
        label="Pelabuhan Muat"
        value={transport.loadingPortCode ?? ""}
        options={ports.options}
        onChange={(value) => updateTransport("loadingPortCode", value)}
        rules={[required()]}
      />

      <InputSelect
        label="Pelabuhan Transit"
        value={transport.transitPortCode ?? ""}
        options={ports.options}
        onChange={(value) => updateTransport("transitPortCode", value)}
        rules={[required()]}
      />

      <InputNormal
        title="Pelabuhan Tujuan"
        value={
          getLabel(ports.options, data.header.destinationPortCode ?? "") ?? ""
        }
        disabled
      />

      <InputSelect
        label="Tempat Penimbunan"
        value={transport.storagePlaceCode ?? ""}
        options={storagesLocation.options}
        onChange={(value) => updateTransport("storagePlaceCode", value)}
        rules={[required()]}
      />
    </InputWrapper>
  );
}

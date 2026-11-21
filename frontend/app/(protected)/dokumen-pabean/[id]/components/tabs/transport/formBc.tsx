"use client";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { TransportType } from "@/app/types/draft";
import { required, maxLength } from "@/app/lib/validation";

import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";

export default function FormBc() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const transport = draft!.transport;

  const closingNumbers = useOptions("CUSTOMS_CLOSING_NUMBER");

  function updateTransport(field: keyof TransportType, value: string) {
    updateDraftData({ transport: { ...transport, [field]: value } });

    markSectionDirty("transport");
  }

  return (
    <InputWrapper title="BC 1.1">
      {/* Nomor Tutup PU */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Tutup PU
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={transport.customsSealTypeCode ?? ""}
            options={closingNumbers.options}
            onChange={(value) => updateTransport("customsSealTypeCode", value)}
            rules={[required()]}
          />
          <InputNormal
            maxLength={6}
            value={transport.customsSealNumber ?? ""}
            onChange={(value) => updateTransport("customsSealNumber", value)}
            rules={[required(), maxLength(6)]}
          />
          <InputDate
            value={transport.customsSealDate ?? ""}
            onChange={(value) => updateTransport("customsSealDate", value)}
            rules={[required()]}
          />
        </div>
      </div>

      {/* Nomor Pos */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Pos
        </p>

        <div className="flex items-center gap-2">
          <InputNormal
            maxLength={4}
            value={transport.positionNumber1 ?? ""}
            onChange={(value) => updateTransport("positionNumber1", value)}
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            maxLength={4}
            value={transport.positionNumber2 ?? ""}
            onChange={(value) => updateTransport("positionNumber2", value)}
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            maxLength={4}
            value={transport.positionNumber3 ?? ""}
            onChange={(value) => updateTransport("positionNumber3", value)}
            rules={[required(), maxLength(4)]}
          />
        </div>
      </div>
    </InputWrapper>
  );
}

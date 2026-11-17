"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";
import { nomorTutupPuOptions } from "@/app/constants/options/pengangkutOptions";
import { required, maxLength } from "@/lib/validation";
import { TransportType } from "@/app/types";

export default function FormBc() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const transport = documentData!.transport;

  function updateTransport(field: keyof TransportType, value: string) {
    updateDocumentData({ transport: { ...transport, [field]: value } });
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
            options={nomorTutupPuOptions}
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

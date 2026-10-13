"use client";
import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import { nomorTutupPuOptions } from "@/lib/options";

export default function FormBc() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateHeader(field: keyof DocumentData["header"], value: string) {
    updateDocumentData({
      ...data,
      header: {
        ...data.header,
        [field]: value,
      },
    });
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
            value={data.header.kodeTutupPu ?? ""}
            options={nomorTutupPuOptions}
            onChange={(value) => updateHeader("kodeTutupPu", value)}
          />
          <InputNormal
            value={data.header.nomorBc11 ?? ""}
            onChange={(value) => updateHeader("nomorBc11", value)}
          />
          <InputDate
            value={data.header.tanggalBc11 ?? ""}
            onChange={(value) => updateHeader("tanggalBc11", value)}
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
            value={data.header.nomorPos ?? ""}
            onChange={(value) => updateHeader("nomorPos", value)}
          />
          <InputNormal
            value={data.header.nomorSubPos1 ?? ""}
            onChange={(value) => updateHeader("nomorSubPos1", value)}
          />
          <InputNormal
            value={data.header.nomorSubPos2 ?? ""}
            onChange={(value) => updateHeader("nomorSubPos2", value)}
          />
        </div>
      </div>
    </InputWrapper>
  );
}

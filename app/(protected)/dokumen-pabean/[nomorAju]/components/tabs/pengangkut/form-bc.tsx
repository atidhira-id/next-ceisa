"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import { nomorTutupPuOptions } from "@/app/constants/pengangkut-options";
import { required, maxLength, minLength } from "@/lib/validation";

export default function FormBc() {
  const { documentData, updateDocumentData } = useDocument();
  const pengangkut = documentData!.pengangkut;

  return (
    <InputWrapper title="BC 1.1">
      {/* Nomor Tutup PU */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Tutup PU
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={pengangkut.kodeNomorTutupPu ?? ""}
            options={nomorTutupPuOptions}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, kodeNomorTutupPu: value },
              })
            }
            rules={[required()]}
          />
          <InputNormal
            value={pengangkut.nomorTutupPu ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorTutupPu: value },
              })
            }
            rules={[required(), minLength(4), maxLength(4)]}
          />
          <InputDate
            value={pengangkut.tanggalTutupPu ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, tanggalTutupPu: value },
              })
            }
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
            value={pengangkut.nomorPos1 ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorPos1: value },
              })
            }
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            value={pengangkut.nomorPos2 ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorPos2: value },
              })
            }
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            value={pengangkut.nomorPos3 ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorPos3: value },
              })
            }
            rules={[required(), maxLength(4)]}
          />
        </div>
      </div>
    </InputWrapper>
  );
}

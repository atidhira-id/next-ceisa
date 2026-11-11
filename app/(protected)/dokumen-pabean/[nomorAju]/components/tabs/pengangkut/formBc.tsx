"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputDate from "@/app/components/inputs/input-date";
import { nomorTutupPuOptions } from "@/app/constants/options/pengangkutOptions";
import { required, maxLength } from "@/lib/validation";

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
            maxLength={6}
            value={pengangkut.nomorTutupPu ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorTutupPu: value },
              })
            }
            rules={[required(), maxLength(6)]}
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
            maxLength={4}
            value={pengangkut.nomorPos1 ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorPos1: value },
              })
            }
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            maxLength={4}
            value={pengangkut.nomorPos2 ?? ""}
            onChange={(value) =>
              updateDocumentData({
                pengangkut: { ...pengangkut, nomorPos2: value },
              })
            }
            rules={[required(), maxLength(4)]}
          />
          <InputNormal
            maxLength={4}
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

"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import { pelabuhanOptions } from "@/app/constants/options/headerOptions";
import { tempatPenimbunanOptions } from "@/app/constants/options/pengangkutOptions";
import { required } from "@/lib/validation";

export default function FormPelabuhan() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const pengangkut = data.pengangkut;

  const getPelabuhanTujuan = () => {
    const tujuanKey = data.header.kodePelabuhanTujuan;
    const pelabuhanTujuan = pelabuhanOptions.find(
      (item) => item.value === tujuanKey,
    );

    return pelabuhanTujuan?.label ?? "";
  };

  return (
    <InputWrapper title="Pelabuhan & Tempat Penimbunan">
      {/* Pelabuhan Muat */}
      <InputSelect
        label="Pelabuhan Muat"
        value={pengangkut.kodePelabuhanMuat ?? ""}
        options={pelabuhanOptions}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, kodePelabuhanMuat: value },
          })
        }
        rules={[required()]}
      />

      {/* Pelabuhan Transit */}
      <InputSelect
        label="Pelabuhan Transit"
        value={pengangkut.kodePelabuhanTransit ?? ""}
        options={pelabuhanOptions}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, kodePelabuhanTransit: value },
          })
        }
        rules={[required()]}
      />

      {/* Pelabuhan Tujuan */}
      <InputNormal
        title="Pelabuhan Tujuan"
        value={getPelabuhanTujuan()}
        disabled
      />

      {/* Tempat Penimbunan */}
      <InputSelect
        label="Tempat Penimbunan"
        value={pengangkut.kodeTempatPenimbunan ?? ""}
        options={tempatPenimbunanOptions}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, kodeTempatPenimbunan: value },
          })
        }
        rules={[required()]}
      />
    </InputWrapper>
  );
}

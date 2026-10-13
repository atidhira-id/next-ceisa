"use client";
import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { pelabuhanOptions, tempatPenimbunanOptions } from "@/lib/options";

export default function FormPelabuhan() {
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
        value={data.header.kodePelabuhanMuat ?? ""}
        options={pelabuhanOptions}
        onChange={(value) => updateHeader("kodePelabuhanMuat", value)}
      />

      {/* Pelabuhan Transit */}
      <InputSelect
        label="Pelabuhan Transit"
        value={data.header.kodePelabuhanTransit ?? ""}
        options={pelabuhanOptions}
        onChange={(value) => updateHeader("kodePelabuhanTransit", value)}
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
        value={data.header.kodeTps ?? ""}
        options={tempatPenimbunanOptions}
        onChange={(value) => updateHeader("kodeTps", value)}
      />
    </InputWrapper>
  );
}

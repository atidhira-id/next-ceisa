"use client";
import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import { caraPengangkutanOptions, kodeNegaraOptions } from "@/lib/options";

export default function FormPengangkut() {
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

  function updatePengangkut(
    field: keyof DocumentData["pengangkut"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      pengangkut: {
        ...data.pengangkut,
        [field]: value,
      },
    });
  }

  return (
    <InputWrapper title="Pengangkutan">
      {/* Cara Pengangkutan */}
      <InputSelect
        label="Cara Pengangkutan"
        value={data.pengangkut.kodeCaraAngkut ?? ""}
        options={caraPengangkutanOptions}
        onChange={(value) => updatePengangkut("kodeCaraAngkut", value)}
      />

      {/* Nama Sarana Angkut */}
      <InputNormal
        title="Nama Sarana Angkut"
        value={data.pengangkut.namaPengangkut ?? ""}
        onChange={(value) => updatePengangkut("namaPengangkut", value)}
      />

      {/* Nomor Voy/Flight/Nopol/Lainnya */}
      <InputNormal
        title="Nomor Voy/Flight/Nopol/Lainnya"
        value={data.pengangkut.nomorPengangkut ?? ""}
        onChange={(value) => updatePengangkut("nomorPengangkut", value)}
      />

      {/* Bendera */}
      <InputSelect
        label="Bendera"
        value={data.pengangkut.kodeBendera ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) => updatePengangkut("kodeBendera", value)}
      />

      {/* Perkiraan Tanggal Tiba */}
      <InputDate
        label="Perkiraan Tanggal Tiba"
        value={data.header.tanggalTiba ?? ""}
        onChange={(value) => updateHeader("tanggalTiba", value)}
      />
    </InputWrapper>
  );
}

"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputDate from "../../input-date";
import { caraPengangkutanOptions, kodeNegaraOptions } from "@/lib/options";

export default function FormPengangkut() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const pengangkut = data.pengangkut;

  return (
    <InputWrapper title="Pengangkutan">
      {/* Cara Pengangkutan */}
      <InputSelect
        label="Cara Pengangkutan"
        value={pengangkut.kodeCaraPengangkutan ?? ""}
        options={caraPengangkutanOptions}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, kodeCaraPengangkutan: value },
          })
        }
      />

      {/* Nama Sarana Angkut */}
      <InputNormal
        title="Nama Sarana Angkut"
        value={pengangkut.namaSaranaPengangkutan ?? ""}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, namaSaranaPengangkutan: value },
          })
        }
      />

      {/* Nomor Voy/Flight/Nopol/Lainnya */}
      <InputNormal
        title="Nomor Voy/Flight/Nopol/Lainnya"
        value={pengangkut.nomorVoy ?? ""}
        onChange={(value) =>
          updateDocumentData({ pengangkut: { ...pengangkut, nomorVoy: value } })
        }
      />

      {/* Bendera */}
      <InputSelect
        label="Bendera"
        value={pengangkut.kodeBendera ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, kodeBendera: value },
          })
        }
      />

      {/* Perkiraan Tanggal Tiba */}
      <InputDate
        label="Perkiraan Tanggal Tiba"
        value={pengangkut.perkiraanTanggalTiba ?? ""}
        onChange={(value) =>
          updateDocumentData({
            pengangkut: { ...pengangkut, perkiraanTanggalTiba: value },
          })
        }
      />
    </InputWrapper>
  );
}

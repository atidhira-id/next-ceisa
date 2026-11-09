"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import InputDate from "../../inputs/input-date";
import { caraPengangkutanOptions } from "@/app/constants/options/pengangkutOptions";
import { kodeNegaraOptions } from "@/app/constants/options/entitasOptions";
import { required } from "@/lib/validation";

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
        rules={[required()]}
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
        rules={[required()]}
      />

      {/* Nomor Voy/Flight/Nopol/Lainnya */}
      <InputNormal
        title="Nomor Voy/Flight/Nopol/Lainnya"
        value={pengangkut.nomorVoy ?? ""}
        onChange={(value) =>
          updateDocumentData({ pengangkut: { ...pengangkut, nomorVoy: value } })
        }
        rules={[required()]}
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
        rules={[required()]}
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
        rules={[required()]}
      />
    </InputWrapper>
  );
}

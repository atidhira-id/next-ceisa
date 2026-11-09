import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import InputSelect from "../../inputs/input-select";
import InputTextArea from "../../inputs/input-textarea";
import {
  kodeNegaraOptions,
  supplierNameOptions,
} from "@/app/constants/options/entitasOptions";
import { required } from "@/lib/validation";
import { supplierData } from "@/app/constants/supplier";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

export default function FormPenjual() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const pengirim = data.entitasPengirim;
  const penjual = data.entitasPenjual;

  function copyPengirimData() {
    const { nama, alamat, negara } = pengirim;

    updateDocumentData({
      entitasPenjual: {
        ...penjual,
        nama,
        alamat,
        negara,
      },
    });
  }

  function updateNamaPenjual(nama: string) {
    const supplier = supplierData.find((item) => item.nama === nama);

    updateDocumentData({
      entitasPenjual: {
        ...penjual,
        nama,
        alamat:
          supplier?.alamat ?? (nama === penjual.nama ? penjual.alamat : ""),
        negara:
          supplier?.kodeNegara ?? (nama === penjual.nama ? penjual.negara : ""),
      },
    });
  }

  return (
    <InputWrapper
      title="Penjual"
      headerChildren={
        <NormalButton onClick={() => copyPengirimData()}>
          Salin Data Pengirim
        </NormalButton>
      }
    >
      {/* Nama */}
      <InputSelect
        label="Nama"
        value={penjual.nama ?? ""}
        options={supplierNameOptions}
        onChange={updateNamaPenjual}
        rules={[required()]}
        allowCustom
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={penjual.alamat ?? ""}
        onChange={(value) =>
          updateDocumentData({ entitasPenjual: { ...penjual, alamat: value } })
        }
        rules={[required()]}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={penjual.negara ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) =>
          updateDocumentData({ entitasPenjual: { ...penjual, negara: value } })
        }
        rules={[required()]}
      />
    </InputWrapper>
  );
}

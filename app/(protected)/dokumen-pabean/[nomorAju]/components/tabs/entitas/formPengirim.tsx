import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import InputSelect from "../../inputs/input-select";
import InputTextArea from "../../inputs/input-textarea";
import {
  kodeNegaraOptions,
  supplierNameOptions,
} from "@/app/constants/options/entitasOptions";
import { supplierData } from "@/app/constants/supplier";
import { required } from "@/lib/validation";

export default function FormPengirim() {
  const { documentData, updateDocumentData } = useDocument();
  const pengirim = documentData!.entitasPengirim;

  function updateNamaPengirim(nama: string) {
    const supplier = supplierData.find((item) => item.nama === nama);

    updateDocumentData({
      entitasPengirim: {
        ...pengirim,
        nama,
        alamat:
          supplier?.alamat ?? (nama === pengirim.nama ? pengirim.alamat : ""),
        negara:
          supplier?.kodeNegara ??
          (nama === pengirim.nama ? pengirim.negara : ""),
      },
    });
  }

  return (
    <InputWrapper title="Pengirim">
      {/* Nama */}
      <InputSelect
        label="Nama"
        value={pengirim.nama ?? ""}
        options={supplierNameOptions}
        onChange={updateNamaPengirim}
        rules={[required()]}
        allowCustom
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={pengirim.alamat ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasPengirim: { ...pengirim, alamat: value },
          })
        }
        rules={[required()]}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={pengirim.negara ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) =>
          updateDocumentData({
            entitasPengirim: { ...pengirim, negara: value },
          })
        }
        rules={[required()]}
      />
    </InputWrapper>
  );
}

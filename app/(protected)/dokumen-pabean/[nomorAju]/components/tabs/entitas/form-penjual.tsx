import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import {
  kodeNegaraOptions,
  supplierNameOptions,
} from "@/app/constants/options/entitas-options";
import { required } from "@/lib/validation";
import { supplierData } from "@/app/constants/supplier";

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
        <button
          type="button"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded m-2"
          onClick={() => copyPengirimData()}
        >
          Salin Data Pengirim
        </button>
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

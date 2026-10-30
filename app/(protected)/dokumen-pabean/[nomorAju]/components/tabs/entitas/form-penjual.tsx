import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { kodeNegaraOptions } from "@/app/constants/entitas-options";
import { required } from "@/lib/validation";

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
      <InputNormal
        title="Nama"
        value={penjual.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({ entitasPenjual: { ...penjual, nama: value } })
        }
        rules={[required()]}
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

import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { kodeNegaraOptions } from "@/lib/options";

export default function FormPenjual() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateEntitas10(
    field: keyof DocumentData["entitas10"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      entitas10: {
        ...data.entitas10,
        [field]: value,
      },
    });
  }

  function copyPengirimData() {
    const { namaEntitas, alamatEntitas, kodeNegara } = data.entitas9;

    updateDocumentData({
      ...data,
      entitas10: {
        ...data.entitas10,
        namaEntitas,
        alamatEntitas,
        kodeNegara,
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
        value={data.entitas10.namaEntitas ?? ""}
        onChange={(value) => updateEntitas10("namaEntitas", value)}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={data.entitas10.alamatEntitas ?? ""}
        onChange={(value) => updateEntitas10("alamatEntitas", value)}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={data.entitas10.kodeNegara ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) => updateEntitas10("kodeNegara", value)}
      />
    </InputWrapper>
  );
}

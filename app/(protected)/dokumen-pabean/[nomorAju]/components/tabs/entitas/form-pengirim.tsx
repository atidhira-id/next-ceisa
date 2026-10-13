import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { kodeNegaraOptions } from "@/lib/options";

export default function FormPengirim() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateEntitas9(
    field: keyof DocumentData["entitas9"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      entitas9: {
        ...data.entitas9,
        [field]: value,
      },
    });
  }

  return (
    <InputWrapper title="Pengirim">
      {/* Nama */}
      <InputNormal
        title="Nama"
        value={data.entitas9.namaEntitas ?? ""}
        onChange={(value) => updateEntitas9("namaEntitas", value)}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={data.entitas9.alamatEntitas ?? ""}
        onChange={(value) => updateEntitas9("alamatEntitas", value)}
      />

      {/* Negara */}
      <InputSelect
        label="Negara"
        value={data.entitas9.kodeNegara ?? ""}
        options={kodeNegaraOptions}
        onChange={(value) => updateEntitas9("kodeNegara", value)}
      />
    </InputWrapper>
  );
}

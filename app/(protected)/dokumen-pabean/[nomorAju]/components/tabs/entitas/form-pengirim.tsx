import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { kodeNegaraOptions } from "@/lib/options";
import { required } from "@/lib/validation";

export default function FormPengirim() {
  const { documentData, updateDocumentData } = useDocument();
  const pengirim = documentData!.entitasPengirim;

  return (
    <InputWrapper title="Pengirim">
      {/* Nama */}
      <InputNormal
        title="Nama"
        value={pengirim.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({ entitasPengirim: { ...pengirim, nama: value } })
        }
        rules={[required()]}
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

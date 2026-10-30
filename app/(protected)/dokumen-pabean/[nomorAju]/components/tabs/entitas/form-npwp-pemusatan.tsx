import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { kodeNomorIdentitasOptions } from "@/app/constants/entitas-options";
import { maxLength, minLength, required } from "@/lib/validation";

export default function FormNpwpPemusatan() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const importir = data.entitasImportir;
  const npwp = data.entitasNpwp;

  function copyImportirData() {
    const { kodeNomorIdentitas, nomorIdentitas, nama, alamat } = importir;

    updateDocumentData({
      entitasNpwp: {
        ...npwp,
        kodeNomorIdentitas,
        nomorIdentitas,
        nama,
        alamat,
      },
    });
  }

  return (
    <InputWrapper
      title="NPWP Pemusatan"
      headerChildren={
        <button
          type="button"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded m-2"
          onClick={() => copyImportirData()}
        >
          Salin Importir
        </button>
      }
    >
      {/* Nomor Identitas */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">
          Nomor Identitas
        </p>

        <div className="flex items-center gap-2">
          <InputSelect
            value={npwp.kodeNomorIdentitas ?? ""}
            options={kodeNomorIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasNpwp: { ...npwp, kodeNomorIdentitas: value },
              })
            }
            rules={[required()]}
          />
          <InputNormal
            value={npwp.nomorIdentitas ?? ""}
            onChange={(value) =>
              updateDocumentData({
                entitasNpwp: { ...npwp, nomorIdentitas: value },
              })
            }
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={npwp.nomorIdentitas ? npwp.nomorIdentitas + "0".repeat(6) : ""}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={npwp.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasNpwp: { ...npwp, nama: value },
          })
        }
        rules={[required()]}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={npwp.alamat ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasNpwp: { ...npwp, alamat: value },
          })
        }
        rules={[required()]}
      />
    </InputWrapper>
  );
}

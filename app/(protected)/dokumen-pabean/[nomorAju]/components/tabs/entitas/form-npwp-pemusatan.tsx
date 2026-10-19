import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { jenisIdentitasOptions } from "@/lib/options";

export default function FormNpwpPemusatan() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const importir = data.entitasImportir;
  const npwp = data.entitasNpwp;

  const identityNumber = npwp.nomorIdentitas ?? "";

  const updateNitku = (value: string) => {
    const nitku = value + "000000";
    updateDocumentData({
      entitasNpwp: { ...npwp, nomorIdentitas: value, nomorNitku: nitku },
    });
  };

  function copyImportirData() {
    const { kodeNomorIdentitas, nomorIdentitas, nomorNitku, nama, alamat } =
      importir;

    updateDocumentData({
      entitasNpwp: {
        ...npwp,
        kodeNomorIdentitas,
        nomorIdentitas,
        nomorNitku,
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
            options={jenisIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasNpwp: { ...npwp, kodeNomorIdentitas: value },
              })
            }
          />
          <InputNormal
            value={identityNumber ?? ""}
            onChange={(value) => updateNitku(value)}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={npwp.nomorNitku ?? identityNumber + "0".repeat(6)}
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
      />
    </InputWrapper>
  );
}

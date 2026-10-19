import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { jenisIdentitasOptions, kodeAfiliasiOptions } from "@/lib/options";

export default function FormPemilikBarang() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const importir = data.entitasImportir;
  const pemilikBarang = data.entitasPemilikBarang;

  const identityNumber = pemilikBarang.nomorIdentitas ?? "";

  const updateNitku = (value: string) => {
    const nitku = value + "000000";
    updateDocumentData({
      entitasPemilikBarang: {
        ...pemilikBarang,
        nomorIdentitas: value,
        nomorNitku: nitku,
      },
    });
  };

  function copyImportirData() {
    const { kodeNomorIdentitas, nomorIdentitas, nomorNitku, nama, alamat } =
      importir;

    updateDocumentData({
      entitasPemilikBarang: {
        ...pemilikBarang,
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
      title="Pemilik Barang"
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
            value={pemilikBarang.kodeNomorIdentitas ?? ""}
            options={jenisIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasPemilikBarang: {
                  ...pemilikBarang,
                  kodeNomorIdentitas: value,
                },
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
        value={pemilikBarang.nomorNitku ?? identityNumber + "0".repeat(6)}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={pemilikBarang.nama ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasPemilikBarang: { ...pemilikBarang, nama: value },
          })
        }
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={pemilikBarang.alamat ?? ""}
        onChange={(value) =>
          updateDocumentData({
            entitasPemilikBarang: { ...pemilikBarang, alamat: value },
          })
        }
      />

      {/* Afiliasi */}
      <InputSelect
        label="Afiliasi"
        value={pemilikBarang.afiliasi ?? ""}
        options={kodeAfiliasiOptions}
        onChange={(value) =>
          updateDocumentData({
            entitasPemilikBarang: { ...pemilikBarang, afiliasi: value },
          })
        }
      />
    </InputWrapper>
  );
}

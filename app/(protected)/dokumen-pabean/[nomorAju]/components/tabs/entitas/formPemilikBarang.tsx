import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import InputTextArea from "../../inputs/input-textarea";
import {
  kodeNomorIdentitasOptions,
  kodeAfiliasiOptions,
} from "@/app/constants/options/entitasOptions";
import { maxLength, minLength, required } from "@/lib/validation";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

export default function FormPemilikBarang() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const importir = data.entitasImportir;
  const pemilikBarang = data.entitasPemilikBarang;

  function copyImportirData() {
    const { kodeNomorIdentitas, nomorIdentitas, nama, alamat } = importir;

    updateDocumentData({
      entitasPemilikBarang: {
        ...pemilikBarang,
        kodeNomorIdentitas,
        nomorIdentitas,
        nama,
        alamat,
      },
    });
  }

  return (
    <InputWrapper
      title="Pemilik Barang"
      headerChildren={
        <NormalButton onClick={() => copyImportirData()}>
          Salin Importir
        </NormalButton>
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
            options={kodeNomorIdentitasOptions}
            onChange={(value) =>
              updateDocumentData({
                entitasPemilikBarang: {
                  ...pemilikBarang,
                  kodeNomorIdentitas: value,
                },
              })
            }
            rules={[required()]}
          />
          <InputNormal
            value={pemilikBarang.nomorIdentitas ?? ""}
            onChange={(value) =>
              updateDocumentData({
                entitasPemilikBarang: {
                  ...pemilikBarang,
                  nomorIdentitas: value,
                },
              })
            }
            rules={[required(), minLength(16), maxLength(16)]}
          />
        </div>
      </div>

      {/* Nomor NITKU */}
      <InputNormal
        title="Nomor NITKU"
        value={
          pemilikBarang.nomorIdentitas
            ? pemilikBarang.nomorIdentitas + "0".repeat(6)
            : ""
        }
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
        rules={[required()]}
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
        rules={[required()]}
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
        rules={[required()]}
      />
    </InputWrapper>
  );
}

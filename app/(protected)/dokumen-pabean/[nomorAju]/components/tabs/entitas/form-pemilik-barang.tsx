import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { jenisIdentitasOptions, kodeAfiliasiOptions } from "@/lib/options";

export default function FormPemilikBarang() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateEntitas7(
    field: keyof DocumentData["entitas7"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      entitas7: {
        ...data.entitas7,
        [field]: value,
      },
    });
  }

  const identityNumber = (data.entitas7.nomorIdentitas ?? "").slice(0, -6);

  const updateNitku = (value: string) => {
    const nitku = value + "000000";
    updateEntitas7("nomorIdentitas", nitku);
  };

  function copyImportirData() {
    const { kodeJenisIdentitas, nomorIdentitas, namaEntitas, alamatEntitas } =
      data.entitas1;

    updateDocumentData({
      ...data,
      entitas7: {
        ...data.entitas7,
        kodeJenisIdentitas,
        nomorIdentitas,
        namaEntitas,
        alamatEntitas,
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
            value={data.entitas7.kodeJenisIdentitas ?? ""}
            options={jenisIdentitasOptions}
            onChange={(value) => updateEntitas7("kodeJenisIdentitas", value)}
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
        value={identityNumber + "0".repeat(6)}
        disabled
      />

      {/* Nama */}
      <InputNormal
        title="Nama"
        value={data.entitas7.namaEntitas ?? ""}
        onChange={(value) => updateEntitas7("namaEntitas", value)}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={data.entitas7.alamatEntitas ?? ""}
        onChange={(value) => updateEntitas7("alamatEntitas", value)}
      />

      {/* Afiliasi */}
      <InputSelect
        label="Afiliasi"
        value={data.entitas7.kodeAfiliasi ?? ""}
        options={kodeAfiliasiOptions}
        onChange={(value) => updateEntitas7("kodeAfiliasi", value)}
      />
    </InputWrapper>
  );
}

import {
  useDocument,
  type DocumentData,
} from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import InputTextArea from "../../input-textarea";
import { jenisIdentitasOptions } from "@/lib/options";

export default function FormNpwpPemusatan() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  function updateEntitas11(
    field: keyof DocumentData["entitas11"],
    value: string,
  ) {
    updateDocumentData({
      ...data,
      entitas11: {
        ...data.entitas11,
        [field]: value,
      },
    });
  }

  const identityNumber = (data.entitas11.nomorIdentitas ?? "").slice(0, -6);

  const updateNitku = (value: string) => {
    const nitku = value + "000000";
    updateEntitas11("nomorIdentitas", nitku);
  };

  function copyImportirData() {
    const { kodeJenisIdentitas, nomorIdentitas, namaEntitas, alamatEntitas } =
      data.entitas1;

    updateDocumentData({
      ...data,
      entitas11: {
        ...data.entitas11,
        kodeJenisIdentitas,
        nomorIdentitas,
        namaEntitas,
        alamatEntitas,
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
            value={data.entitas11.kodeJenisIdentitas ?? ""}
            options={jenisIdentitasOptions}
            onChange={(value) => updateEntitas11("kodeJenisIdentitas", value)}
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
        value={data.entitas11.namaEntitas ?? ""}
        onChange={(value) => updateEntitas11("namaEntitas", value)}
      />

      {/* Alamat */}
      <InputTextArea
        title="Alamat"
        value={data.entitas11.alamatEntitas ?? ""}
        onChange={(value) => updateEntitas11("alamatEntitas", value)}
      />
    </InputWrapper>
  );
}

import { type DocumentData } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputSelect from "../../input-select";
import { jenisIdentitasOptions, kodeJenisApiOptions } from "./options";

type EntitasTabProps = {
  data: DocumentData;
  onChange: (data: DocumentData) => void;
};

export default function EntitasTab({ data, onChange }: EntitasTabProps) {
  function updateEntity(field: keyof DocumentData["entity"], value: string) {
    onChange({
      ...data,
      entity: {
        ...data.entity,
        [field]: value,
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Importir */}
        <InputWrapper title="Importir">
          {/* Nomor Identitas */}
          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Nomor Identitas
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={data.entity.kodeJenisIdentitas ?? ""}
                options={jenisIdentitasOptions}
                onChange={(value) => updateEntity("kodeJenisIdentitas", value)}
              />
              <input
                id="nomorIdentitas"
                type="text"
                value={data.entity.nomorIdentitas ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none"
                onChange={(e) => updateEntity("nomorIdentitas", e.target.value)}
              />
            </div>
          </div>

          {/* Nomor NITKU */}
          <div>
            <label
              htmlFor="nomorNITKU"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nomor NITKU
            </label>
            <input
              id="nomorNITKU"
              type="text"
              value={data.entity.nomorIdentitas ?? ""}
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 outline-none"
            />
          </div>

          {/* Nama */}
          <div>
            <label
              htmlFor="namaEntitas"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              id="namaEntitas"
              type="text"
              value={data.entity.namaEntitas ?? ""}
              onChange={(e) => updateEntity("namaEntitas", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none"
            />
          </div>
          {/* Alamat */}
          <div>
            <label
              htmlFor="alamatEntitas"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Alamat
            </label>
            <input
              id="alamatEntitas"
              type="text"
              value={data.entity.alamatEntitas ?? ""}
              onChange={(e) => updateEntity("alamatEntitas", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none"
            />
          </div>

          {/* API/NIB */}
          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              API/NIB
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={data.entity.kodeJenisApi ?? ""}
                options={kodeJenisApiOptions}
                onChange={(value) => updateEntity("kodeJenisApi", value)}
              />
              <input
                id="nibEntitas"
                type="text"
                value={data.entity.nibEntitas ?? ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none"
                onChange={(e) => updateEntity("nibEntitas", e.target.value)}
              />
            </div>
          </div>
          {/* Status */}
          <div>
            <label
              htmlFor="kodeStatus"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <input
              id="kodeStatus"
              type="text"
              value={data.entity.kodeStatus ?? ""}
              onChange={(e) => updateEntity("kodeStatus", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none"
            />
          </div>
        </InputWrapper>
        {/* Pemilik Barang */}
        <InputWrapper title="Pemilik Barang">
          <div></div>
        </InputWrapper>
        {/* NPWP Pemusatan */}
        <InputWrapper title="NPWP Pemusatan">
          <div></div>
        </InputWrapper>
      </div>
    </div>
  );
}

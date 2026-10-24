"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputDate from "../../input-date";
import { PernyataanData } from "@/app/providers/types";

export default function PernyataanTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const pernyataan = data.pernyataan;

  function updateData(field: keyof PernyataanData, value: string) {
    updateDocumentData({ pernyataan: { ...data.pernyataan, [field]: value } });
  }

  return (
    <div>
      {/* PERNYATAAN */}
      <div className="w-full bg-blue-200 rounded-sm flex gap-2 items-center p-3 mb-4">
        <div className="text-base text-gray-800">
          <p className="font-bold">Dengan ini saya menyatakan:</p>
          <ol className="list-decimal list-outside pl-4 space-y-1">
            <li>
              Bertanggung jawab atas kebenaran hal-hal yang diberitahukan dalam
              dokumen ini dan keabsahan dokumen pelengkap pabean yang menjadi
              dasar pembuatan dokumen ini; dan
            </li>
            <li>
              Sanggup menyiapkan dan menyerahkan barang impor untuk diperiksa,
              serta menyaksikan pemeriksaan fisik. Dalam hal saya tidak memenuhi
              ketentuan ini dalam jangka waktu yang ditetapkan maka saya
              menguasakannya kepada pengusaha Tempat Penimbunan Sementara tempat
              pemeriksaan atas resiko dan biaya saya.
            </li>
          </ol>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Tempat dan Tanggal */}
        <InputWrapper title="Tempat dan Tanggal">
          <InputNormal
            labelPosition="left"
            title="Tempat"
            value={pernyataan.tempat ?? ""}
            onChange={(value) => updateData("tempat", value)}
          />
          <InputDate
            labelPosition="left"
            label="Tanggal"
            value={pernyataan.tanggal ?? ""}
            onChange={(value) => updateData("tanggal", value)}
          />
        </InputWrapper>

        {/* Nama*/}
        <InputWrapper title="Nama">
          <InputNormal
            labelPosition="left"
            title="Nama"
            value={pernyataan.nama ?? ""}
            onChange={(value) => updateData("nama", value)}
          />
          <InputNormal
            labelPosition="left"
            title="Jabatan"
            value={pernyataan.jabatan ?? ""}
            onChange={(value) => updateData("jabatan", value)}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import InputNormal from "../../inputs/input-normal";
import InputDate from "../../inputs/input-date";
import { PernyataanData } from "@/app/types";
import { FileText } from "lucide-react";

export default function PernyataanTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const pernyataan = data.pernyataan;

  function updateData(field: keyof PernyataanData, value: string) {
    updateDocumentData({ pernyataan: { ...data.pernyataan, [field]: value } });
  }

  return (
    <div className="space-y-5">
      {/* PERNYATAAN */}
      <div className="rounded-sm border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-blue-100 text-blue-700">
            <FileText size={18} />
          </div>

          <div className="min-w-0 text-sm leading-relaxed text-slate-700">
            <p className="mb-2 font-semibold text-slate-900">
              Dengan ini saya menyatakan:
            </p>

            <ol className="list-decimal space-y-2 pl-5 marker:font-medium marker:text-slate-500">
              <li>
                Bertanggung jawab atas kebenaran hal-hal yang diberitahukan
                dalam dokumen ini dan keabsahan dokumen pelengkap pabean yang
                menjadi dasar pembuatan dokumen ini; dan
              </li>
              <li>
                Sanggup menyiapkan dan menyerahkan barang impor untuk diperiksa,
                serta menyaksikan pemeriksaan fisik. Dalam hal saya tidak
                memenuhi ketentuan ini dalam jangka waktu yang ditetapkan maka
                saya menguasakannya kepada pengusaha Tempat Penimbunan Sementara
                tempat pemeriksaan atas resiko dan biaya saya.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* TEMPAT DAN TANGGAL */}
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

        {/* NAMA DAN JABATAN */}
        <InputWrapper title="Nama dan Jabatan">
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

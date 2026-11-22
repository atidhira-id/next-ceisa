"use client";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputDate from "@/app/components/inputs/input-date";
import { DeclarationsType } from "@/app/types/draft";
import { FileText } from "lucide-react";

export default function DeclarationTab() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const declaration = data.declarations;

  function updateData(field: keyof DeclarationsType, value: string) {
    updateDraftData({
      declarations: { ...data.declarations, [field]: value },
    });

    markSectionDirty("declarations");
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
            value={declaration.place ?? ""}
            onChange={(value) => updateData("place", value)}
          />

          <InputDate
            labelPosition="left"
            label="Tanggal"
            value={declaration.date ?? ""}
            onChange={(value) => updateData("date", value)}
          />
        </InputWrapper>

        {/* NAMA DAN JABATAN */}
        <InputWrapper title="Nama dan Jabatan">
          <InputNormal
            labelPosition="left"
            title="Nama"
            value={declaration.name ?? ""}
            onChange={(value) => updateData("name", value)}
          />

          <InputNormal
            labelPosition="left"
            title="Jabatan"
            value={declaration.position ?? ""}
            onChange={(value) => updateData("position", value)}
          />
        </InputWrapper>
      </div>
    </div>
  );
}

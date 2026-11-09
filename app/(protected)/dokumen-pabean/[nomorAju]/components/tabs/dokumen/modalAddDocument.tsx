"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { type DocumentItemData } from "@/app/types";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import InputDate from "../../inputs/input-date";
import {
  kodeJenisOptions,
  kodeFasilitasOptions,
} from "@/app/constants/options/dokumenOptions";
import { required } from "@/lib/validation";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

const initialDocument: DocumentItemData = {
  seri: 0,
  kodeDokumen: "",
  nomorDokumen: "",
  tanggalDokumen: "",
  kodeFasilitas: "",
  kodeIjin: "",
};

type ModalAddDocumentItemProps = {
  document?: DocumentItemData;
  onCloseModal: () => void;
};

export default function ModalAddDocumentItem({
  document,
  onCloseModal,
}: ModalAddDocumentItemProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seri = document?.seri ?? data.listDokumen.length + 1;
  const [newDocument, setNewDocument] = useState<DocumentItemData>(
    document ?? { ...initialDocument, seri },
  );

  function handleSimpan() {
    const listDokumen = document
      ? data.listDokumen.map((item) =>
          item.seri === seri ? newDocument : item,
        )
      : [...data.listDokumen, newDocument];
    updateDocumentData({ listDokumen });

    onCloseModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-2 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-md max-h-[90dvh] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              {document ? "Edit Dokumen Lampiran" : "Dokumen Lampiran"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCloseModal}
            aria-label="Tutup modal"
            className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 hover:cursor-pointer"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Seri */}
          <InputNormal title="Seri" value={seri.toString()} disabled />

          {/* Jenis Dokumen */}
          <InputSelect
            label="Jenis Dokumen"
            options={kodeJenisOptions}
            value={newDocument.kodeDokumen}
            onChange={(value) =>
              setNewDocument({ ...newDocument, kodeDokumen: value })
            }
            rules={[required()]}
          />

          {/* Nomor Dokumen */}
          <InputNormal
            title="Nomor Dokumen"
            value={newDocument.nomorDokumen}
            onChange={(value) =>
              setNewDocument({ ...newDocument, nomorDokumen: value })
            }
            rules={[required()]}
          />

          {/* Tanggal */}
          <InputDate
            label="Tanggal"
            value={newDocument.tanggalDokumen}
            onChange={(value) =>
              setNewDocument({ ...newDocument, tanggalDokumen: value })
            }
            rules={[required()]}
          />

          {/* Fasilitas Dokumen */}
          {newDocument.kodeDokumen == "861" && (
            <InputSelect
              label="Fasilitas Dokumen"
              options={kodeFasilitasOptions}
              value={newDocument.kodeFasilitas ?? ""}
              onChange={(value) =>
                setNewDocument({ ...newDocument, kodeFasilitas: value })
              }
              rules={[required()]}
            />
          )}

          {/* Kode Izin */}
          {newDocument.kodeDokumen == "888" && (
            <InputNormal
              title="Kode Izin"
              value={newDocument.kodeIjin ?? ""}
              onChange={(value) =>
                setNewDocument({ ...newDocument, kodeIjin: value })
              }
              rules={[required()]}
            />
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <div className="ml-auto flex gap-2">
            <NormalButton variant={"inverted"} onClick={onCloseModal}>
              Batal
            </NormalButton>

            <NormalButton onClick={handleSimpan}>Simpan</NormalButton>
          </div>
        </div>
      </div>
    </div>
  );
}

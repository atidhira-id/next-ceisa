import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import type { BarangDokumenData } from "@/app/types";
import { kodeJenisOptions } from "@/app/constants/options/dokumenOptions";
import InputNumber from "@/app/components/inputs/input-number";
import { getLabel } from "@/lib/utils";
import { NormalButton } from "@/app/components/buttons";

type ModalDokumenFasilitasProps = {
  onCloseModal: () => void;
  selectedDocuments: BarangDokumenData[];
  onSaveDocuments: (documents: BarangDokumenData[]) => void;
};

export function ModalDokumenFasilitas({
  onCloseModal,
  selectedDocuments: initialSelectedDocuments,
  onSaveDocuments,
}: ModalDokumenFasilitasProps) {
  const filteredKodeDokumen = ["705", "380", "465"];
  const { documentData } = useDocument();
  const data = documentData!;
  const selectableDocuments = data.listDokumen.filter(
    (document) => !filteredKodeDokumen.includes(document.kodeDokumen),
  );
  const selectableDocumentNumbers = new Set(
    selectableDocuments.map((document) => document.nomorDokumen),
  );
  const [selectedDocuments, setSelectedDocuments] = useState(
    () =>
      new Set(
        initialSelectedDocuments
          .map((document) => document.nomorDokumen)
          .filter((documentNumber) =>
            selectableDocumentNumbers.has(documentNumber),
          ),
      ),
  );
  const [documentOrderNumbers, setDocumentOrderNumbers] = useState(
    () =>
      new Map(
        initialSelectedDocuments.map((document) => [
          document.nomorDokumen,
          document.nomorUrut,
        ]),
      ),
  );
  const allDocumentsSelected =
    selectableDocuments.length > 0 &&
    selectableDocuments.every((document) =>
      selectedDocuments.has(document.nomorDokumen),
    );

  function toggleDocument(documentNumber: string, isSelected: boolean) {
    setSelectedDocuments((current) => {
      const next = new Set(current);
      if (isSelected) {
        next.add(documentNumber);
      } else {
        next.delete(documentNumber);
      }
      return next;
    });
  }

  function toggleAllDocuments(isSelected: boolean) {
    setSelectedDocuments(
      isSelected ? new Set(selectableDocumentNumbers) : new Set(),
    );
  }

  function updateOrderNumber(documentNumber: string, orderNumber: number) {
    setDocumentOrderNumbers((current) => {
      const next = new Map(current);
      next.set(documentNumber, orderNumber);
      return next;
    });
  }

  function handleSave() {
    const documentsToSave = Array.from(selectedDocuments, (nomorDokumen) => ({
      nomorDokumen,
      nomorUrut: documentOrderNumbers.get(nomorDokumen) ?? 0,
    })).filter((document) =>
      selectableDocumentNumbers.has(document.nomorDokumen),
    );
    onSaveDocuments(documentsToSave);
    onCloseModal();
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-2 sm:p-4">
      <div className="w-full max-w-5xl max-h-[90dvh] flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Daftar Dokumen Lampiran
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

        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6 relative">
          <div className="overflow-x-auto rounded-sm border border-slate-200">
            <table className="w-full min-w-212 border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10 bg-slate-100">
                <tr>
                  {selectableDocuments.length > 0 && (
                    <th className="w-16 px-4 py-3 font-medium text-gray-600">
                      <input
                        type="checkbox"
                        aria-label="Pilih semua dokumen"
                        checked={allDocumentsSelected}
                        onChange={(event) =>
                          toggleAllDocuments(event.target.checked)
                        }
                      />
                    </th>
                  )}

                  <th className="w-16 px-4 py-3 font-medium text-gray-600">
                    Seri
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">Jenis</th>

                  <th className="px-4 py-3 font-medium text-gray-600">Nomor</th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Fasilitas
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Kode Izin
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Nomor Urut di Izin
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">File</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {selectableDocuments.map((document) => (
                  <tr key={document.seri} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Pilih dokumen ${document.nomorDokumen}`}
                        checked={selectedDocuments.has(document.nomorDokumen)}
                        onChange={(event) =>
                          toggleDocument(
                            document.nomorDokumen,
                            event.target.checked,
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{document.seri}</td>

                    <td className="px-4 py-3">
                      {getLabel(kodeJenisOptions, document.kodeDokumen)}
                    </td>

                    <td className="px-4 py-3">{document.nomorDokumen}</td>

                    <td className="px-4 py-3">{document.tanggalDokumen}</td>
                    <td className="px-4 py-3">{document.kodeFasilitas}</td>
                    <td className="px-4 py-3">{document.kodeIjin}</td>
                    <td className="px-4 py-3">
                      <InputNumber
                        value={
                          documentOrderNumbers.get(document.nomorDokumen) ?? 0
                        }
                        onChange={(value) =>
                          updateOrderNumber(document.nomorDokumen, value)
                        }
                      />
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                ))}

                {!selectableDocuments.length && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center">
                      Belum Ada Data. Silahkan isi dokumen lampiran di tab
                      Dokumen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <div className="ml-auto flex gap-2">
            <NormalButton variant={"inverted"} onClick={onCloseModal}>
              Batal
            </NormalButton>

            <NormalButton onClick={handleSave}>Simpan</NormalButton>
          </div>
        </div>
      </div>
    </div>
  );
}

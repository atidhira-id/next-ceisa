"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { getLabel } from "@/app/lib/utils";
import type { DocumentItemType } from "@/app/types/draft";
import ModalAddDocumentItem from "./modalAddDocument";
import { Warning } from "../../warning";
import ModalUserConfirmation from "@/app/components/modalUserConfirmation";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import { NormalButton } from "@/app/components/buttons";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";
import { useOptions } from "@/app/hooks/useOptions";

export default function DocumentsTab() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const documents = draft!.documents;

  const documentTypes = useOptions("DOCUMENT_TYPE");
  const facilitiesCode = useOptions("DOCUMENT_FACILITY");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState<DocumentItemType | null>(
    null,
  );
  const [documentToDelete, setDocumentToDelete] =
    useState<DocumentItemType | null>(null);

  const handleEdit = (document: DocumentItemType) => {
    setDocumentToEdit(document);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (!documentToDelete) return;
    let documentList = documents.filter(
      (doc) => doc.series !== documentToDelete.series,
    );

    documentList = documentList.map((doc, index) => {
      return {
        ...doc,
        series: index + 1,
      };
    });

    updateDraftData({
      documents: documentList,
    });
    setDocumentToDelete(null);

    markSectionDirty("documents");
  };

  return (
    <div>
      {/* Warning */}
      <Warning text="Wajib Melampirkan Dokumen Invoice dan Dokumen B/L atau AWB" />

      <InputWrapper
        title="Dokumen Lampiran"
        headerChildren={
          <NormalButton onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Tambah Dokumen
          </NormalButton>
        }
      >
        {/* TABLE */}
        <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="w-16 px-4 py-3 text-center font-semibold text-slate-600">
                    Seri
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Jenis
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Nomor
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Fasilitas Dokumen
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Ijin Dokumen
                  </th>
                  <th className="w-24 px-4 py-3 text-center font-semibold text-slate-600">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {documents.map((document) => (
                  <tr
                    key={`${document.series}-${document.documentNumber}`}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-center font-medium tabular-nums text-slate-700">
                      {document.series}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getLabel(documentTypes.options, document.documentCode)}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-700">
                      {document.documentNumber}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {document.documentDate}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {getLabel(
                        facilitiesCode.options,
                        document.facilityCode ?? "",
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {document.permissionCode}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(document)}
                          title="Edit dokumen"
                          aria-label="Edit dokumen"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                          <SquareArrowOutUpRight size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDocumentToDelete(document)}
                          title="Hapus dokumen"
                          aria-label="Hapus dokumen"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        >
                          <Trash size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {documents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-sm text-slate-400"
                    >
                      Belum ada dokumen yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalAddDocumentItem
            document={documentToEdit ?? undefined}
            onCloseModal={() => {
              setIsModalOpen(false);
              setDocumentToEdit(null);
            }}
          />
        )}

        {documentToDelete && (
          <ModalUserConfirmation
            handleYes={handleDelete}
            handleNo={() => setDocumentToDelete(null)}
          />
        )}
      </InputWrapper>
    </div>
  );
}

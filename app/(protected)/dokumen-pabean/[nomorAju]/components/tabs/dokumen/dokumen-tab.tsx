"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import ModalAddDocumentItem from "./modal-add-document";
import { Warning } from "../../warning";
import {
  kodeJenisOptions,
  kodeFasilitasOptions,
} from "@/app/constants/dokumen-options";
import { getLabel } from "@/lib/utils";
import type { DocumentItemData } from "@/app/providers/types";
import ModalUserConfirmation from "@/app/(protected)/dokumen-pabean/components/modal-user-confirmation";
import InputWrapper from "../../input-wrapper";

export default function DokumenTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [documentToEdit, setDocumentToEdit] = useState<DocumentItemData | null>(
    null,
  );
  const [documentToDelete, setDocumentToDelete] =
    useState<DocumentItemData | null>(null);

  const handleEdit = (document: DocumentItemData) => {
    setDocumentToEdit(document);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (!documentToDelete) return;
    let documentList = data.listDokumen.filter(
      (doc) => doc.seri !== documentToDelete.seri,
    );

    documentList = documentList.map((doc, index) => {
      return {
        ...doc,
        seri: index + 1,
      };
    });

    updateDocumentData({
      listDokumen: documentList,
    });
    setDocumentToDelete(null);
  };

  return (
    <div>
      {/* Warning */}
      <Warning text="Wajib Melampirkan Dokumen Invoice dan Dokumen B/L atau AWB" />

      <InputWrapper
        title="Dokumen Lampiran"
        headerChildren={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-gray-900 px-3 m-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Tambah Dokumen
          </button>
        }
      >
        {/* Table */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="w-16 px-4 py-3 font-medium text-gray-600">
                    Seri
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">Jenis</th>

                  <th className="px-4 py-3 font-medium text-gray-600">Nomor</th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Fasilits Dokumen
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Ijin Dokumen
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600"></th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.listDokumen.map((document) => (
                  <tr
                    key={`${document.seri}-${document.nomorDokumen}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">{document.seri}</td>

                    <td className="px-4 py-3">
                      {getLabel(kodeJenisOptions, document.kodeDokumen)}
                    </td>

                    <td className="px-4 py-3">{document.nomorDokumen}</td>

                    <td className="px-4 py-3">{document.tanggalDokumen}</td>
                    <td className="px-4 py-3">
                      {getLabel(
                        kodeFasilitasOptions,
                        document.kodeFasilitas ?? "",
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {getLabel(
                        kodeFasilitasOptions,
                        document.kodeFasilitas ?? "",
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(document)}
                        className="mr-4 text-blue-600 hover:text-blue-800 hover:underline hover:cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDocumentToDelete(document)}
                        className="text-red-600 hover:text-red-800 hover:underline hover:cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
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

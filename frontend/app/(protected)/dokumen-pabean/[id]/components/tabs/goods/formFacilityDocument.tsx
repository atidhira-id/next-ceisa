"use client";

import { useState } from "react";
import type { GoodsItemType } from "@/app/types/draft";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNumber from "@/app/components/inputs/input-number";
import { NormalButton } from "@/app/components/buttons";
import { Plus, Trash } from "lucide-react";
import { useOptions } from "@/app/hooks/useOptions";
import { getLabel } from "@/app/lib/utils";
import { useDraft } from "@/app/providers/draftProvider";
import { ModalFacilityDocument } from "./modalFacilityDocument";

type Props = {
  item: GoodsItemType;
  updateDocuments: (documents: NonNullable<GoodsItemType["documents"]>) => void;
};

export default function FormFacilityDocument({ item, updateDocuments }: Props) {
  const { draft } = useDraft();
  const data = draft!;
  const documentTypes = useOptions("DOCUMENT_TYPE");

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  function removeDocument(documentNumber: string) {
    updateDocuments(
      (item.documents ?? []).filter(
        (document) => document.documentNumber !== documentNumber,
      ),
    );
  }

  return (
    <InputWrapper
      title="Dokumen Lampiran"
      headerChildren={
        <NormalButton onClick={() => setIsDocumentModalOpen(true)}>
          <Plus size={16} />
          Tambah
        </NormalButton>
      }
    >
      {isDocumentModalOpen && (
        <ModalFacilityDocument
          onCloseModal={() => setIsDocumentModalOpen(false)}
          selectedDocuments={item.documents ?? []}
          onSaveDocuments={updateDocuments}
        />
      )}

      {item.documents?.length ? (
        <div className="overflow-hidden rounded-sm border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  {[
                    "Seri",
                    "Jenis",
                    "Nomor",
                    "Tanggal",
                    "Fasilitas",
                    "Kode Izin",
                    "Nomor Urut di Izin",
                    "File",
                    "",
                  ].map((title, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 font-medium text-gray-600"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {item.documents.map((doc) => {
                  const document = data.documents.find(
                    (entry) => entry.documentNumber === doc.documentNumber,
                  );

                  if (!document) {
                    return (
                      <tr key={doc.documentNumber}>
                        <td colSpan={9} className="px-4 py-3 text-red-600">
                          Gagal menampilkan dokumen {doc.documentNumber}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={document.documentNumber}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {document.series}
                      </td>
                      <td className="px-4 py-3">
                        {getLabel(documentTypes.options, document.documentCode)}
                      </td>
                      <td className="px-4 py-3">{document.documentNumber}</td>
                      <td className="px-4 py-3">{document.documentDate}</td>
                      <td className="px-4 py-3">{document.facilityCode}</td>
                      <td className="px-4 py-3">{document.permissionCode}</td>
                      <td className="px-4 py-3">
                        {doc.documentSequence ? (
                          <InputNumber value={doc.documentSequence} disabled />
                        ) : null}
                      </td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            removeDocument(document.documentNumber)
                          }
                          aria-label={`Hapus dokumen ${document.documentNumber}`}
                          title="Hapus dokumen"
                          className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-sm text-center">Belum Ada Data</p>
      )}
    </InputWrapper>
  );
}

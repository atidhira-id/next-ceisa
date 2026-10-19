import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import ModalAddDocumentItem from "./modal-add-document";
import { jenisDokumenLampiranOptions } from "@/lib/options";

export default function DokumenTab() {
  const { documentData } = useDocument();
  const data = documentData!;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDocumentCode = (code: string) => {
    const option = jenisDokumenLampiranOptions.find(
      (item) => item.value === code,
    );

    return option?.label;
  };

  return (
    <div>
      {/* Warning */}
      <div className="w-full bg-yellow-200 rounded-sm flex gap-2 items-center p-3 mb-4">
        <div className="w-5 h-5 rounded-full bg-yellow-500 flex justify-center items-center p-1">
          !
        </div>
        <div className="text-sm text-gray-800">
          Wajib Melampirkan Dokumen Invoice dan Dokumen B/L atau AWB
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dokumen Lampiran</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah Dokumen
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalAddDocumentItem onCloseModal={() => setIsModalOpen(false)} />
      )}

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

                <th className="px-4 py-3 font-medium text-gray-600">Tanggal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.listDokumen.map((document) => (
                <tr key={document.seri} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{document.seri}</td>

                  <td className="px-4 py-3">
                    {getDocumentCode(document.kodeDokumen)}
                  </td>

                  <td className="px-4 py-3">{document.nomorDokumen}</td>

                  <td className="px-4 py-3">{document.tanggalDokumen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

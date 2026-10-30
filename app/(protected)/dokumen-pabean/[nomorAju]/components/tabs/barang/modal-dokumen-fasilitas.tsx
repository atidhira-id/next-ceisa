import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import { kodeJenisOptions } from "@/app/constants/dokumen-options";
import InputNumber from "../../input-number";
import { getLabel } from "@/lib/utils";

type ModalDokumenFasilitasProps = {
  onCloseModal: () => void;
};

export default function ModalDokumenFasilitas({
  onCloseModal,
}: ModalDokumenFasilitasProps) {
  const { documentData } = useDocument();
  const data = documentData!;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl rounded-lg bg-white shadow-xl">
        <InputWrapper
          title="Daftar Dokumen"
          headerChildren={
            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-md bg-gray-900 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              X
            </button>
          }
        >
          <div className="overflow-hidden rounded-lg border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="w-16 px-4 py-3 font-medium text-gray-600">
                      Seri
                    </th>

                    <th className="px-4 py-3 font-medium text-gray-600">
                      Jenis
                    </th>

                    <th className="px-4 py-3 font-medium text-gray-600">
                      Nomor
                    </th>

                    <th className="px-4 py-3 font-medium text-gray-600">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Fasilitas
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      Nomor Urut di Izin
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-600">
                      File
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {data.listDokumen.map((document) => (
                    <tr key={document.seri} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{document.seri}</td>

                      <td className="px-4 py-3">
                        {getLabel(kodeJenisOptions, document.kodeDokumen)}
                      </td>

                      <td className="px-4 py-3">{document.nomorDokumen}</td>

                      <td className="px-4 py-3">{document.tanggalDokumen}</td>
                      <td className="px-4 py-3">{document.kodeFasilitas}</td>
                      <td className="px-4 py-3">
                        <InputNumber value={0} />
                      </td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t py-4">
            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Simpan
            </button>
          </div>
        </InputWrapper>
      </div>
    </div>
  );
}

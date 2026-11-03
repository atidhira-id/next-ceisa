import { useDocument } from "@/app/providers/document-provider";
import { PungutanKeys } from "@/app/types";
import { formatRupiah, getPungutan } from "@/lib/utils";

export default function PungutanTab() {
  const { documentData } = useDocument();
  const data = documentData!;

  const pungutanList: PungutanKeys[] = ["bm", "ppn", "pph", "total"];
  const pungutan = getPungutan(data.transaksi, data.listBarang);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pungutan</h1>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr className="text-center">
                <th className="w-16 px-4 py-3 font-medium text-gray-600">
                  Pungutan
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Dibayar</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Ditanggung Pemerintah
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Ditunda</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Tidak Dipungut
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Dibebaskan
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Sudah Dilunasi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {pungutanList.map((title) => (
                <tr key={title}>
                  <td className="p-4 text-center uppercase">{title}</td>
                  <td className="p-4 text-center">
                    {formatRupiah(pungutan[title])}
                  </td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

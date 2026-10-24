export default function PungutanTab() {
  const pungutan = [];
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
              <tr>
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
              {pungutan.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    Belum ada pungutan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

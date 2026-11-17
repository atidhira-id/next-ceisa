import { useDraft } from "@/app/providers/draftProvider";
import { LevyKeys } from "@/app/types";
import { formatToRupiah, getLevy } from "@/lib/utils";

export default function LevyTab() {
  const { draft: documentData } = useDraft();
  const data = documentData!;

  const levyKeys: LevyKeys[] = ["bm", "ppn", "pph", "total"];
  const levy = getLevy(data.transactions, data.goods);

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Pungutan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ringkasan nilai pungutan berdasarkan jenis pembayaran.
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-sm border border-slate-200 bg-white ">
        <div className="overflow-x-auto">
          <table className="w-full min-w-237 text-sm">
            <thead className="sticky top-0 z-10 bg-slate-100">
              <tr className="text-center">
                <th className="w-32 border-b border-r border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                  Pungutan
                </th>

                <th className="border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Dibayar
                </th>

                <th className="border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Ditanggung Pemerintah
                </th>

                <th className="border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Ditunda
                </th>

                <th className="border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Tidak Dipungut
                </th>

                <th className="border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Dibebaskan
                </th>

                <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                  Sudah Dilunasi
                </th>
              </tr>
            </thead>

            <tbody>
              {levyKeys.map((title) => (
                <tr key={title} className="transition-colors hover:bg-slate-50">
                  <td className="border-b border-r border-slate-100 px-4 py-3 font-semibold uppercase text-slate-700">
                    {title}
                  </td>

                  <td className="border-b border-r border-slate-100 px-4 py-3 text-right font-medium tabular-nums text-slate-800">
                    {formatToRupiah(levy[title])}
                  </td>

                  <td className="border-b border-r border-slate-100 px-4 py-3 text-center text-slate-400">
                    -
                  </td>

                  <td className="border-b border-r border-slate-100 px-4 py-3 text-center text-slate-400">
                    -
                  </td>

                  <td className="border-b border-r border-slate-100 px-4 py-3 text-center text-slate-400">
                    -
                  </td>

                  <td className="border-b border-r border-slate-100 px-4 py-3 text-center text-slate-400">
                    -
                  </td>

                  <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-400">
                    -
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

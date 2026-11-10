"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { Warning } from "../../warning";
import ModalAddBarang from "./modalAddBarang";
import InputWrapper from "../../inputs/input-wrapper";
import ModalUserConfirmation from "@/app/(protected)/dokumen-pabean/components/modalUserConfirmation";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BarangTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<
    (typeof data.listBarang)[number] | null
  >(null);
  const [barangToDelete, setBarangToDelete] = useState<
    (typeof data.listBarang)[number] | null
  >(null);

  const totalBarangHargaInvoice = data.listBarang.reduce(
    (total, barang) => total + (barang.hargaInvoice ?? 0),
    0,
  );
  const totalBarangBeratBersih = data.listBarang.reduce(
    (total, barang) => total + (barang.beratBersih ?? 0),
    0,
  );
  const transaksiHargaInvoice = data.transaksi.komponenBiaya?.hargaInvoice ?? 0;
  const transaksiBeratKotor = data.transaksi.beratKotor ?? 0;
  const isBarangEmpty = data.listBarang.length === 0;
  const priceDifference = Math.abs(
    totalBarangHargaInvoice - transaksiHargaInvoice,
  );
  const hasCifMismatch =
    !isBarangEmpty && totalBarangHargaInvoice !== transaksiHargaInvoice;
  const hasBeratMismatch =
    !isBarangEmpty && totalBarangBeratBersih > transaksiBeratKotor;

  function handleOpenBarangModal(barang?: (typeof data.listBarang)[number]) {
    setSelectedBarang(barang ?? null);
    setIsModalOpen(true);
  }

  function handleCloseBarangModal() {
    setIsModalOpen(false);
    setSelectedBarang(null);
  }

  function handleDeleteBarang(seri: number) {
    const nextBarang = data.listBarang
      .filter((barang) => barang.seri !== seri)
      .map((barang, index) => ({ ...barang, seri: index + 1 }));

    updateDocumentData({ listBarang: nextBarang });
    setBarangToDelete(null);
  }

  return (
    <div>
      {isBarangEmpty && <Warning text="Wajib mengisi data barang" />}

      {hasCifMismatch && (
        <Warning
          text={`CIF barang (${formatCurrency(totalBarangHargaInvoice)}) tidak sama dengan CIF transaksi (${formatCurrency(transaksiHargaInvoice)}). Selisih ${formatCurrency(priceDifference)}`}
        />
      )}

      {hasBeratMismatch && (
        <Warning
          text={`Total berat bersih barang (${totalBarangBeratBersih.toLocaleString("id-ID")}) melebihi berat kotor transaksi (${transaksiBeratKotor.toLocaleString("id-ID")})`}
        />
      )}

      {/* Header */}
      <InputWrapper
        title="Barang"
        headerChildren={
          <NormalButton onClick={() => handleOpenBarangModal()}>
            <Plus size={16} /> Tambah
          </NormalButton>
        }
      >
        {/* Table */}
        <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="w-16 px-4 py-3 font-semibold text-slate-600">
                    Seri
                  </th>

                  <th className="w-52 px-4 py-3 font-semibold text-slate-600">
                    Pos Tarif/HS
                  </th>

                  <th className="min-w-36 px-4 py-3 font-semibold text-slate-600">
                    Uraian Jenis Barang
                  </th>

                  <th className="w-40 px-4 py-3 font-semibold text-slate-600">
                    Nilai Barang
                  </th>

                  <th className="w-32 px-4 py-3 font-semibold text-slate-600">
                    Jumlah Satuan
                  </th>

                  <th className="w-36 px-4 py-3 font-semibold text-slate-600">
                    Berat Bersih (kg)
                  </th>

                  <th className="w-24 px-4 py-3 text-right font-semibold text-slate-600">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.listBarang.map((barang) => (
                  <tr
                    key={barang.seri}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium tabular-nums text-slate-700">
                      {barang.seri}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-700">
                      {barang.hs}
                    </td>

                    <td className="whitespace-pre-line px-4 py-3 text-slate-600">
                      {barang.uraianJenisBarang}
                    </td>

                    <td className="px-4 py-3 font-medium tabular-nums text-slate-700">
                      {formatCurrency(barang.hargaInvoice ?? 0)}
                    </td>

                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {barang.jumlah}
                    </td>

                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {barang.beratBersih}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenBarangModal(barang)}
                          title="Buka barang"
                          aria-label="Buka barang"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <SquareArrowOutUpRight size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setBarangToDelete(barang)}
                          title="Hapus barang"
                          aria-label="Hapus barang"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!data.listBarang.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Belum ada data barang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalAddBarang
            key={selectedBarang?.seri ?? "new-barang"}
            onCloseModal={handleCloseBarangModal}
            barangToEdit={selectedBarang}
          />
        )}

        {barangToDelete && (
          <ModalUserConfirmation
            title="Hapus Barang"
            description="Apakah Anda yakin ingin menghapus barang ini?"
            handleYes={() => handleDeleteBarang(barangToDelete.seri ?? 0)}
            handleNo={() => setBarangToDelete(null)}
          />
        )}
      </InputWrapper>
    </div>
  );
}

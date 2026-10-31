"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { Warning } from "../../warning";
import ModalAddBarang from "./modal-add-barang";
import InputWrapper from "../../input-wrapper";
import ModalUserConfirmation from "@/app/(protected)/dokumen-pabean/components/modal-user-confirmation";
import { Trash, SquareArrowOutUpRight } from "lucide-react";

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
          <button
            type="button"
            onClick={() => handleOpenBarangModal()}
            className="rounded-md bg-gray-900 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Tambah
          </button>
        }
      >
        {/* Modal */}
        {isModalOpen && (
          <ModalAddBarang
            key={selectedBarang?.seri ?? "new-barang"}
            onCloseModal={handleCloseBarangModal}
            barangToEdit={selectedBarang}
          />
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

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Pos Tarif/HS
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Uraian Jenis Barang
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Nilai Barang
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Jumlah Satuan
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Berat Bersih (kg)
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600"></th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.listBarang.map((barang) => (
                  <tr key={barang.seri} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{barang.seri}</td>

                    <td className="px-4 py-3">{barang.hs?.kode}</td>
                    <td className="px-4 py-3 whitespace-pre-line">
                      {barang.uraianJenisBarang}
                    </td>
                    <td className="px-4 py-3">
                      {formatCurrency(barang.hargaInvoice ?? 0)}
                    </td>
                    <td className="px-4 py-3">{barang.jumlah}</td>
                    <td className="px-4 py-3">{barang.beratBersih}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenBarangModal(barang)}
                        title="Buka barang"
                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:cursor-pointer"
                      >
                        <SquareArrowOutUpRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setBarangToDelete(barang)}
                        title="Hapus barang"
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:cursor-pointer"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

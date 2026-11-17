"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { Warning } from "../../warning";
import ModalAddItem from "./modalAddItem";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import ModalUserConfirmation from "@/app/components/modalUserConfirmation";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";
import { GoodsItemType } from "@/app/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function GoodsTab() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const transaction = data.transactions;
  const goods = data.goods;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    GoodsItemType[][number] | null
  >(null);
  const [itemToDelete, setItemToDelete] = useState<
    GoodsItemType[][number] | null
  >(null);

  const totalProceGoods = goods.reduce(
    (total, item) => total + (item.invoicePrice ?? 0),
    0,
  );
  const totalWeightGoods = goods.reduce(
    (total, item) => total + (item.netWeight ?? 0),
    0,
  );
  const transactionInvoicePrice = transaction.costComponents?.invoicePrice ?? 0;
  const transactionGrossWeight = transaction.grossWeight ?? 0;
  const isGoodsEmpty = goods.length === 0;
  const priceDifference = Math.abs(totalProceGoods - transactionInvoicePrice);
  const hasCifMismatch =
    !isGoodsEmpty && totalProceGoods !== transactionInvoicePrice;
  const hasWeightMismatch =
    !isGoodsEmpty && totalWeightGoods > transactionGrossWeight;

  function handleOpenBarangModal(barang?: GoodsItemType[][number]) {
    setSelectedItem(barang ?? null);
    setIsModalOpen(true);
  }

  function handleCloseGoodsModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  function handleDeleteItem(series: number) {
    const nextItem = goods
      .filter((item) => item.series !== series)
      .map((item, index) => ({ ...item, series: index + 1 }));

    updateDocumentData({ goods: nextItem });
    setItemToDelete(null);
  }

  return (
    <div>
      {isGoodsEmpty && <Warning text="Wajib mengisi data barang" />}

      {hasCifMismatch && (
        <Warning
          text={`CIF barang (${formatCurrency(totalProceGoods)}) tidak sama dengan CIF transaksi (${formatCurrency(transactionInvoicePrice)}). Selisih ${formatCurrency(priceDifference)}`}
        />
      )}

      {hasWeightMismatch && (
        <Warning
          text={`Total berat bersih barang (${totalWeightGoods.toLocaleString("id-ID")}) melebihi berat kotor transaksi (${transactionGrossWeight.toLocaleString("id-ID")})`}
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
                {goods.map((item) => (
                  <tr
                    key={item.series}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium tabular-nums text-slate-700">
                      {item.series}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-700">
                      {item.hsCode}
                    </td>

                    <td className="whitespace-pre-line px-4 py-3 text-slate-600">
                      {item.description}
                    </td>

                    <td className="px-4 py-3 font-medium tabular-nums text-slate-700">
                      {formatCurrency(item.invoicePrice ?? 0)}
                    </td>

                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {item.quantity}
                    </td>

                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {item.netWeight}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenBarangModal(item)}
                          title="Buka barang"
                          aria-label="Buka barang"
                          className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <SquareArrowOutUpRight size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
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

                {!goods.length && (
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
          <ModalAddItem
            key={selectedItem?.series ?? "new-barang"}
            onCloseModal={handleCloseGoodsModal}
            itemToEdit={selectedItem}
          />
        )}

        {itemToDelete && (
          <ModalUserConfirmation
            title="Hapus Barang"
            description="Apakah Anda yakin ingin menghapus barang ini?"
            handleYes={() => handleDeleteItem(itemToDelete.series ?? 0)}
            handleNo={() => setItemToDelete(null)}
          />
        )}
      </InputWrapper>
    </div>
  );
}

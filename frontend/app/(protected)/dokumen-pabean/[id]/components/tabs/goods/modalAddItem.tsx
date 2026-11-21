"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import type { GoodsItemType } from "@/app/types/draft";

import FormItemDetail from "./formItemDetail";
import FormFacilityDocument from "./formFacilityDocument";
import FormLevy from "./formLevy";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";
import { saveDraft, validateItem } from "@/app/services/draft.service";

type ModalAddItemProps = {
  onCloseModal: () => void;
  itemToEdit?: GoodsItemType | null;
};

export default function ModalAddItem({
  onCloseModal,
  itemToEdit,
}: ModalAddItemProps) {
  const { draft, updateDraftData } = useDraft();
  const data = draft!;
  const goods = data.goods;

  const initialItem: GoodsItemType = {};
  const series = data.goods.length + 1;
  const existingGoodsInvoicePrices = data.goods
    .filter((item) => item.series !== itemToEdit?.series)
    .reduce((total, item) => total + (item.invoicePrice ?? 0), 0);
  const defaultInvoicePrice = Math.max(
    0,
    (data.transactions.costComponents?.invoicePrice ?? 0) -
      existingGoodsInvoicePrices,
  );

  const [item, setItem] = useState<GoodsItemType>(
    itemToEdit ?? {
      ...initialItem,
      series: series,
      invoicePrice: defaultInvoicePrice,
    },
  );

  function updateData(
    field: keyof GoodsItemType,
    value: number | string | boolean,
  ) {
    setItem((prev) => ({ ...prev, [field]: value }));
  }

  function updateSpecs(field: string, value: string) {
    setItem({
      ...item,
      specifications: { ...item.specifications, [field]: value },
    });
  }

  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    { field: string; message: string }[]
  >([]);

  async function handleSave() {
    try {
      console.log(item);
      setIsValidating(true);
      setValidationErrors([]);

      const result = await validateItem("goods", item);
      if (!result.valid) {
        setValidationErrors(result.errors);
        return;
      }

      const goodsList = itemToEdit
        ? goods.map((i) => (i.series === series ? item : i))
        : [...goods, item];
      await saveDraft(draft!.id, "goods", goodsList);

      updateDraftData({ goods: goodsList });

      onCloseModal();
    } catch (error) {
      setValidationErrors([
        {
          field: "",
          message:
            error instanceof Error
              ? error.message
              : "Gagal memvalidasi dokumen.",
        },
      ]);
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <ModalWrapper className="w-full max-w-7xl flex flex-col overflow-hidden">
      <ModalHeader title="Informasi Barang" onCloseModal={onCloseModal}>
        <p className="mt-1 text-base text-slate-500">
          Informasi terkait barang import / eksport.
        </p>
      </ModalHeader>

      <ModalContent className="min-h-0 flex-1 overflow-auto p-4 sm:p-6 relative">
        <div className="overflow-x-auto flex flex-col gap-4">
          <FormItemDetail
            item={item}
            updateData={updateData}
            updateSpecs={updateSpecs}
          />

          <FormFacilityDocument
            item={item}
            updateDocuments={(documents) =>
              setItem((current) => ({
                ...current,
                documents,
              }))
            }
          />

          <FormLevy item={item} updateData={updateData} />
        </div>

        {validationErrors.length > 0 && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {validationErrors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
      </ModalContent>

      {/* Footer */}
      <ModalFooter
        textYes={isValidating ? "Memvalidasi..." : "Simpan"}
        disabled={isValidating}
        handleYes={handleSave}
        handleNo={onCloseModal}
      >
        <p className="hidden text-xs text-slate-500 sm:block">
          Pastikan seluruh data barang sudah sesuai.
        </p>
      </ModalFooter>
    </ModalWrapper>
  );
}

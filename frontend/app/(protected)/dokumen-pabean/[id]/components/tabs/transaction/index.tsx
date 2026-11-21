"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { useOptions } from "@/app/hooks/useOptions";
import { required } from "@/app/lib/validation";
import {
  getTotalNetWeight,
  getIncrementalCost,
  getDeductionFees,
  getCustomsInRupiah,
} from "@/app/lib/utils";
import { TransactionType } from "@/app/types/draft";

import ModalCostComponents from "./modalCostComponents";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputNumber from "@/app/components/inputs/input-number";
import InputRadio from "@/app/components/inputs/input-radio";
import { NormalButton } from "@/app/components/buttons";

export default function TransactionTab() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const transaction = draft!.transactions;
  const goods = draft!.goods;

  const currency = useOptions("CURRENCY");
  const transactionTypes = useOptions("TRANSACTION_TYPE");
  const insuranceCodes = useOptions("INSURANCE_TYPE");
  const proportionalCals = useOptions("PROPORTIONAL_CALCULATION");

  const [isModalOpen, setIsModalOpen] = useState(false);

  function updateTransaction(
    field: keyof TransactionType,
    value: string | number,
  ) {
    updateDraftData({ transactions: { ...transaction, [field]: value } });

    markSectionDirty("transactions");
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Harga */}
        <InputWrapper title="Harga">
          <InputSelect
            label="Jenis Valuta"
            value={transaction.currencyCode ?? ""}
            options={currency.options}
            onChange={(value) => updateTransaction("currencyCode", value)}
            rules={[required()]}
          />

          <InputNumber
            title="NDPBM"
            value={transaction.exchangeRate ?? 0}
            onChange={(value) => updateTransaction("exchangeRate", value)}
            rules={[required()]}
          />

          <InputSelect
            label="Jenis Transaksi"
            value={transaction.transactionTypeCode ?? ""}
            options={transactionTypes.options}
            onChange={(value) =>
              updateTransaction("transactionTypeCode", value)
            }
            rules={[required()]}
          />

          <NormalButton onClick={() => setIsModalOpen(true)}>
            Informasi Komponen Biaya
          </NormalButton>

          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Harga Barang
            </p>

            <div className="flex items-center gap-2">
              <InputNormal
                value={transaction.costComponents?.invoicePriceCode ?? ""}
                onChange={() => {}}
                disabled
              />
              <InputNumber
                value={transaction.costComponents?.invoicePrice ?? 0}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>

          <InputNumber
            title="Nilai Pabean Valuta Asing"
            value={transaction.costComponents?.invoicePrice ?? 0}
            onChange={() => {}}
            disabled
          />

          <InputNumber
            title="Nilai Pabean dalam Rupiah"
            value={getCustomsInRupiah(transaction)}
            onChange={() => {}}
            disabled
          />
        </InputWrapper>

        {/* Biaya Lainnya */}
        <InputWrapper title="Biaya Lainnya">
          <InputNumber
            title="Biaya Penambah"
            value={getIncrementalCost(transaction)}
            disabled
          />
          <InputNumber
            title="Biaya Pengurang"
            value={getDeductionFees(transaction)}
            disabled
          />
          <InputNumber
            title="Freight"
            value={transaction.costComponents?.freight || 0}
            disabled
          />
          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Asuransi
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={transaction.costComponents?.insuranceCode ?? ""}
                options={insuranceCodes.options}
                onChange={() => {}}
                disabled
              />
              <InputNumber
                value={transaction.costComponents?.insurance ?? 0}
                disabled
              />
            </div>
          </div>

          <InputNormal title="Voluntary Declaration" value="0.00" disabled />
        </InputWrapper>

        {/* Berat */}
        <InputWrapper title="Berat">
          <InputNumber
            title="Berat Kotor (Kg)"
            numberFormat={"US"}
            value={transaction.grossWeight ?? 0}
            onChange={(value) => updateTransaction("grossWeight", value)}
            rules={[required()]}
          />
          <InputRadio
            title="Perhitungan Proporsional"
            value={transaction.proportionalCalculation ?? ""}
            options={proportionalCals.options}
            onChange={(value) =>
              updateTransaction("proportionalCalculation", value)
            }
          />
          <InputNumber
            title="Berat Bersih (Kg)"
            numberFormat={"US"}
            value={getTotalNetWeight(goods)}
            disabled
          />
        </InputWrapper>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalCostComponents onCloseModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

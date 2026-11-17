"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import {
  inputsOne,
  inputsTwo,
  inputsThree,
  initialCostComponents,
} from "./transactionTableData";
import InputSelect from "@/app/components/inputs/input-select";
import {
  kodeAsuransiOption,
  kodeIncoterm,
} from "@/app/constants/options/transaksiOptions";
import InputNumber from "@/app/components/inputs/input-number";
import { CostComponents } from "@/app/types";
import { formatToRupiah } from "@/lib/utils";
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

type ModalCostComponentsProps = {
  onCloseModal: () => void;
};

export default function ModalCostComponents({
  onCloseModal,
}: ModalCostComponentsProps) {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const costComponents = data.transactions.costComponents;

  const [localCostComponents, setLocalCostComponents] = useState(
    costComponents ?? initialCostComponents,
  );

  function updateCostComponents(
    field: keyof CostComponents,
    value: number | string,
  ) {
    setLocalCostComponents({ ...localCostComponents, [field]: value });
  }

  function handleCancel() {
    onCloseModal();
  }

  function handleSave() {
    updateDocumentData({
      transactions: {
        ...data.transactions,
        costComponents: { ...localCostComponents },
      },
    });
    onCloseModal();
  }

  const valueA = inputsOne.reduce(
    (sum, item) => Number(localCostComponents[item.field]) + sum,
    0,
  );

  const valueC = valueA - localCostComponents.discount;

  const valueD = inputsTwo.reduce(
    (sum, item) => Number(localCostComponents[item.field]) + sum,
    0,
  );

  const valueE = valueC + valueD;

  const valueF = inputsThree.reduce(
    (sum, item) => Number(localCostComponents[item.field]) + sum,
    0,
  );

  const valueG = valueE - valueF;

  return (
    <ModalWrapper className="w-full max-w-6xl flex flex-col overflow-hidden">
      <ModalHeader title="Informasi Komponen Biaya" onCloseModal={handleCancel}>
        <p className="mt-1 text-sm text-slate-500">
          Informasi biaya untuk perhitungan nilai pabean.
        </p>
      </ModalHeader>

      <ModalContent className="min-h-0 flex-1 overflow-auto p-4 sm:p-6 relative">
        <div className="overflow-x-auto rounded-sm border border-slate-200">
          <table className="w-full min-w-212 border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-slate-100">
              <tr>
                <th className="w-[50%] border-b border-r border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                  Keterangan
                </th>
                <th className="w-[25%] border-b border-r border-slate-200 px-4 py-3 text-center font-semibold text-slate-700">
                  Nilai Pasti
                </th>
                <th className="w-[25%] border-b border-slate-200 px-4 py-3 text-center font-semibold text-slate-700">
                  Nilai
                </th>
              </tr>
            </thead>

            <tbody>
              {/* GRUP A */}
              <CellTitle label="Harga yang sebenarnya atau seharusnya dibayar" />

              <CellInput
                key={inputsOne[0].field}
                label={inputsOne[0].label}
                value={localCostComponents[inputsOne[0].field]}
                onChange={(value) => {
                  updateCostComponents(inputsOne[0].field, Number(value));
                }}
                child={
                  <InputSelect
                    value={localCostComponents.invoicePriceCode ?? ""}
                    options={kodeIncoterm}
                    onChange={(value) =>
                      updateCostComponents("invoicePriceCode", value)
                    }
                  />
                }
              />

              <CellInput
                key={inputsOne[1].field}
                label={inputsOne[1].label}
                value={localCostComponents[inputsOne[1].field]}
                onChange={(value) => {
                  updateCostComponents(inputsOne[1].field, Number(value));
                }}
              />

              <CellResult
                label="A. Jumlah harga sebenarnya atau seharusnya dibayar (1 + 2)"
                nilaiPasti={formatToRupiah(valueA)}
              />
              <SpaceCell />
              <CellInput
                label="B. Biaya pengurangan (Diskon) yang tidak termasuk ke dalam harga barang"
                value={localCostComponents.discount}
                onChange={(value) => {
                  updateCostComponents("discount", Number(value));
                }}
              />
              <CellResult
                label="C. Jumlah A dikurangi B"
                nilaiPasti={formatToRupiah(valueC)}
              />
              <SpaceCell />

              {/* GRUP B */}
              <CellTitle label="Biaya-biaya yang ditambahkan yang belum termasuk ke dalam harga barang" />
              {inputsTwo.map((item) => {
                if (item.field == "insurance") {
                  return (
                    <CellInput
                      key={item.field}
                      label={item.label}
                      value={localCostComponents[item.field]}
                      onChange={(value) => {
                        updateCostComponents(item.field, Number(value));
                      }}
                      disabled={localCostComponents.insuranceCode == "DN"}
                      child={
                        <InputSelect
                          value={localCostComponents.insuranceCode ?? "DN"}
                          options={kodeAsuransiOption}
                          onChange={(value) =>
                            updateCostComponents("insuranceCode", value)
                          }
                        />
                      }
                    />
                  );
                } else {
                  return (
                    <CellInput
                      key={item.field}
                      label={item.label}
                      value={localCostComponents[item.field]}
                      onChange={(value) => {
                        updateCostComponents(item.field, Number(value));
                      }}
                    />
                  );
                }
              })}

              <CellResult
                label="D. Jumlah biaya penambah (jumlah 1 s/d 10)"
                nilaiPasti={formatToRupiah(valueD)}
              />
              <SpaceCell />
              <CellResult
                label="E. Jumlah C ditambah D"
                nilaiPasti={formatToRupiah(valueE)}
              />
              <SpaceCell />

              {/* GRUP C */}
              <CellTitle label="Biaya-biaya yang tidak perlu ditambahkan namun sudah termasuk ke dalam harga barang" />
              {inputsThree.map((item) => (
                <CellInput
                  key={item.field}
                  label={item.label}
                  value={localCostComponents[item.field]}
                  onChange={(value) => {
                    updateCostComponents(item.field, Number(value));
                  }}
                />
              ))}
              <CellResult
                label="F. Jumlah biaya yang tidak ditambahkan (jumlah 1 s/d 5)"
                nilaiPasti={formatToRupiah(valueF)}
              />
              <CellResult
                label="G. Jumlah E dikurangi F"
                nilaiPasti={formatToRupiah(valueG)}
              />
            </tbody>
          </table>
        </div>
      </ModalContent>

      <ModalFooter
        textYes="Simpan"
        handleYes={handleSave}
        handleNo={handleCancel}
      >
        <p className="hidden text-xs text-slate-500 sm:block">
          Pastikan seluruh komponen biaya sudah sesuai.
        </p>
      </ModalFooter>
    </ModalWrapper>
  );
}

type CellInputProps = {
  label?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  resultValue?: string | number;
  child?: React.ReactNode;
  disabled?: boolean;
};

type CellResultProps = {
  label?: string;
  nilaiPasti?: string;
  nilai?: string;
};

type CellTitleProps = {
  label?: string;
};

function CellInput({
  label,
  value,
  onChange,
  resultValue = "0.0",
  child,
  disabled,
}: CellInputProps) {
  return (
    <tr className="transition-colors hover:bg-slate-50/80">
      <td className="border-b border-r border-slate-200 px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0 flex-1 text-slate-700">{label}</p>
          {child && <div className="w-32 shrink-0">{child}</div>}
        </div>
      </td>

      <td className="border-b border-r border-slate-200 px-3 py-2">
        {typeof value === "number" && (
          <InputNumber
            value={value ?? 0}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </td>

      <td className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-right font-medium tabular-nums text-slate-600">
        {resultValue}
      </td>
    </tr>
  );
}

function CellResult({ label, nilaiPasti, nilai = "0" }: CellResultProps) {
  return (
    <tr className="bg-blue-50/70">
      <td className="border-b border-r border-blue-100 px-4 py-3 font-semibold text-slate-700">
        {label}
      </td>

      <td className="border-b border-r border-blue-100 px-4 py-3 text-right font-bold tabular-nums text-blue-800">
        {nilaiPasti}
      </td>

      <td className="border-b border-blue-100 px-4 py-3 text-right font-bold tabular-nums text-blue-800">
        {nilai}
      </td>
    </tr>
  );
}

function CellTitle({ label }: CellTitleProps) {
  return (
    <tr>
      <td
        colSpan={3}
        className="border-b border-slate-200 bg-slate-100 px-4 py-3 font-bold text-slate-800"
      >
        {label}
      </td>
    </tr>
  );
}

function SpaceCell() {
  return (
    <tr aria-hidden="true">
      <td colSpan={3} className="h-3 border-0 bg-white p-0" />
    </tr>
  );
}

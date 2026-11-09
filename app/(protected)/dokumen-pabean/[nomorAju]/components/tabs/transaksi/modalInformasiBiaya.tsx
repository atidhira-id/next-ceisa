"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import {
  inputsOne,
  inputsTwo,
  inputsThree,
  initialKomponenBiaya,
} from "./transaksiTableData";
import InputSelect from "../../inputs/input-select";
import {
  kodeAsuransiOption,
  kodeIncoterm,
} from "@/app/constants/options/transaksiOptions";
import InputNumber from "../../inputs/input-number";
import { KomponenBiaya } from "@/app/types";
import { formatRupiah } from "@/lib/utils";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

type ModalInformasiBiayaProps = {
  onCloseModal: () => void;
};

export default function ModalInformasiBiaya({
  onCloseModal,
}: ModalInformasiBiayaProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;
  const komponenBiaya = data.transaksi.komponenBiaya;

  const [localKomponenBiaya, setLocalKomponenBiaya] = useState(
    komponenBiaya ?? initialKomponenBiaya,
  );

  function updateData(field: keyof KomponenBiaya, value: number | string) {
    setLocalKomponenBiaya({ ...localKomponenBiaya, [field]: value });
  }

  function handleCancel() {
    onCloseModal();
  }

  function handleSimpan() {
    updateDocumentData({
      transaksi: {
        ...data.transaksi,
        komponenBiaya: { ...localKomponenBiaya },
      },
    });
    onCloseModal();
  }

  const valueA = inputsOne.reduce(
    (sum, item) => Number(localKomponenBiaya[item.field]) + sum,
    0,
  );

  const valueC = valueA - localKomponenBiaya.diskon;

  const valueD = inputsTwo.reduce(
    (sum, item) => Number(localKomponenBiaya[item.field]) + sum,
    0,
  );

  const valueE = valueC + valueD;

  const valueF = inputsThree.reduce(
    (sum, item) => Number(localKomponenBiaya[item.field]) + sum,
    0,
  );

  const valueG = valueE - valueF;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-2 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[90dvh] w-full max-w-6xl flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Informasi Komponen Biaya
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Informasi biaya untuk perhitungan nilai pabean.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            aria-label="Tutup modal"
            className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 hover:cursor-pointer"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        {/* Table */}
        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6 relative">
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
                  value={localKomponenBiaya[inputsOne[0].field]}
                  onChange={(value) => {
                    updateData(inputsOne[0].field, Number(value));
                  }}
                  child={
                    <InputSelect
                      value={localKomponenBiaya.kodeHargaInvoice ?? ""}
                      options={kodeIncoterm}
                      onChange={(value) =>
                        updateData("kodeHargaInvoice", value)
                      }
                    />
                  }
                />

                <CellInput
                  key={inputsOne[1].field}
                  label={inputsOne[1].label}
                  value={localKomponenBiaya[inputsOne[1].field]}
                  onChange={(value) => {
                    updateData(inputsOne[1].field, Number(value));
                  }}
                />

                <CellResult
                  label="A. Jumlah harga sebenarnya atau seharusnya dibayar (1 + 2)"
                  nilaiPasti={formatRupiah(valueA)}
                />
                <SpaceCell />
                <CellInput
                  label="B. Biaya pengurangan (Diskon) yang tidak termasuk ke dalam harga barang"
                  value={localKomponenBiaya.diskon}
                  onChange={(value) => {
                    updateData("diskon", Number(value));
                  }}
                />
                <CellResult
                  label="C. Jumlah A dikurangi B"
                  nilaiPasti={formatRupiah(valueC)}
                />
                <SpaceCell />

                {/* GRUP B */}
                <CellTitle label="Biaya-biaya yang ditambahkan yang belum termasuk ke dalam harga barang" />
                {inputsTwo.map((item) => {
                  if (item.field == "asuransi") {
                    return (
                      <CellInput
                        key={item.field}
                        label={item.label}
                        value={localKomponenBiaya[item.field]}
                        onChange={(value) => {
                          updateData(item.field, Number(value));
                        }}
                        disabled={localKomponenBiaya.kodeAsuransi == "DN"}
                        child={
                          <InputSelect
                            value={localKomponenBiaya.kodeAsuransi ?? "DN"}
                            options={kodeAsuransiOption}
                            onChange={(value) =>
                              updateData("kodeAsuransi", value)
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
                        value={localKomponenBiaya[item.field]}
                        onChange={(value) => {
                          updateData(item.field, Number(value));
                        }}
                      />
                    );
                  }
                })}

                <CellResult
                  label="D. Jumlah biaya penambah (jumlah 1 s/d 10)"
                  nilaiPasti={formatRupiah(valueD)}
                />
                <SpaceCell />
                <CellResult
                  label="E. Jumlah C ditambah D"
                  nilaiPasti={formatRupiah(valueE)}
                />
                <SpaceCell />

                {/* GRUP C */}
                <CellTitle label="Biaya-biaya yang tidak perlu ditambahkan namun sudah termasuk ke dalam harga barang" />
                {inputsThree.map((item) => (
                  <CellInput
                    key={item.field}
                    label={item.label}
                    value={localKomponenBiaya[item.field]}
                    onChange={(value) => {
                      updateData(item.field, Number(value));
                    }}
                  />
                ))}
                <CellResult
                  label="F. Jumlah biaya yang tidak ditambahkan (jumlah 1 s/d 5)"
                  nilaiPasti={formatRupiah(valueF)}
                />
                <CellResult
                  label="G. Jumlah E dikurangi F"
                  nilaiPasti={formatRupiah(valueG)}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <p className="hidden text-xs text-slate-500 sm:block">
            Pastikan seluruh komponen biaya sudah sesuai.
          </p>

          <div className="ml-auto flex gap-2">
            <NormalButton variant={"inverted"} onClick={handleCancel}>
              Batal
            </NormalButton>

            <NormalButton onClick={handleSimpan}>Simpan</NormalButton>
          </div>
        </div>
      </div>
    </div>
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

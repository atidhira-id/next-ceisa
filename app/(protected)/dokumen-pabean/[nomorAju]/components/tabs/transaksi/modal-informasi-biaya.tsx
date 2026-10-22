"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import {
  inputsOne,
  inputsTwo,
  inputsThree,
  initialKomponenBiaya,
} from "./table-data";
import InputSelect from "../../input-select";
import { kodeHargaOption } from "@/lib/options";
import InputNumber from "../../input-number";

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

  function updateData(field: string, value: number | string) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-7xl h-full max-h-225 flex flex-col rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Informasi Komponen Biaya</h2>
        </div>

        <div className="space-y-5 px-6 py-5 overflow-auto">
          <table className="w-full table-fixed border-collapse border border-gray-500 ">
            <thead className="bg-gray-300">
              <tr>
                <th className="w-1/2 text-left p-2 border border-gray-500">
                  Keterangan
                </th>
                <th className="p-2 border border-gray-500">Nilai Pasti</th>
                <th className="p-2 border border-gray-500">Nilai</th>
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
                    options={kodeHargaOption}
                    onChange={(value) => updateData("kodeHargaInvoice", value)}
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
                nilaiPasti={valueA}
              />
              <SpaceCell />
              <CellInput
                label="B. Biaya pengurangan (Diskon) yang tidak termasuk ke dalam harga barang"
                value={localKomponenBiaya.diskon}
                onChange={(value) => {
                  updateData("diskon", Number(value));
                }}
              />
              <CellResult label="C. Jumlah A dikurangi B" nilaiPasti={valueC} />
              <SpaceCell />

              {/* GRUP B */}
              <CellTitle label="Biaya-biaya yang ditambahkan yang belum termasuk ke dalam harga barang" />
              {inputsTwo.map((item) => (
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
                label="D. Jumlah biaya penambah (jumlah 1 s/d 10)"
                nilaiPasti={valueD}
              />
              <SpaceCell />
              <CellResult label="E. Jumlah C ditambah D" nilaiPasti={valueE} />
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
                nilaiPasti={valueF}
              />
              <CellResult label="G. Jumlah E dikurangi F" nilaiPasti={valueG} />
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSimpan}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
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
};

type CellResultProps = {
  label?: string;
  nilaiPasti?: number;
  nilai?: number;
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
}: CellInputProps) {
  return (
    <tr>
      <td className="p-2 border border-gray-500">
        <div className="flex justify-between items-center">
          <p>{label}</p>
          {child}
        </div>
      </td>
      <td className="p-2 border border-gray-500">
        {typeof value === "number" && (
          <InputNumber value={value ?? 0} onChange={onChange} />
        )}
      </td>
      <td className="p-2 border border-gray-500 bg-gray-300">{resultValue}</td>
    </tr>
  );
}

function CellResult({ label, nilaiPasti, nilai = 0 }: CellResultProps) {
  return (
    <tr className="bg-gray-300 ">
      <td className="p-2 border border-gray-500 font-bold">{label}</td>
      <td className="p-2 border border-gray-500">{nilaiPasti}</td>
      <td className="p-2 border border-gray-500">{nilai}</td>
    </tr>
  );
}

function CellTitle({ label }: CellTitleProps) {
  return (
    <tr>
      <td
        colSpan={3}
        className="font-bold p-2 bg-gray-300 border border-gray-500"
      >
        {label}
      </td>
    </tr>
  );
}

function SpaceCell() {
  return (
    <tr>
      <td
        colSpan={3}
        className="font-bold p-4 bg-gray-300 border border-gray-500"
      ></td>
    </tr>
  );
}

"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import type { BarangItemData } from "@/app/providers/types";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  kodeHSOption,
  kodeNegaraOptions,
  kondisiBarangOption,
  statementPerbedaanOption,
} from "@/lib/options";
import { required } from "@/lib/validation";
import Form_87046094 from "./form-87046094";
import InputTextArea from "../../input-textarea";
import InputNumber from "../../input-number";
import InputRadio from "../../input-radio";
import { getBiayaPenambah, getBiayaPengurang } from "@/lib/utils";
import ModalDokumenFasilitas from "./modal-dokumen-fasilitas";

const initialBarangData: BarangItemData = {};

type ModalAddBarangProps = {
  onCloseModal: () => void;
};

export default function ModalAddBarang({ onCloseModal }: ModalAddBarangProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seriNumber = data.listBarang.length + 1;
  const [newBarang, setNewBarang] = useState(initialBarangData);

  const [isDokumenModalOpen, setIsDokumenModalOpen] = useState(false);

  function updateData(field: keyof BarangItemData, value: number | string) {
    setNewBarang({ ...newBarang, [field]: value });
  }

  function updateSpecs(field: string, value: string) {
    setNewBarang({
      ...newBarang,
      spesifikasi: { ...newBarang.spesifikasi, [field]: value },
    });
  }

  function handleCancel() {
    updateDocumentData({
      listBarang: [],
    });
    onCloseModal();
  }

  function handleSimpan() {
    updateDocumentData({
      listBarang: [...data.listBarang, { ...newBarang, seri: seriNumber }],
    });

    onCloseModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-7xl h-full max-h-225 flex flex-col rounded-lg bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Tambah Barang</h2>
        </div>

        <div className="grow space-y-5 px-6 py-5 overflow-auto">
          {/* DATA BARANG */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              {/* Seri */}
              <InputNormal
                labelPosition="left"
                title="Seri"
                value={seriNumber.toString()}
                disabled
              />
              {/* Pos Tarif/HS */}
              <InputSelect
                labelPosition="left"
                label="Pos Tarif/HS"
                options={kodeHSOption}
                value={newBarang.hs ?? ""}
                onChange={(value) => updateData("hs", value)}
                rules={[required()]}
              />

              {/* FORM FOR 87046094 */}
              {newBarang.hs == "87046094" && (
                <Form_87046094 barang={newBarang} updateSpecs={updateSpecs} />
              )}

              <p>TODO :Lartas</p>
              <InputNormal
                labelPosition="left"
                title="Kode Barang"
                value={newBarang.kodeBarang ?? ""}
                onChange={(value) => updateData("kodeBarang", value)}
                rules={[required()]}
              />

              <InputTextArea
                labelPosition="left"
                title="Uraian Jenis Barang"
                value={newBarang.uraianJenisBarang ?? ""}
                onChange={(value) => updateData("uraianJenisBarang", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Merek"
                value={newBarang.merek ?? ""}
                onChange={(value) => updateData("merek", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Tipe"
                value={newBarang.tipe ?? ""}
                onChange={(value) => updateData("tipe", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Ukuran"
                value={newBarang.ukuran ?? ""}
                onChange={(value) => updateData("ukuran", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Spesifikasi Lain"
                value={newBarang.spesifikasiLain ?? ""}
                onChange={(value) => updateData("spesifikasiLain", value)}
                rules={[required()]}
              />
              <InputSelect
                labelPosition="left"
                label="Kondisi Barang"
                value={newBarang.kondisiBarang ?? ""}
                options={kondisiBarangOption}
                onChange={(value) => updateData("kondisiBarang", value)}
                rules={[required()]}
              />
              <InputSelect
                labelPosition="left"
                label="Negara"
                value={newBarang.negara ?? ""}
                options={kodeNegaraOptions}
                onChange={(value) => updateData("negara", value)}
                rules={[required()]}
              />
              <InputNumber
                labelPosition="left"
                title="Berat Bersih (kg)"
                value={newBarang.beratBersih ?? 0}
                onChange={(value) => updateData("beratBersih", value)}
                rules={[required()]}
              />
            </div>

            {/* Column 2 */}
            <div>
              <InputNumber
                labelPosition="left"
                title="Jumlah Barang"
                value={newBarang.jumlah ?? 0}
                onChange={(value) => updateData("jumlah", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Kode Satuan Barang"
                value={newBarang.kodeSatuan ?? ""}
                onChange={(value) => updateData("kodeSatuan", value)}
                rules={[required()]}
              />
              <InputNumber
                labelPosition="left"
                title="Jumlah Kemasan"
                value={newBarang.kemasan ?? 0}
                onChange={(value) => updateData("kemasan", value)}
                rules={[required()]}
              />
              <InputNormal
                labelPosition="left"
                title="Kode Jenis Kemasan"
                value={newBarang.kodeJenisKemasan ?? ""}
                onChange={(value) => updateData("kodeJenisKemasan", value)}
                rules={[required()]}
              />
              <InputNumber
                labelPosition="left"
                title="Harga Invoice"
                value={
                  newBarang.hargaInvoice ??
                  data.transaksi.komponenBiaya?.hargaInvoice ??
                  0
                }
                onChange={(value) => updateData("hargaInvoice", value)}
                rules={[required()]}
              />
              <InputNumber
                labelPosition="left"
                title="Biaya Penambah"
                value={getBiayaPenambah(data.transaksi) ?? 0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Biaya Pengurang"
                value={getBiayaPengurang(data.transaksi) ?? 0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Freight"
                value={data.transaksi.komponenBiaya?.freight ?? 0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Asuransi"
                value={data.transaksi.komponenBiaya?.asuransi ?? 0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Nilai VD"
                value={0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Nilai CIF"
                value={0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Harga Per Satuan"
                value={0}
                disabled
              />
              <InputNumber
                labelPosition="left"
                title="Nilai Pabean Rupiah"
                value={0}
                onChange={(value) => {}}
                rules={[required()]}
              />
              <InputSelect
                labelPosition="left"
                label="Metode Penentuan Nilai"
                value={""}
                options={kodeHSOption}
                onChange={(value) => {}}
                rules={[required()]}
              />
              <InputSelect
                labelPosition="left"
                label="Alasan"
                value={""}
                options={kodeHSOption}
                onChange={(value) => {}}
                rules={[required()]}
              />
              <InputRadio
                labelPosition="left"
                title="Statement Perbedaan"
                value={""}
                options={statementPerbedaanOption}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* DOKUMEN FASILITAS */}
          <div>
            <InputWrapper
              title="Dokumen Lampiran"
              headerChildren={
                <button
                  type="button"
                  onClick={() => setIsDokumenModalOpen(true)}
                  className="rounded-md bg-gray-900 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  + Tambah
                </button>
              }
            >
              {/* Modal */}
              {isDokumenModalOpen && (
                <ModalDokumenFasilitas
                  onCloseModal={() => setIsDokumenModalOpen(false)}
                />
              )}
            </InputWrapper>
          </div>
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

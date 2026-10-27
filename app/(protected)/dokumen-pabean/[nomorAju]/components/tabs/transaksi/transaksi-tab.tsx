"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  jenisTransaksiOptions,
  kodeValutaOptions,
  kodeAsuransiOption,
  perhitunganProporsionalOption,
  kodeIncoterm,
} from "@/lib/options";
import ModalInformasiBiaya from "./modal-informasi-biaya";
import InputNumber from "../../input-number";
import InputRadio from "../../input-radio";
import { required } from "@/lib/validation";
import { getBiayaPenambah, getBiayaPengurang } from "@/lib/utils";

export function TransaksiTab() {
  const { documentData, updateDocumentData } = useDocument();
  const transaksi = documentData!.transaksi;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pabeanRupiah =
    (transaksi.ndpbm ?? 0) * (transaksi.komponenBiaya?.hargaInvoice ?? 0);

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Harga */}
        <InputWrapper title="Harga">
          <InputSelect
            label="Jenis Valuta"
            value={transaksi.kodeJenisValuta ?? ""}
            options={kodeValutaOptions}
            onChange={(value) =>
              updateDocumentData({
                transaksi: { ...transaksi, kodeJenisValuta: value },
              })
            }
            rules={[required()]}
          />

          <InputNumber
            title="NDPBM"
            value={transaksi.ndpbm ?? 0}
            onChange={(value) =>
              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  ndpbm: value,
                },
              })
            }
            rules={[required()]}
          />

          <InputSelect
            label="Jenis Transaksi"
            value={transaksi.kodeJenisTransaksi ?? ""}
            options={jenisTransaksiOptions}
            onChange={(value) =>
              updateDocumentData({
                transaksi: { ...transaksi, kodeJenisTransaksi: value },
              })
            }
            rules={[required()]}
          />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-fit text-left font-bold p-2 border rounded-md border-gray-300 hover:cursor-pointer hover:bg-gray-200"
          >
            Informasi Komponen Biaya
          </button>

          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Harga Barang
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={transaksi.komponenBiaya?.kodeHargaInvoice ?? ""}
                options={kodeIncoterm}
                onChange={() => {}}
                disabled
              />
              <InputNumber
                value={transaksi.komponenBiaya?.hargaInvoice ?? 0}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>

          <InputNumber
            title="Nilai Pabean Valuta Asing"
            value={transaksi.komponenBiaya?.hargaInvoice ?? 0}
            onChange={() => {}}
            disabled
          />

          <InputNumber
            title="Nilai Pabean dalam Rupiah"
            value={pabeanRupiah}
            onChange={() => {}}
            disabled
          />
        </InputWrapper>

        {/* Biaya Lainnya */}
        <InputWrapper title="Biaya Lainnya">
          <InputNumber
            title="Biaya Penambah"
            value={getBiayaPenambah(transaksi)}
            disabled
          />
          <InputNumber
            title="Biaya Pengurang"
            value={getBiayaPengurang(transaksi)}
            disabled
          />
          <InputNumber
            title="Freight"
            value={transaksi.komponenBiaya?.freight || 0}
            disabled
          />
          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Asuransi
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={transaksi.komponenBiaya?.kodeAsuransi ?? ""}
                options={kodeAsuransiOption}
                onChange={() => {}}
                disabled
              />
              <InputNumber
                value={transaksi.komponenBiaya?.asuransi ?? 0}
                disabled
              />
            </div>
          </div>

          <InputNormal title="Voluntary Declaration" value="0.00" disabled />
        </InputWrapper>

        {/* Berat */}
        <InputWrapper title="Berat">
          <InputNumber
            title="Biaya Kotor (KGM)"
            value={transaksi.beratKotor ?? 0}
            onChange={(value) =>
              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  beratKotor: value,
                },
              })
            }
            rules={[required()]}
          />
          <InputRadio
            title="Perhitunga Proporsional"
            value={
              transaksi.perhitunganProporsional ??
              perhitunganProporsionalOption[0].value
            }
            options={perhitunganProporsionalOption}
            onChange={(value) =>
              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  perhitunganProporsional: value,
                },
              })
            }
          />
          <InputNormal title="Biaya Bersih (KGM)" value="0.00" disabled />
        </InputWrapper>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalInformasiBiaya onCloseModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  jenisTransaksiOptions,
  jenisValutaOptions,
  kodeHargaOption,
  perhitunganProporsionalOption,
} from "@/lib/options";
import ModalInformasiBiaya from "./modal-informasi-biaya";
import InputNumber from "../../input-number";
import InputRadio from "../../input-radio";
import { required } from "@/lib/validation";

export function TransaksiTab() {
  const { documentData, updateDocumentData } = useDocument();
  const transaksi = documentData!.transaksi;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Harga */}
        <InputWrapper title="Harga">
          <InputSelect
            label="Jenis Valuta"
            value={transaksi.kodeJenisValuta ?? ""}
            options={jenisValutaOptions}
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
            className="text-left font-bold hover:cursor-pointer"
          >
            Informasi Komponen Biaya
          </button>

          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Harga Barang
            </p>

            <div className="flex items-center gap-2">
              <InputSelect
                value={transaksi.kodeHargaBarang ?? ""}
                options={kodeHargaOption}
                onChange={(value) =>
                  updateDocumentData({
                    transaksi: { ...transaksi, kodeHargaBarang: value },
                  })
                }
                rules={[required()]}
              />
              <InputNumber
                value={transaksi.hargaBarang ?? 0}
                onChange={(value) =>
                  updateDocumentData({
                    transaksi: { ...transaksi, hargaBarang: value },
                  })
                }
                rules={[required()]}
              />
            </div>
          </div>

          <InputNumber
            title="Nilai Pabean Valuta Asing"
            value={transaksi.nilaiPabeanAsing ?? 0}
            onChange={(value) =>
              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  nilaiPabeanAsing: value,
                },
              })
            }
            rules={[required()]}
          />

          <InputNumber
            title="Nilai Pabean dalam Rupiah"
            value={transaksi.nilaiPabeanRupiah ?? 0}
            onChange={(value) =>
              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  nilaiPabeanRupiah: value,
                },
              })
            }
            rules={[required()]}
          />
        </InputWrapper>

        {/* Biaya Lainnya */}
        <InputWrapper title="Biaya Lainnya">
          <InputNormal title="Biaya Penambah" value="0.00" disabled />
          <InputNormal title="Biaya Pengurang" value="0.00" disabled />
          <InputNormal title="Freight" value="0.00" disabled />
          <p>TODO: ASURANSI</p>
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

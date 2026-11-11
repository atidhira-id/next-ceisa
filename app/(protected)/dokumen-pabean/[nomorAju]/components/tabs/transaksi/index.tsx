"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputNumber from "@/app/components/inputs/input-number";
import InputRadio from "@/app/components/inputs/input-radio";
import {
  jenisTransaksiOptions,
  jenisValutaOptions,
  kodeAsuransiOption,
  perhitunganProporsionalOption,
  kodeIncoterm,
} from "@/app/constants/options/transaksiOptions";
import ModalInformasiBiaya from "./modalInformasiBiaya";
import { required } from "@/lib/validation";
import {
  getBeratBersih,
  getBiayaPenambah,
  getBiayaPengurang,
  getPabeanRupiah,
} from "@/lib/utils";
import { NormalButton } from "@/app/components/buttons";

export default function TransaksiTab() {
  const { documentData, updateDocumentData } = useDocument();
  const transaksi = documentData!.transaksi;
  const listBarang = documentData!.listBarang;

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

          <NormalButton onClick={() => setIsModalOpen(true)}>
            Informasi Komponen Biaya
          </NormalButton>

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
            value={getPabeanRupiah(transaksi)}
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
            title="Berat Kotor (Kg)"
            numberFormat={"US"}
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
            title="Perhitungan Proporsional"
            value={
              transaksi.perhitunganProporsional ??
              perhitunganProporsionalOption[1].value
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
          <InputNumber
            title="Berat Bersih (Kg)"
            numberFormat={"US"}
            value={getBeratBersih(listBarang)}
            disabled
          />
        </InputWrapper>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalInformasiBiaya onCloseModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

"use client";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import {
  jenisTransaksiOptions,
  jenisValutaOptions,
  kodeHargaOption,
} from "@/lib/options";

export function TransaksiTab() {
  const { documentData, updateDocumentData } = useDocument();
  const transaksi = documentData!.transaksi;

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
          />

          <InputNormal
            title="NDPBM"
            value={transaksi.ndpbm ?? ""}
            onChange={(value) => {
              const normalizedValue = value.replace(",", ".");
              const parsedNumber = Number(normalizedValue);
              const isValidNumber =
                !isNaN(parsedNumber) && normalizedValue.trim() !== "";

              updateDocumentData({
                transaksi: {
                  ...transaksi,
                  ndpbm: isValidNumber ? parsedNumber : 0,
                },
              });
            }}
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
          />

          <p>TODO: INFORMASI KOMPONEN BIAYA</p>

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
              />
              <InputNormal
                value={transaksi.hargaBarang ?? ""}
                onChange={(value) =>
                  updateDocumentData({
                    transaksi: { ...transaksi, hargaBarang: Number(value) },
                  })
                }
              />
            </div>
          </div>
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
          <InputNormal title="Biaya Kotor (KGM)" value="0.00" disabled />
          <p>TODO: PERHITUNGAN PROPORSIONAL</p>
          <InputNormal title="Biaya Bersih (KGM)" value="0.00" disabled />
        </InputWrapper>
      </div>
    </div>
  );
}

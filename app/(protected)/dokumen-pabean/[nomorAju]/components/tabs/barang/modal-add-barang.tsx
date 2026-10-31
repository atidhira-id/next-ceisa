"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import type { BarangItemData } from "@/app/providers/types";
import InputWrapper from "../../input-wrapper";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { kodeNegaraOptions } from "@/app/constants/entitas-options";
import {
  bmOptions,
  pembayaranOptions,
  kondisiBarangOption,
  statementPerbedaanOption,
  hsOption,
  kodeSatuanBarangOptions,
  metodePenentuanNilaiOptions,
  alasanOptions,
  jenisTarifOptions,
} from "@/app/constants/barang-options";
import { required } from "@/lib/validation";
import Form_87046094 from "./form-87046094";
import InputTextArea from "../../input-textarea";
import InputNumber from "../../input-number";
import InputRadio from "../../input-radio";
import { getBiayaPenambah, getBiayaPengurang, getLabel } from "@/lib/utils";
import ModalDokumenFasilitas from "./modal-dokumen-fasilitas";
import { hsData } from "@/app/constants/hs";
import { jenisKemasanOptions } from "@/app/constants/kemas-kontainer-options";
import { kodeJenisOptions } from "@/app/constants/dokumen-options";
import { Trash } from "lucide-react";

const initialBarangData: BarangItemData = {
  statementPerbedaan: statementPerbedaanOption[1].value,
};

type ModalAddBarangProps = {
  onCloseModal: () => void;
  barangToEdit?: BarangItemData | null;
};

export default function ModalAddBarang({
  onCloseModal,
  barangToEdit,
}: ModalAddBarangProps) {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const seriNumber = data.listBarang.length + 1;
  const existingBarangHargaInvoice = data.listBarang
    .filter((barang) => barang.seri !== barangToEdit?.seri)
    .reduce((total, barang) => total + (barang.hargaInvoice ?? 0), 0);
  const defaultHargaInvoice = Math.max(
    0,
    (data.transaksi.komponenBiaya?.hargaInvoice ?? 0) -
      existingBarangHargaInvoice,
  );
  const [newBarang, setNewBarang] = useState<BarangItemData>(() => ({
    ...initialBarangData,
    ...(barangToEdit ?? {}),
    hargaInvoice: barangToEdit?.hargaInvoice ?? defaultHargaInvoice,
  }));

  const [isDokumenModalOpen, setIsDokumenModalOpen] = useState(false);

  function updateData(
    field: keyof BarangItemData,
    value: number | string | boolean,
  ) {
    setNewBarang({ ...newBarang, [field]: value });
  }

  function updateSpecs(field: string, value: string) {
    setNewBarang({
      ...newBarang,
      spesifikasi: { ...newBarang.spesifikasi, [field]: value },
    });
  }

  function removeDocument(documentNumber: string) {
    setNewBarang((current) => ({
      ...current,
      listDokumen: current.listDokumen?.filter(
        (document) => document.nomorDokumen !== documentNumber,
      ),
    }));
  }

  function handleCancel() {
    onCloseModal();
  }

  function handleSimpan() {
    const nextBarang = {
      ...newBarang,
      seri: barangToEdit?.seri ?? seriNumber,
      hargaInvoice: newBarang.hargaInvoice ?? defaultHargaInvoice,
    };

    if (barangToEdit) {
      updateDocumentData({
        listBarang: data.listBarang.map((barang) =>
          barang.seri === barangToEdit.seri ? nextBarang : barang,
        ),
      });
    } else {
      updateDocumentData({
        listBarang: [...data.listBarang, nextBarang],
      });
    }

    onCloseModal();
  }

  function checkLartas() {
    const lb = newBarang.hs?.lartasBorder;
    const lpb = newBarang.hs?.lartasPostBorder;

    if (lb && lpb) {
      return "Lartas Border & Post Border";
    } else if (lb) {
      return "Lartas Border";
    } else if (lpb) {
      return "Lartas Post Border";
    } else {
      return "Bukan Lartas";
    }
  }

  function getPungutan(type: "bm" | "pph" | "ppn", code: string): number {
    const hs = hsData.find((item) => item.kode == code);

    return hs ? hs[type] : 0;
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
            <div className="flex flex-col gap-3">
              {/* Seri */}
              <InputNormal
                labelPosition="left"
                title="Seri"
                value={(barangToEdit?.seri ?? seriNumber).toString()}
                disabled
              />
              {/* Pos Tarif/HS */}
              <InputSelect
                labelPosition="left"
                label="Pos Tarif/HS"
                options={hsOption}
                value={newBarang.hs?.kode ?? ""}
                onChange={(value) => {
                  const hs = hsData.find((item) => item.kode == value);

                  setNewBarang({ ...newBarang, hs: hs });
                }}
                rules={[required()]}
              />

              {/* FORM FOR 87046094 */}
              {newBarang.hs?.kode == "87046094" && (
                <Form_87046094 barang={newBarang} updateSpecs={updateSpecs} />
              )}

              <div className="w-full flex items-center gap-4 my-4">
                <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                  Lartas
                </p>
                <p className="bg-green-200 text-gray-900 w-full p-2 border border-gray-300 rounded-md">
                  {checkLartas()}
                </p>
              </div>

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

              <div className="w-full flex items-center gap-4 mb-4">
                <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                  Merek
                </p>
                <div className="w-full">
                  <label className="text-md text-gray-700 mb-2">
                    <input
                      className="mr-1"
                      type="checkbox"
                      checked={newBarang.merek === "TANPA MEREK"}
                      onChange={(event) =>
                        updateData(
                          "merek",
                          event.target.checked ? "TANPA MEREK" : "",
                        )
                      }
                    />
                    Tanpa Merek
                  </label>
                  <InputNormal
                    value={newBarang.merek ?? ""}
                    onChange={(value) => updateData("merek", value)}
                    rules={[required()]}
                    disabled={newBarang.merek === "TANPA MEREK"}
                  />
                </div>
              </div>

              <div className="w-full flex items-center gap-4 mb-4">
                <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                  Tipe
                </p>
                <div className="w-full">
                  <label className="text-md text-gray-700 mb-2">
                    <input
                      className="mr-1"
                      type="checkbox"
                      checked={newBarang.tipe === "TANPA TIPE"}
                      onChange={(event) =>
                        updateData(
                          "tipe",
                          event.target.checked ? "TANPA TIPE" : "",
                        )
                      }
                    />
                    Tanpa Tipe
                  </label>
                  <InputNormal
                    value={newBarang.tipe ?? ""}
                    onChange={(value) => updateData("tipe", value)}
                    rules={[required()]}
                    disabled={newBarang.tipe === "TANPA TIPE"}
                  />
                </div>
              </div>

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
            <div className="flex flex-col gap-3">
              <div className="w-full flex items-center gap-4 mb-4">
                <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                  Jumlah dan Satuan Barang
                </p>
                <div className="w-full flex gap-2">
                  <InputNumber
                    value={newBarang.jumlah ?? 0}
                    onChange={(value) => updateData("jumlah", value)}
                    rules={[required()]}
                  />
                  <InputSelect
                    value={newBarang.kodeSatuan ?? ""}
                    options={kodeSatuanBarangOptions}
                    onChange={(value) => updateData("kodeSatuan", value)}
                    rules={[required()]}
                  />
                </div>
              </div>

              <div className="w-full flex items-center gap-4 mb-4">
                <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                  Kemasan
                </p>
                <div className="w-full flex gap-2">
                  <InputNumber
                    value={newBarang.kemasan ?? 0}
                    onChange={(value) => updateData("kemasan", value)}
                    rules={[required()]}
                  />
                  <InputSelect
                    value={newBarang.kodeJenisKemasan ?? ""}
                    options={jenisKemasanOptions}
                    onChange={(value) => updateData("kodeJenisKemasan", value)}
                    rules={[required()]}
                  />
                </div>
              </div>

              <InputNumber
                labelPosition="left"
                title="Harga Invoice"
                value={newBarang.hargaInvoice ?? defaultHargaInvoice ?? 0}
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
                disabled
              />
              <InputSelect
                labelPosition="left"
                label="Metode Penentuan Nilai"
                value={newBarang.metodePenentuanNilai ?? ""}
                options={metodePenentuanNilaiOptions}
                onChange={(value) => {
                  updateData("metodePenentuanNilai", value);
                }}
                rules={[required()]}
              />
              {newBarang.metodePenentuanNilai != "METODE 1" && (
                <InputSelect
                  labelPosition="left"
                  label="Alasan"
                  value={newBarang.alasan ?? ""}
                  options={alasanOptions}
                  onChange={(value) => {
                    updateData("alasan", value);
                  }}
                  rules={[required()]}
                  disabled={!newBarang.metodePenentuanNilai}
                />
              )}

              <InputRadio
                labelPosition="left"
                title="Statement Perbedaan"
                value={newBarang.statementPerbedaan ?? ""}
                options={statementPerbedaanOption}
                onChange={(value) => {
                  updateData("statementPerbedaan", value);
                }}
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
                  selectedDocuments={newBarang.listDokumen ?? []}
                  onSaveDocuments={(documents) =>
                    setNewBarang((current) => ({
                      ...current,
                      listDokumen: documents,
                    }))
                  }
                />
              )}

              {newBarang.listDokumen && (
                <div className="overflow-hidden rounded-lg border bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b bg-gray-50">
                        <tr>
                          <th className="w-16 px-4 py-3 font-medium text-gray-600">
                            Seri
                          </th>

                          <th className="px-4 py-3 font-medium text-gray-600">
                            Jenis
                          </th>

                          <th className="px-4 py-3 font-medium text-gray-600">
                            Nomor
                          </th>

                          <th className="px-4 py-3 font-medium text-gray-600">
                            Tanggal
                          </th>
                          <th className="px-4 py-3 font-medium text-gray-600">
                            Fasilitas
                          </th>
                          <th className="px-4 py-3 font-medium text-gray-600">
                            Kode Izin
                          </th>
                          <th className="px-4 py-3 font-medium text-gray-600">
                            Nomor Urut di Izin
                          </th>
                          <th className="px-4 py-3 font-medium text-gray-600">
                            File
                          </th>
                          <th className="px-4 py-3 font-medium text-gray-600"></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y">
                        {newBarang.listDokumen.map((barangDokumen) => {
                          const document = data.listDokumen.find(
                            (item) =>
                              item.nomorDokumen === barangDokumen.nomorDokumen,
                          );

                          return document ? (
                            <tr
                              key={document?.nomorDokumen}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium">
                                {document.seri}
                              </td>

                              <td className="px-4 py-3">
                                {getLabel(
                                  kodeJenisOptions,
                                  document.kodeDokumen,
                                )}
                              </td>

                              <td className="px-4 py-3">
                                {document.nomorDokumen}
                              </td>

                              <td className="px-4 py-3">
                                {document.tanggalDokumen}
                              </td>
                              <td className="px-4 py-3">
                                {document.kodeFasilitas}
                              </td>
                              <td className="px-4 py-3">{document.kodeIjin}</td>
                              <td className="px-4 py-3">
                                {barangDokumen.nomorUrut ? (
                                  <InputNumber
                                    value={barangDokumen.nomorUrut}
                                    disabled
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="px-4 py-3"></td>
                              <td className="px-4 py-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeDocument(document.nomorDokumen)
                                  }
                                  aria-label={`Hapus dokumen ${document.nomorDokumen}`}
                                  title="Hapus dokumen"
                                  className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:cursor-pointer"
                                >
                                  <Trash size={16} />
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tr key={barangDokumen.nomorDokumen}>
                              <td
                                rowSpan={8}
                              >{`Gagal menampilkan dokumen ${barangDokumen.nomorDokumen}`}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </InputWrapper>
          </div>

          {/* PUNGUTAN */}
          <div>
            <InputWrapper title="Pungutan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
                <InputWrapper title="BM">
                  <div className="flex gap-1">
                    <InputSelect
                      value={bmOptions[0].value}
                      options={bmOptions}
                      onChange={() => {}}
                      disabled
                    />
                    <InputSelect
                      value={newBarang.bmJenisTarif ?? ""}
                      options={jenisTarifOptions}
                      onChange={(value) => {
                        updateData("bmJenisTarif", value);
                      }}
                      rules={[required()]}
                    />
                    <InputNumberWithPercentage
                      value={getPungutan("bm", newBarang.hs?.kode ?? "")}
                      disabled
                    />
                    <InputSelect
                      value={newBarang.bmPembayaran ?? ""}
                      options={pembayaranOptions}
                      onChange={(value) => {
                        updateData("bmPembayaran", value);
                      }}
                      rules={[required()]}
                    />
                    <InputNumberWithPercentage value={0} disabled />
                  </div>
                </InputWrapper>

                <InputWrapper title="PDRI">
                  <div className="flex items-center gap-1">
                    <p className="w-3/4 text-sm font-bold">PPN (DPP 11/12)</p>
                    <InputNumberWithPercentage
                      value={getPungutan("ppn", newBarang.hs?.kode ?? "")}
                      disabled
                    />
                    <InputSelect
                      value={newBarang.ppnPembayaran ?? ""}
                      options={pembayaranOptions}
                      onChange={(value) => {
                        updateData("ppnPembayaran", value);
                      }}
                      rules={[required()]}
                    />
                    <InputNumberWithPercentage value={0} disabled />
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="w-3/4 text-sm">PPH</p>
                    <InputNumberWithPercentage
                      value={getPungutan("pph", newBarang.hs?.kode ?? "")}
                      disabled
                    />
                    <InputSelect
                      value={newBarang.pphPembayaran ?? ""}
                      options={pembayaranOptions}
                      onChange={(value) => {
                        updateData("pphPembayaran", value);
                      }}
                      rules={[required()]}
                    />
                    <InputNumberWithPercentage value={0} disabled />
                  </div>
                </InputWrapper>

                <InputWrapper title="BMT">
                  <div></div>
                </InputWrapper>

                <div className="w-full flex items-center border border-gray-300 bg-gray-200 px-4">
                  <label className="text-md text-gray-700 font-bold">
                    <input
                      className="mr-1"
                      type="checkbox"
                      checked={newBarang.isCukai ?? false}
                      onChange={(event) =>
                        updateData(
                          "isCukai",
                          event.target.checked ? true : false,
                        )
                      }
                    />
                    CUKAI
                  </label>
                </div>
              </div>
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

function InputNumberWithPercentage({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex relative min-w-18">
      <InputNumber value={value} onChange={onChange} disabled={disabled} />
      <span className="absolute -top-1 right-2 translate-y-1/2 text-gray-600">
        %
      </span>
    </div>
  );
}

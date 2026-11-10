"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import type { BarangItemData } from "@/app/types";
import InputWrapper from "../../inputs/input-wrapper";
import InputNormal from "../../inputs/input-normal";
import InputSelect from "../../inputs/input-select";
import { kodeNegaraOptions } from "@/app/constants/options/entitasOptions";
import {
  bmOptions,
  pembayaranOptions,
  kondisiBarangOption,
  statementPerbedaanOption,
  hsOption,
  kodeSatuanOptions,
  metodePenentuanNilaiOptions,
  alasanOptions,
  jenisTarifOptions,
  tipeBarangOptions,
} from "@/app/constants/options/barangOptions";
import { required } from "@/lib/validation";
import Form_87046094 from "./form87046094";
import InputTextArea from "../../inputs/input-textarea";
import InputNumber from "../../inputs/input-number";
import InputRadio from "../../inputs/input-radio";
import {
  getBiayaPenambah,
  getBiayaPengurang,
  getCif,
  getHargaSatuan,
  getHsCode,
  getLabel,
  getPabeanRupiah,
} from "@/lib/utils";
import { ModalDokumenFasilitas } from "./modalDokumenFasilitas";
import { hsData } from "@/app/constants/hs";
import { jenisKemasanOptions } from "@/app/constants/options/kemasKontainerOptions";
import { kodeJenisOptions } from "@/app/constants/options/dokumenOptions";
import { Plus, Trash } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";

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

  function handleTipeChange(value: string) {
    const nextTipe = value === "TANPA TIPE" ? "TANPA TIPE" : value;
    const autoHs = getHsCode(nextTipe);

    if (!autoHs) {
      setNewBarang((current) => ({ ...current, tipe: nextTipe }));
      return;
    }

    const hs = hsData.find((item) => item.kode === autoHs);
    setNewBarang((current) => ({
      ...current,
      tipe: nextTipe,
      hs: autoHs,
      bmPercentage: hs?.bm ?? current.bmPercentage ?? 0,
      pphPercentage: hs?.pph ?? current.pphPercentage ?? 0,
      ppnPercentage: hs?.ppn ?? current.ppnPercentage ?? 0,
    }));
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
    const hs = hsData.find((item) => item.kode == newBarang.hs);
    const lb = hs?.lartasBorder;
    const lpb = hs?.lartasPostBorder;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-2 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-7xl max-h-[90dvh] flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Informasi Barang
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Informasi terkait barang import / eksport.
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

        {/* FORMS CONTENT */}
        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6 relative">
          <div className="overflow-x-auto flex flex-col gap-4">
            {/* DATA BARANG */}
            <div className="grid md:grid-cols-2 gap-10">
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
                  value={newBarang.hs ?? ""}
                  onChange={(value) => {
                    const hs = hsData.find((item) => item.kode == value);

                    setNewBarang((current) => ({
                      ...current,
                      hs: value,
                      bmPercentage: hs?.bm ?? current.bmPercentage ?? 0,
                      pphPercentage: hs?.pph ?? current.pphPercentage ?? 0,
                      ppnPercentage: hs?.ppn ?? current.ppnPercentage ?? 0,
                    }));
                  }}
                  rules={[required()]}
                  allowCustom
                />

                {/* FORM FOR 87046094 */}
                {newBarang.hs == "87046094" && (
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
                    <InputSelect
                      value={newBarang.tipe ?? ""}
                      options={tipeBarangOptions}
                      onChange={handleTipeChange}
                      rules={[required()]}
                      disabled={newBarang.tipe === "TANPA TIPE"}
                      allowCustom
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
                  numberFormat={"US"}
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
                      options={kodeSatuanOptions}
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
                      onChange={(value) =>
                        updateData("kodeJenisKemasan", value)
                      }
                      rules={[required()]}
                    />
                  </div>
                </div>

                <InputNumber
                  labelPosition="left"
                  numberFormat={"US"}
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
                  value={getCif(newBarang, data.transaksi)}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  numberFormat={"US"}
                  title="Harga Per Satuan"
                  value={getHargaSatuan(newBarang)}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  title="Nilai Pabean Rupiah"
                  value={getPabeanRupiah(data.transaksi, newBarang)}
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
                {newBarang.metodePenentuanNilai !=
                  metodePenentuanNilaiOptions[0].value && (
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
                  <NormalButton onClick={() => setIsDokumenModalOpen(true)}>
                    <Plus size={16} />
                    Tambah
                  </NormalButton>
                }
              >
                {/* Modal Dokumen */}
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
                  <div className="overflow-hidden rounded-sm border bg-white">
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
                                item.nomorDokumen ===
                                barangDokumen.nomorDokumen,
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
                                <td className="px-4 py-3">
                                  {document.kodeIjin}
                                </td>
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
                {!newBarang.listDokumen?.length && (
                  <p className="text-sm text-center">Belum Ada Data</p>
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
                        value={newBarang.bmPercentage ?? 0}
                        onChange={(value) => updateData("bmPercentage", value)}
                      />
                      <InputSelect
                        value={newBarang.bmPembayaran ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("bmPembayaran", value);
                        }}
                        rules={[required()]}
                      />
                      <InputNumberWithPercentage value={100} disabled />
                    </div>
                  </InputWrapper>

                  <InputWrapper title="PDRI">
                    <div className="flex items-center gap-1">
                      <p className="w-3/4 text-sm font-bold">PPN (DPP 11/12)</p>
                      <InputNumberWithPercentage
                        value={newBarang.ppnPercentage ?? 0}
                        onChange={(value) => updateData("ppnPercentage", value)}
                      />
                      <InputSelect
                        value={newBarang.ppnPembayaran ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("ppnPembayaran", value);
                        }}
                        rules={[required()]}
                      />
                      <InputNumberWithPercentage value={100} disabled />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="w-3/4 text-sm">PPH</p>
                      <InputNumberWithPercentage
                        value={newBarang.pphPercentage ?? 0}
                        onChange={(value) => updateData("pphPercentage", value)}
                      />
                      <InputSelect
                        value={newBarang.pphPembayaran ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("pphPembayaran", value);
                        }}
                        rules={[required()]}
                      />
                      <InputNumberWithPercentage value={100} disabled />
                    </div>
                  </InputWrapper>

                  <InputWrapper title="BMT">
                    <div></div>
                  </InputWrapper>

                  <div className="w-full flex items-center border border-slate-200 bg-slate-100 px-4">
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
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <p className="hidden text-xs text-slate-500 sm:block">
            Pastikan seluruh data barang sudah sesuai.
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

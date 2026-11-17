"use client";
import { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import type { GoodsItemType } from "@/app/types";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import InputNumber from "@/app/components/inputs/input-number";
import InputRadio from "@/app/components/inputs/input-radio";
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
import {
  getIncrementalCost,
  getDeductionFees,
  getCif,
  getPricePerItem,
  getHsCode,
  getLabel,
  getCustomsInRupiah,
} from "@/lib/utils";
import { ModalFacilityDocument } from "./modalFacilityDocument";
import { hsData } from "@/app/constants/hs";
import { jenisKemasanOptions } from "@/app/constants/options/kemasKontainerOptions";
import { kodeJenisOptions } from "@/app/constants/options/dokumenOptions";
import { Plus, Trash } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";

const initialBarangData: GoodsItemType = {
  differenceStatement: statementPerbedaanOption[1].value,
};

type ModalAddItemProps = {
  onCloseModal: () => void;
  itemToEdit?: GoodsItemType | null;
};

export default function ModalAddItem({
  onCloseModal,
  itemToEdit,
}: ModalAddItemProps) {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;

  const series = data.goods.length + 1;

  const existingGoodsInvoicePrices = data.goods
    .filter((item) => item.series !== itemToEdit?.series)
    .reduce((total, item) => total + (item.invoicePrice ?? 0), 0);

  const defaultInvoicePrice = Math.max(
    0,
    (data.transactions.costComponents?.invoicePrice ?? 0) -
      existingGoodsInvoicePrices,
  );

  const [newItem, setNewItem] = useState<GoodsItemType>(() => ({
    ...initialBarangData,
    ...(itemToEdit ?? {}),
    invoicePrice: itemToEdit?.invoicePrice ?? defaultInvoicePrice,
  }));

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  function updateData(
    field: keyof GoodsItemType,
    value: number | string | boolean,
  ) {
    setNewItem({ ...newItem, [field]: value });
  }

  function handleTypeChange(value: string) {
    const nextType = value === "TANPA TIPE" ? "TANPA TIPE" : value;
    const autoHs = getHsCode(nextType);

    if (!autoHs) {
      setNewItem((current) => ({ ...current, type: nextType }));
      return;
    }

    const hs = hsData.find((item) => item.kode === autoHs);
    setNewItem((current) => ({
      ...current,
      type: nextType,
      hsCode: autoHs,
      importDutyPercentage: hs?.bm ?? current.importDutyPercentage ?? 0,
      incomeTaxPercentage: hs?.pph ?? current.incomeTaxPercentage ?? 0,
      vatPercentage: hs?.ppn ?? current.vatPercentage ?? 0,
    }));
  }

  function updateSpecs(field: string, value: string) {
    setNewItem({
      ...newItem,
      specifications: { ...newItem.specifications, [field]: value },
    });
  }

  function removeDocument(documentNumber: string) {
    setNewItem((current) => ({
      ...current,
      documents: current.documents?.filter(
        (document) => document.documentNumber !== documentNumber,
      ),
    }));
  }

  function handleCancel() {
    onCloseModal();
  }

  function handleSave() {
    const nextItem = {
      ...newItem,
      series: itemToEdit?.series ?? series,
      invoicePrice: newItem.invoicePrice ?? defaultInvoicePrice,
    };

    if (itemToEdit) {
      updateDocumentData({
        goods: data.goods.map((item) =>
          item.series === itemToEdit.series ? nextItem : item,
        ),
      });
    } else {
      updateDocumentData({
        goods: [...data.goods, nextItem],
      });
    }

    onCloseModal();
  }

  function checkRestricted() {
    const hs = hsData.find((item) => item.kode == newItem.hsCode);
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
                  value={(itemToEdit?.series ?? series).toString()}
                  disabled
                />
                {/* Pos Tarif/HS */}
                <InputSelect
                  labelPosition="left"
                  label="Pos Tarif/HS"
                  options={hsOption}
                  value={newItem.hsCode ?? ""}
                  onChange={(value) => {
                    const hs = hsData.find((item) => item.kode == value);

                    setNewItem((current) => ({
                      ...current,
                      hsCode: value,
                      importDutyPercentage:
                        hs?.bm ?? current.importDutyPercentage ?? 0,
                      incomeTaxPercentage:
                        hs?.pph ?? current.incomeTaxPercentage ?? 0,
                      vatPercentage: hs?.ppn ?? current.vatPercentage ?? 0,
                    }));
                  }}
                  rules={[required()]}
                  allowCustom
                />

                {/* FORM FOR 87046094 */}
                {newItem.hsCode == "87046094" && (
                  <Form_87046094 item={newItem} updateSpecs={updateSpecs} />
                )}

                <div className="w-full flex items-center gap-4 my-4">
                  <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0 mb-0">
                    Lartas
                  </p>
                  <p className="bg-green-200 text-gray-900 w-full p-2 border border-gray-300 rounded-md">
                    {checkRestricted()}
                  </p>
                </div>

                <InputNormal
                  labelPosition="left"
                  title="Kode Barang"
                  value={newItem.itemCode ?? ""}
                  onChange={(value) => updateData("itemCode", value)}
                  rules={[required()]}
                />

                <InputTextArea
                  labelPosition="left"
                  title="Uraian Jenis Barang"
                  value={newItem.description ?? ""}
                  onChange={(value) => updateData("description", value)}
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
                        checked={newItem.brand === "TANPA MEREK"}
                        onChange={(event) =>
                          updateData(
                            "brand",
                            event.target.checked ? "TANPA MEREK" : "",
                          )
                        }
                      />
                      Tanpa Merek
                    </label>
                    <InputNormal
                      value={newItem.brand ?? ""}
                      onChange={(value) => updateData("brand", value)}
                      rules={[required()]}
                      disabled={newItem.brand === "TANPA MEREK"}
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
                        checked={newItem.type === "TANPA TIPE"}
                        onChange={(event) =>
                          updateData(
                            "type",
                            event.target.checked ? "TANPA TIPE" : "",
                          )
                        }
                      />
                      Tanpa Tipe
                    </label>
                    <InputSelect
                      value={newItem.type ?? ""}
                      options={tipeBarangOptions}
                      onChange={handleTypeChange}
                      rules={[required()]}
                      disabled={newItem.type === "TANPA TIPE"}
                      allowCustom
                    />
                  </div>
                </div>

                <InputNormal
                  labelPosition="left"
                  title="Ukuran"
                  value={newItem.size ?? ""}
                  onChange={(value) => updateData("size", value)}
                  rules={[required()]}
                />
                <InputNormal
                  labelPosition="left"
                  title="Spesifikasi Lain"
                  value={newItem.otherSpecifications ?? ""}
                  onChange={(value) => updateData("otherSpecifications", value)}
                  rules={[required()]}
                />
                <InputSelect
                  labelPosition="left"
                  label="Kondisi Barang"
                  value={newItem.condition ?? ""}
                  options={kondisiBarangOption}
                  onChange={(value) => updateData("condition", value)}
                  rules={[required()]}
                />
                <InputSelect
                  labelPosition="left"
                  label="Negara"
                  value={newItem.countryOfOrigin ?? ""}
                  options={kodeNegaraOptions}
                  onChange={(value) => updateData("countryOfOrigin", value)}
                  rules={[required()]}
                />
                <InputNumber
                  labelPosition="left"
                  numberFormat={"US"}
                  title="Berat Bersih (kg)"
                  value={newItem.netWeight ?? 0}
                  onChange={(value) => updateData("netWeight", value)}
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
                      value={newItem.quantity ?? 0}
                      onChange={(value) => updateData("quantity", value)}
                      rules={[required()]}
                    />
                    <InputSelect
                      value={newItem.unitCode ?? ""}
                      options={kodeSatuanOptions}
                      onChange={(value) => updateData("unitCode", value)}
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
                      value={newItem.packageQuantity ?? 0}
                      onChange={(value) => updateData("packageQuantity", value)}
                      rules={[required()]}
                    />
                    <InputSelect
                      value={newItem.packageTypeCode ?? ""}
                      options={jenisKemasanOptions}
                      onChange={(value) => updateData("packageTypeCode", value)}
                      rules={[required()]}
                    />
                  </div>
                </div>

                <InputNumber
                  labelPosition="left"
                  numberFormat={"US"}
                  title="Harga Invoice"
                  value={newItem.invoicePrice ?? defaultInvoicePrice ?? 0}
                  onChange={(value) => updateData("invoicePrice", value)}
                  rules={[required()]}
                />
                <InputNumber
                  labelPosition="left"
                  title="Biaya Penambah"
                  value={getIncrementalCost(data.transactions) ?? 0}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  title="Biaya Pengurang"
                  value={getDeductionFees(data.transactions) ?? 0}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  title="Freight"
                  value={data.transactions.costComponents?.freight ?? 0}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  title="Asuransi"
                  value={data.transactions.costComponents?.insurance ?? 0}
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
                  value={getCif(newItem, data.transactions)}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  numberFormat={"US"}
                  title="Harga Per Satuan"
                  value={getPricePerItem(newItem)}
                  disabled
                />
                <InputNumber
                  labelPosition="left"
                  title="Nilai Pabean Rupiah"
                  value={getCustomsInRupiah(data.transactions, newItem)}
                  disabled
                />
                <InputSelect
                  labelPosition="left"
                  label="Metode Penentuan Nilai"
                  value={newItem.valuationMethod ?? ""}
                  options={metodePenentuanNilaiOptions}
                  onChange={(value) => {
                    updateData("valuationMethod", value);
                  }}
                  rules={[required()]}
                />
                {newItem.valuationMethod !=
                  metodePenentuanNilaiOptions[0].value && (
                  <InputSelect
                    labelPosition="left"
                    label="Alasan"
                    value={newItem.reason ?? ""}
                    options={alasanOptions}
                    onChange={(value) => {
                      updateData("reason", value);
                    }}
                    rules={[required()]}
                    disabled={!newItem.valuationMethod}
                  />
                )}

                <InputRadio
                  labelPosition="left"
                  title="Statement Perbedaan"
                  value={newItem.differenceStatement ?? ""}
                  options={statementPerbedaanOption}
                  onChange={(value) => {
                    updateData("differenceStatement", value);
                  }}
                />
              </div>
            </div>

            {/* DOKUMEN FASILITAS */}
            <div>
              <InputWrapper
                title="Dokumen Lampiran"
                headerChildren={
                  <NormalButton onClick={() => setIsDocumentModalOpen(true)}>
                    <Plus size={16} />
                    Tambah
                  </NormalButton>
                }
              >
                {/* Modal Dokumen */}
                {isDocumentModalOpen && (
                  <ModalFacilityDocument
                    onCloseModal={() => setIsDocumentModalOpen(false)}
                    selectedDocuments={newItem.documents ?? []}
                    onSaveDocuments={(documents) =>
                      setNewItem((current) => ({
                        ...current,
                        documents: documents,
                      }))
                    }
                  />
                )}

                {newItem.documents && (
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
                          {newItem.documents.map((doc) => {
                            const document = data.documents.find(
                              (item) =>
                                item.documentNumber === doc.documentNumber,
                            );

                            return document ? (
                              <tr
                                key={document?.documentNumber}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 font-medium">
                                  {document.series}
                                </td>

                                <td className="px-4 py-3">
                                  {getLabel(
                                    kodeJenisOptions,
                                    document.documentCode,
                                  )}
                                </td>

                                <td className="px-4 py-3">
                                  {document.documentNumber}
                                </td>

                                <td className="px-4 py-3">
                                  {document.documentDate}
                                </td>
                                <td className="px-4 py-3">
                                  {document.facilityCode}
                                </td>
                                <td className="px-4 py-3">
                                  {document.permissionCode}
                                </td>
                                <td className="px-4 py-3">
                                  {doc.documentSequence ? (
                                    <InputNumber
                                      value={doc.documentSequence}
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
                                      removeDocument(document.documentNumber)
                                    }
                                    aria-label={`Hapus dokumen ${document.documentNumber}`}
                                    title="Hapus dokumen"
                                    className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:cursor-pointer"
                                  >
                                    <Trash size={16} />
                                  </button>
                                </td>
                              </tr>
                            ) : (
                              <tr key={doc.documentNumber}>
                                <td
                                  rowSpan={8}
                                >{`Gagal menampilkan dokumen ${doc.documentNumber}`}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {!newItem.documents?.length && (
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
                        value={newItem.importDutyRateType ?? ""}
                        options={jenisTarifOptions}
                        onChange={(value) => {
                          updateData("importDutyRateType", value);
                        }}
                        rules={[required()]}
                      />
                      <InputNumberWithPercentage
                        value={newItem.importDutyPercentage ?? 0}
                        onChange={(value) =>
                          updateData("importDutyPercentage", value)
                        }
                      />
                      <InputSelect
                        value={newItem.importDutyPayment ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("importDutyPayment", value);
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
                        value={newItem.vatPercentage ?? 0}
                        onChange={(value) => updateData("vatPercentage", value)}
                      />
                      <InputSelect
                        value={newItem.vatPayment ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("vatPayment", value);
                        }}
                        rules={[required()]}
                      />
                      <InputNumberWithPercentage value={100} disabled />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="w-3/4 text-sm">PPH</p>
                      <InputNumberWithPercentage
                        value={newItem.incomeTaxPercentage ?? 0}
                        onChange={(value) =>
                          updateData("incomeTaxPercentage", value)
                        }
                      />
                      <InputSelect
                        value={newItem.incomeTaxPayment ?? ""}
                        options={pembayaranOptions}
                        onChange={(value) => {
                          updateData("incomeTaxPayment", value);
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
                        checked={newItem.isExcise ?? false}
                        onChange={(event) =>
                          updateData(
                            "isExcise",
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

            <NormalButton onClick={handleSave}>Simpan</NormalButton>
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

"use client";
import React, { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../inputs/input-wrapper";
import ModalAddKemasanItem from "./modalAddKemasan";
import ModalAddKontainerItem from "./modalAddKontainer";
import ModalUserConfirmation from "@/app/(protected)/dokumen-pabean/components/modalUserConfirmation";
import {
  jenisKemasanOptions,
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/app/constants/options/kemasKontainerOptions";
import { getLabel } from "@/lib/utils";
import { KemasanItemData, KontainerItemData } from "@/app/types";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";
import { NormalButton } from "@/app/(protected)/dokumen-pabean/components/buttons";

export default function KemasanKontainerTab() {
  const { documentData, updateDocumentData } = useDocument();
  const data = documentData!;

  const [isKemasanModalOpen, setIsKemasanModalOpen] = useState(false);
  const [kemasanToEdit, setKemasanToEdit] = useState<KemasanItemData | null>(
    null,
  );
  const [kemasanToDelete, setKemasanToDelete] =
    useState<KemasanItemData | null>(null);
  const handleEditKemasan = (kemasan: KemasanItemData) => {
    setKemasanToEdit(kemasan);
    setIsKemasanModalOpen(true);
  };
  const handleDeleteKemasan = () => {
    if (!kemasanToDelete) return;
    let kemasanList = data.listKemasan.filter(
      (kemasan) => kemasan.seri !== kemasanToDelete.seri,
    );
    kemasanList = kemasanList.map((item, index) => ({
      ...item,
      seri: index + 1,
    }));

    updateDocumentData({
      listKemasan: kemasanList,
    });
    setKemasanToDelete(null);
  };

  const [isKontainerModalOpen, setIsKontainerModalOpen] = useState(false);
  const [kontainerToEdit, setKontainerToEdit] =
    useState<KontainerItemData | null>(null);
  const [kontainerToDelete, setKontainerToDelete] =
    useState<KontainerItemData | null>(null);

  const handleEditKontainer = (kontainer: KontainerItemData) => {
    setKontainerToEdit(kontainer);
    setIsKontainerModalOpen(true);
  };

  const handleDeleteKontainer = () => {
    if (!kontainerToDelete) return;
    let kontainerList = data.listKontainer.filter(
      (kontainer) => kontainer.seri !== kontainerToDelete.seri,
    );
    kontainerList = kontainerList.map((item, index) => ({
      ...item,
      seri: index + 1,
    }));

    updateDocumentData({
      listKontainer: kontainerList,
    });
    setKontainerToDelete(null);
  };

  return (
    <div>
      {/* Warning */}
      <div className="w-full bg-yellow-200 rounded-sm flex gap-2 items-center p-3 mb-4">
        <div className="w-5 h-5 rounded-full bg-yellow-500 flex justify-center items-center p-1">
          !
        </div>
        <div className="text-sm text-gray-800">Wajib Mengisi Data Kemasan</div>
      </div>

      <div className="space-y-6">
        {/* Form */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Kemasan */}
          <InputWrapper
            title="Kemasan"
            headerChildren={
              <NormalButton onClick={() => setIsKemasanModalOpen(true)}>
                <Plus size={16} /> Tambah
              </NormalButton>
            }
          >
            {/* Table Data Kemasan */}
            <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-150 text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <TH className="w-20 text-center">Seri</TH>
                      <TH>Jumlah</TH>
                      <TH>Jenis</TH>
                      <TH>Merek</TH>
                      <TH className="w-24 text-center">Aksi</TH>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {data.listKemasan.map((item) => (
                      <tr
                        key={`${item.seri}-${item.merek}`}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <TD className="text-center font-medium tabular-nums">
                          {item.seri}
                        </TD>

                        <TD className="tabular-nums">{item.jumlahKemasan}</TD>

                        <TD>
                          {getLabel(jenisKemasanOptions, item.kodeKemasan)}
                        </TD>

                        <TD>{item.merek}</TD>

                        <TD>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditKemasan(item)}
                              title="Edit kemasan"
                              aria-label="Edit kemasan"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                            >
                              <SquareArrowOutUpRight size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => setKemasanToDelete(item)}
                              title="Hapus kemasan"
                              aria-label="Hapus kemasan"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </TD>
                      </tr>
                    ))}

                    {data.listKemasan.length === 0 && (
                      <tr>
                        <TD
                          colSpan={5}
                          className="py-10 text-center text-slate-400"
                        >
                          Belum ada data kemasan.
                        </TD>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </InputWrapper>

          {/* Kontainer */}
          <InputWrapper
            title="Kontainer"
            headerChildren={
              <NormalButton onClick={() => setIsKontainerModalOpen(true)}>
                <Plus size={16} /> Tambah
              </NormalButton>
            }
          >
            {/* TABLE DATA KONTAINER */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-180 text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <TH className="w-20 text-center">Seri</TH>
                      <TH>Nomor</TH>
                      <TH>Ukuran</TH>
                      <TH>Jenis</TH>
                      <TH>Tipe</TH>
                      <TH className="w-24 text-center">Aksi</TH>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {data.listKontainer.map((item) => (
                      <tr
                        key={item.seri}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <TD className="text-center font-medium tabular-nums">
                          {item.seri}
                        </TD>

                        <TD className="font-medium text-slate-700">
                          {item.nomorKontiner}
                        </TD>

                        <TD>
                          {getLabel(
                            ukuranKontainerOptions,
                            item.kodeUkuranKontainer,
                          )}
                        </TD>

                        <TD>
                          {getLabel(
                            jenisMuatanOptions,
                            item.kodeJenisKontainer,
                          )}
                        </TD>

                        <TD>
                          {getLabel(
                            tipeKontainerOptions,
                            item.kodeTipeKontainer ?? "",
                          )}
                        </TD>

                        <TD>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditKontainer(item)}
                              title="Edit kontainer"
                              aria-label="Edit kontainer"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            >
                              <SquareArrowOutUpRight size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => setKontainerToDelete(item)}
                              title="Hapus kontainer"
                              aria-label="Hapus kontainer"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </TD>
                      </tr>
                    ))}

                    {data.listKontainer.length === 0 && (
                      <tr>
                        <TD
                          colSpan={6}
                          className="py-10 text-center text-slate-400"
                        >
                          Belum ada data kontainer.
                        </TD>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </InputWrapper>
        </div>
      </div>

      {/* Modal Kemasan */}
      {isKemasanModalOpen && (
        <ModalAddKemasanItem
          kemasan={kemasanToEdit ?? undefined}
          onCloseModal={() => {
            setKemasanToEdit(null);
            setIsKemasanModalOpen(false);
          }}
        />
      )}

      {/* Modal Kontainer */}
      {isKontainerModalOpen && (
        <ModalAddKontainerItem
          kontainer={kontainerToEdit ?? undefined}
          onCloseModal={() => {
            setKontainerToEdit(null);
            setIsKontainerModalOpen(false);
          }}
        />
      )}

      {/* Modal Delete Kemasan */}
      {kemasanToDelete && (
        <ModalUserConfirmation
          handleYes={handleDeleteKemasan}
          handleNo={() => setKemasanToDelete(null)}
        />
      )}
      {/* Modal Delete Kontainer */}
      {kontainerToDelete && (
        <ModalUserConfirmation
          handleYes={handleDeleteKontainer}
          handleNo={() => setKontainerToDelete(null)}
        />
      )}
    </div>
  );
}

function TH({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}

type TDProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
};

function TD({ children, className = "", colSpan }: TDProps) {
  return (
    <td colSpan={colSpan} className={`px-4 py-3 text-slate-700 ${className}`}>
      {children}
    </td>
  );
}

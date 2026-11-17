"use client";
import React, { useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import ModalAddPackage from "./modalAddPackage";
import ModalAddContainer from "./modalAddContainer";
import ModalUserConfirmation from "@/app/components/modalUserConfirmation";
import {
  jenisKemasanOptions,
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/app/constants/options/kemasKontainerOptions";
import { getLabel } from "@/lib/utils";
import { PackageItemType, ContainerItemType } from "@/app/types";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";
import { NormalButton } from "@/app/components/buttons";

export default function PackageContainerTab() {
  const { draft: documentData, updateDraftData: updateDocumentData } =
    useDraft();
  const data = documentData!;
  const packages = data.packages;
  const containers = data.containers;

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState<PackageItemType | null>(
    null,
  );
  const [packageToDelete, setPackageToDelete] =
    useState<PackageItemType | null>(null);

  const handleEditPackage = (item: PackageItemType) => {
    setPackageToEdit(item);
    setIsPackageModalOpen(true);
  };

  const handleDeletePackage = () => {
    if (!packageToDelete) return;
    let packageList = packages.filter(
      (item) => item.series !== packageToDelete.series,
    );
    packageList = packageList.map((item, index) => ({
      ...item,
      series: index + 1,
    }));

    updateDocumentData({
      packages: packageList,
    });
    setPackageToDelete(null);
  };

  const [isContainerModalOpen, setIsContainerModalOpen] = useState(false);
  const [containerToEdit, setContainerToEdit] =
    useState<ContainerItemType | null>(null);
  const [containerToDelete, setContainerToDelete] =
    useState<ContainerItemType | null>(null);

  const handleEditContainer = (item: ContainerItemType) => {
    setContainerToEdit(item);
    setIsContainerModalOpen(true);
  };

  const handleDeleteContainer = () => {
    if (!containerToDelete) return;
    let containerList = containers.filter(
      (item) => item.series !== containerToDelete.series,
    );
    containerList = containerList.map((item, index) => ({
      ...item,
      series: index + 1,
    }));

    updateDocumentData({
      containers: containerList,
    });
    setContainerToDelete(null);
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
              <NormalButton onClick={() => setIsPackageModalOpen(true)}>
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
                    {packages.map((item) => (
                      <tr
                        key={`${item.series}-${item.brand}`}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <TD className="text-center font-medium tabular-nums">
                          {item.series}
                        </TD>

                        <TD className="tabular-nums">{item.quantity}</TD>

                        <TD>
                          {getLabel(jenisKemasanOptions, item.packageCode)}
                        </TD>

                        <TD>{item.brand}</TD>

                        <TD>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditPackage(item)}
                              title="Edit kemasan"
                              aria-label="Edit kemasan"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                            >
                              <SquareArrowOutUpRight size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => setPackageToDelete(item)}
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

                    {packages.length === 0 && (
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
              <NormalButton onClick={() => setIsContainerModalOpen(true)}>
                <Plus size={16} /> Tambah
              </NormalButton>
            }
          >
            {/* TABLE DATA KONTAINER */}
            <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
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
                    {containers.map((item) => (
                      <tr
                        key={item.series}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <TD className="text-center font-medium tabular-nums">
                          {item.series}
                        </TD>

                        <TD className="font-medium text-slate-700">
                          {item.containerNumber}
                        </TD>

                        <TD>
                          {getLabel(
                            ukuranKontainerOptions,
                            item.containerSizeCode,
                          )}
                        </TD>

                        <TD>
                          {getLabel(
                            jenisMuatanOptions,
                            item.containerCategoryCode,
                          )}
                        </TD>

                        <TD>
                          {getLabel(
                            tipeKontainerOptions,
                            item.containerTypeCode ?? "",
                          )}
                        </TD>

                        <TD>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditContainer(item)}
                              title="Edit kontainer"
                              aria-label="Edit kontainer"
                              className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            >
                              <SquareArrowOutUpRight size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => setContainerToDelete(item)}
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

                    {containers.length === 0 && (
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
      {isPackageModalOpen && (
        <ModalAddPackage
          pack={packageToEdit ?? undefined}
          onCloseModal={() => {
            setPackageToEdit(null);
            setIsPackageModalOpen(false);
          }}
        />
      )}

      {/* Modal Kontainer */}
      {isContainerModalOpen && (
        <ModalAddContainer
          container={containerToEdit ?? undefined}
          onCloseModal={() => {
            setContainerToEdit(null);
            setIsContainerModalOpen(false);
          }}
        />
      )}

      {/* Modal Delete Kemasan */}
      {packageToDelete && (
        <ModalUserConfirmation
          title="Hapus Kemasan"
          description="Apakah anda yakin ingin menghapus kemasan ini?"
          handleYes={handleDeletePackage}
          handleNo={() => setPackageToDelete(null)}
        />
      )}
      {/* Modal Delete Kontainer */}
      {containerToDelete && (
        <ModalUserConfirmation
          title="Hapus Kontainer"
          description="Apakah anda yakin ingin menghapus kontainer ini?"
          handleYes={handleDeleteContainer}
          handleNo={() => setContainerToDelete(null)}
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

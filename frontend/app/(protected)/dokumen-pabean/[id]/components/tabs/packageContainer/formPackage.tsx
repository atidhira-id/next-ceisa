"use client";

import { useState } from "react";
import { useOptions } from "@/app/hooks/useOptions";
import { useDraft } from "@/app/providers/draftProvider";
import { PackageItemType } from "@/app/types/draft";
import { getLabel } from "@/app/lib/utils";

import InputWrapper from "@/app/components/inputs/input-wrapper";
import ModalUserConfirmation from "@/app/components/modalUserConfirmation";
import ModalAddPackage from "./modalAddPackage";
import { TH, TD } from "./index";
import { NormalButton } from "@/app/components/buttons";
import { Trash, SquareArrowOutUpRight, Plus } from "lucide-react";

export default function FormPackage() {
  const { draft, updateDraftData, markSectionDirty } = useDraft();
  const data = draft!;
  const packages = data.packages;

  const packageTypes = useOptions("PACKAGE_TYPE");

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

    updateDraftData({
      packages: packageList,
    });

    markSectionDirty("packages");
    setPackageToDelete(null);
  };

  return (
    <>
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

                    <TD>{getLabel(packageTypes.options, item.packageCode)}</TD>

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

      {/* Modal Delete Kemasan */}
      {packageToDelete && (
        <ModalUserConfirmation
          title="Hapus Kemasan"
          description="Apakah anda yakin ingin menghapus kemasan ini?"
          handleYes={handleDeletePackage}
          handleNo={() => setPackageToDelete(null)}
        />
      )}
    </>
  );
}

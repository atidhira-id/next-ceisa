"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import ModalAddKemasanItem from "./modal-add-kemasan";
import ModalAddKontainerItem from "./modal-add-kontainer";
import ModalUserConfirmation from "@/app/(protected)/dokumen-pabean/components/modal-user-confirmation";
import {
  jenisKemasanOptions,
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/lib/options";
import { getLabel } from "@/lib/utils";
import { KemasanItemData, KontainerItemData } from "@/app/providers/types";

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
    const kemasanList = data.listKemasan.filter(
      (kemasan) => kemasan.seri !== kemasanToDelete.seri,
    );
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
    const kontainerList = data.listKontainer.filter(
      (kontainer) => kontainer.seri !== kontainerToDelete.seri,
    );
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
              <button
                type="button"
                onClick={() => setIsKemasanModalOpen(true)}
                className="rounded-md bg-gray-900 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                + Tambah
              </button>
            }
          >
            {/* Table Data Kemasan */}
            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="w-16 px-4 py-3 font-medium text-gray-600">
                        Seri
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Jumlah
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Jenis
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Merek
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-600"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.listKemasan.map((item) => (
                      <tr key={item.seri} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{item.seri}</td>

                        <td className="px-4 py-3">{item.jumlahKemasan}</td>

                        <td className="px-4 py-3">
                          {getLabel(jenisKemasanOptions, item.kodeKemasan)}
                        </td>

                        <td className="px-4 py-3">{item.merek}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEditKemasan(item)}
                            className="mr-4 text-blue-600 hover:text-blue-800 hover:underline hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setKemasanToDelete(item)}
                            className="text-red-600 hover:text-red-800 hover:underline hover:cursor-pointer"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </InputWrapper>

          {/* Kontainer */}
          <InputWrapper
            title="Kontainer"
            headerChildren={
              <button
                type="button"
                onClick={() => setIsKontainerModalOpen(true)}
                className="rounded-md bg-gray-900 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                + Tambah
              </button>
            }
          >
            {/* Table Data Kontainer */}
            <div className="overflow-hidden rounded-lg border bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="w-16 px-4 py-3 font-medium text-gray-600">
                        Seri
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Nomor
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Ukuran
                      </th>

                      <th className="px-4 py-3 font-medium text-gray-600">
                        Jenis
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-600">
                        Tipe
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-600"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.listKontainer.map((item) => (
                      <tr key={item.seri} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{item.seri}</td>

                        <td className="px-4 py-3">{item.nomorKontiner}</td>

                        <td className="px-4 py-3">
                          {getLabel(
                            ukuranKontainerOptions,
                            item.kodeUkuranKontainer,
                          )}
                        </td>

                        <td className="px-4 py-3">
                          {getLabel(
                            jenisMuatanOptions,
                            item.kodeJenisKontainer,
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {getLabel(
                            tipeKontainerOptions,
                            item.kodeTipeKontainer!,
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEditKontainer(item)}
                            className="mr-4 text-blue-600 hover:text-blue-800 hover:underline hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setKontainerToDelete(item)}
                            className="text-red-600 hover:text-red-800 hover:underline hover:cursor-pointer"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
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
          onCloseModal={() => setIsKemasanModalOpen(false)}
        />
      )}

      {/* Modal Kontainer */}
      {isKontainerModalOpen && (
        <ModalAddKontainerItem
          kontainer={kontainerToEdit ?? undefined}
          onCloseModal={() => setIsKontainerModalOpen(false)}
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

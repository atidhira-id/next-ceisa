"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import InputWrapper from "../../input-wrapper";
import ModalAddKemasanItem from "./modal-add-kemasan";
import ModalAddKontainerItem from "./modal-add-kontainer";
import {
  jenisKemasanOptions,
  jenisMuatanOptions,
  tipeKontainerOptions,
  ukuranKontainerOptions,
} from "@/lib/options";

export default function KemasanKontainerTab() {
  const { documentData } = useDocument();
  const data = documentData!;

  const [isKemasanModalOpen, setIsKemasanModalOpen] = useState(false);
  const [isKontainerModalOpen, setIsKontainerModalOpen] = useState(false);

  const getJenisKemasan = (code: string) => {
    const option = jenisKemasanOptions.find((item) => item.value === code);
    return option?.label;
  };

  const getUkuranKontainer = (code: string) => {
    const option = ukuranKontainerOptions.find((item) => item.value === code);
    return option?.label;
  };

  const getJenisMuatan = (code: string) => {
    const option = jenisMuatanOptions.find((item) => item.value === code);
    return option?.label;
  };

  const getTipeKontainer = (code: string) => {
    const option = tipeKontainerOptions.find((item) => item.value === code);
    return option?.label;
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
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.listKemasan.map((item) => (
                      <tr key={item.seri} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{item.seri}</td>

                        <td className="px-4 py-3">{item.jumlahKemasan}</td>

                        <td className="px-4 py-3">
                          {getJenisKemasan(item.kodeKemasan!)}
                        </td>

                        <td className="px-4 py-3">{item.merek}</td>
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
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.listKontainer.map((item) => (
                      <tr key={item.seri} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{item.seri}</td>

                        <td className="px-4 py-3">{item.nomorKontiner}</td>

                        <td className="px-4 py-3">
                          {getUkuranKontainer(item.kodeUkuranKontainer!)}
                        </td>

                        <td className="px-4 py-3">
                          {getJenisMuatan(item.kodeJenisKontainer!)}
                        </td>
                        <td className="px-4 py-3">
                          {getTipeKontainer(item.kodeTipeKontainer!)}
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
          onCloseModal={() => setIsKemasanModalOpen(false)}
        />
      )}

      {/* Modal Kontainer */}
      {isKontainerModalOpen && (
        <ModalAddKontainerItem
          onCloseModal={() => setIsKontainerModalOpen(false)}
        />
      )}
    </div>
  );
}

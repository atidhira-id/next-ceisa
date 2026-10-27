"use client";
import { useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { Warning } from "../../warning";
import ModalAddBarang from "./modal-add-barang";

export default function BarangTab() {
  const { documentData } = useDocument();
  const data = documentData!;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Warning text="Wajib mengisi data barang" />
      <Warning text={`CIF barang (0) tidak sama dengan CIF transaksi (xxx)`} />

      {/* Header */}
      <div className="mb-6 w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Barang</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalAddBarang onCloseModal={() => setIsModalOpen(false)} />
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 font-medium text-gray-600">
                  Seri
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Pos Tarif/HS
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Uraian Jenis Barang
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Nilai Barang
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Jumlah Satuan
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.listBarang.map((barang) => (
                <tr key={barang.seri} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{barang.seri}</td>

                  <td className="px-4 py-3">{barang.hs}</td>

                  <td className="px-4 py-3">
                    {barang.spesifikasi?.jenisKendaraan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

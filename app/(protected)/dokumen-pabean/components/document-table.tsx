"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Draft = {
  id: string;
  nomorAju: string;
  kodeDokumen: string;
  jenisEntitas: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function DocumentTable() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDrafts() {
      try {
        const response = await fetch("/api/documents/drafts", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data draft.");
        }

        const result: { drafts: Draft[] } = await response.json();

        if (!cancelled) {
          // Gunakan data Neon jika tersedia.
          // Jika kosong, tampilkan data dummy.
          setDrafts(result.drafts.length > 0 ? result.drafts : []);
        }
      } catch {
        if (!cancelled) {
          setError("Data dari Database tidak dapat dimuat.");
          // Data dummy tetap terlihat jika API gagal.
          setDrafts([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDrafts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <p>Memuat daftar dokumen...</p>;
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white">
        {error && (
          <div className=" bg-red-400 rounded-sm p-2 m-2 flex items-center gap-2 text-base text-gray-100 font-bold">
            <div className="w-6 h-6 bg-red-600 rounded-full p-1 flex items-center justify-center">
              !
            </div>
            <p className="">{error}</p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 font-medium text-gray-600">
                  Nomor
                </th>
                <th className="w-16 px-4 py-3 font-medium text-gray-600">
                  Nomor Aju
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Kode Dokumen
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Jenis Entitas
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Terakhir Diperbarui
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {drafts.map((document, index) => (
                <tr key={document.nomorAju} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                  <td className="px-4 py-3 font-medium">{document.nomorAju}</td>

                  <td className="px-4 py-3">{document.kodeDokumen}</td>

                  <td className="px-4 py-3">{document.jenisEntitas}</td>

                  <td className="px-4 py-3">{document.updatedAt}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dokumen-pabean/${encodeURIComponent(
                        document.nomorAju,
                      )}`}
                      className="text-blue-600 hover:underline"
                    >
                      Buka
                    </Link>
                  </td>
                </tr>
              ))}

              {drafts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    Belum ada dokumen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SquareArrowOutUpRight, Trash } from "lucide-react";

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
  const [nomorAjuFilter, setNomorAjuFilter] = useState("");
  const [kodeDokumenFilter, setKodeDokumenFilter] = useState("");
  const [jenisEntitasFilter, setJenisEntitasFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadDrafts = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError("");

      const response = await fetch("/api/documents/drafts", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data draft.");
      }

      const result: { drafts: Draft[] } = await response.json();

      setDrafts(result.drafts);
    } catch {
      setError("Data dari database tidak dapat dimuat.");
      setDrafts([]);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, []);

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
          setDrafts(result.drafts);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setError("Data dari database tidak dapat dimuat.");
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

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.nomorAju.toLowerCase().includes(nomorAjuFilter.trim().toLowerCase()) &&
      draft.kodeDokumen
        .toLowerCase()
        .includes(kodeDokumenFilter.trim().toLowerCase()) &&
      draft.jenisEntitas
        .toLowerCase()
        .includes(jenisEntitasFilter.trim().toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filteredDrafts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * pageSize;
  const visibleDrafts = filteredDrafts.slice(
    firstItemIndex,
    firstItemIndex + pageSize,
  );

  if (isLoading) {
    return <p>Memuat daftar dokumen...</p>;
  }

  async function handleDeleteDraft(nomorAju: string) {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus draft ${nomorAju}?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/documents/drafts/${encodeURIComponent(nomorAju)}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Gagal menghapus draft.");
      }

      await loadDrafts();
    } catch (error) {
      console.error("Gagal menghapus draft:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghapus draft.",
      );
    }
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
                <th className="w-16 px-4 pt-3 font-medium text-gray-600">
                  Nomor
                </th>
                <th className="w-16 px-4 pt-3 font-medium text-gray-600">
                  <p>Nomor Aju</p>
                </th>

                <th className="px-4 pt-3 font-medium text-gray-600">
                  <p>Kode Dokumen</p>
                </th>

                <th className="px-4 pt-3 font-medium text-gray-600">
                  <p>Jenis Entitas</p>
                </th>

                <th className="px-4 pt-3 font-medium text-gray-600">
                  Terakhir Diperbarui
                </th>

                <th className="px-4 pt-3 font-medium text-gray-600 text-right">
                  Aksi
                </th>
              </tr>
              <tr>
                <th className="w-16 px-4 pb-3"></th>
                <th className="px-4 pb-3">
                  <input
                    type="search"
                    value={nomorAjuFilter}
                    onChange={(event) => {
                      setNomorAjuFilter(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari Nomor Aju"
                    aria-label="Filter Nomor Aju"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </th>

                <th className="px-4 pb-3">
                  <input
                    type="search"
                    value={kodeDokumenFilter}
                    onChange={(event) => {
                      setKodeDokumenFilter(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari Kode Dokumen"
                    aria-label="Filter Kode Dokumen"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </th>

                <th className="px-4 pb-3">
                  <input
                    type="search"
                    value={jenisEntitasFilter}
                    onChange={(event) => {
                      setJenisEntitasFilter(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari Jenis Entitas"
                    aria-label="Filter Jenis Entitas"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-normal text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </th>

                <th className="px-4 pb-3"></th>
                <th className="px-4 pb-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {visibleDrafts.map((document, index) => (
                <tr key={document.nomorAju} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">
                    {firstItemIndex + index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium">{document.nomorAju}</td>

                  <td className="px-4 py-3">{document.kodeDokumen}</td>

                  <td className="px-4 py-3">{document.jenisEntitas}</td>

                  <td className="px-4 py-3">{document.updatedAt}</td>
                  <td className="px-4 py-3 flex gap-3 justify-end">
                    <Link
                      href={`/dokumen-pabean/${encodeURIComponent(
                        document.nomorAju,
                      )}`}
                      className="text-blue-600 hover:underline"
                    >
                      <SquareArrowOutUpRight size={18} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(document.nomorAju)}
                      className="text-red-600 hover:text-red-800 hover:underline hover:cursor-pointer"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDrafts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    {drafts.length === 0
                      ? "Belum ada dokumen."
                      : "Tidak ada dokumen yang sesuai dengan filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="draft-page-size">Baris per halaman</label>
            <select
              id="draft-page-size"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>
              Menampilkan{" "}
              {filteredDrafts.length === 0 ? 0 : firstItemIndex + 1}-
              {Math.min(firstItemIndex + visibleDrafts.length, filteredDrafts.length)}{" "}
              dari {filteredDrafts.length} dokumen
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span aria-live="polite">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

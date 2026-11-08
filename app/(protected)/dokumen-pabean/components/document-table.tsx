"use client";

import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import Link from "next/link";
import type { Draft } from "@/app/types";
import { formatDateIndonesian } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";

type SortKey = "createdAt" | "updatedAt";
type SortDirection = "asc" | "desc";

export default function DocumentTable() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [nomorAjuFilter, setNomorAjuFilter] = useState("");
  const [kodeDokumenFilter, setKodeDokumenFilter] = useState("");
  const [jenisEntitasFilter, setJenisEntitasFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "createdAt",
    direction: "desc",
  });

  const fetchDrafts = useCallback(async () => {
    const response = await fetch("/api/documents/drafts", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data draft.");
    }

    const result: { drafts: Draft[] } = await response.json();
    return result.drafts;
  }, []);

  const loadDrafts = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) {
          setIsLoading(true);
        }

        setError("");
        const nextDrafts = await fetchDrafts();
        setDrafts(nextDrafts);
      } catch {
        setError("Data dari database tidak dapat dimuat.");
        setDrafts([]);
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [fetchDrafts],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadInitialDrafts() {
      try {
        const nextDrafts = await fetchDrafts();

        if (!cancelled) {
          setDrafts(nextDrafts);
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

    void loadInitialDrafts();

    return () => {
      cancelled = true;
    };
  }, [fetchDrafts]);

  const handleSort = (key: SortKey) => {
    setSortConfig((current) => {
      const nextDirection =
        current.key === key && current.direction === "asc" ? "desc" : "asc";

      return {
        key,
        direction: current.key === key ? nextDirection : "desc",
      };
    });
    setPage(1);
  };

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.nomorAju
        .toLowerCase()
        .includes(nomorAjuFilter.trim().toLowerCase()) &&
      draft.kodeDokumen
        .toLowerCase()
        .includes(kodeDokumenFilter.trim().toLowerCase()) &&
      draft.jenisEntitas
        .toLowerCase()
        .includes(jenisEntitasFilter.trim().toLowerCase()),
  );

  const sortedDrafts = [...filteredDrafts].sort((draftA, draftB) => {
    const leftValue = new Date(draftA[sortConfig.key]).getTime();
    const rightValue = new Date(draftB[sortConfig.key]).getTime();

    return sortConfig.direction === "asc"
      ? leftValue - rightValue
      : rightValue - leftValue;
  });

  const totalPages = Math.max(1, Math.ceil(sortedDrafts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * pageSize;
  const visibleDrafts = sortedDrafts.slice(
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
      <div className="overflow-hidden rounded-sm border">
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
            <thead className="border-b bg-red-100">
              <tr>
                <TH>Nomor</TH>
                <TH>
                  <p>Nomor Aju</p>
                  <FilterInput
                    value={nomorAjuFilter}
                    label="Filter Nomor Aju"
                    onChange={(event) => {
                      setNomorAjuFilter(event.target.value);
                      setPage(1);
                    }}
                  />
                </TH>
                <TH>
                  <p>Kode Dokumen</p>
                  <FilterInput
                    value={kodeDokumenFilter}
                    label="Filter Kode Dokumen"
                    onChange={(event) => {
                      setKodeDokumenFilter(event.target.value);
                      setPage(1);
                    }}
                  />
                </TH>
                <TH>
                  <p>Jenis Entitas</p>
                  <FilterInput
                    value={jenisEntitasFilter}
                    label="Filter Jenis Entitas"
                    onChange={(event) => {
                      setJenisEntitasFilter(event.target.value);
                      setPage(1);
                    }}
                  />
                </TH>
                <TH>
                  <button
                    type="button"
                    onClick={() => handleSort("createdAt")}
                    className="m-auto flex items-center gap-1 text-left transition hover:text-gray-900 hover:cursor-pointer"
                    aria-label="Urutkan berdasarkan tanggal dibuat"
                  >
                    <span>Tanggal Dibuat</span>
                    {sortConfig.key === "createdAt" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </TH>
                <TH>
                  <button
                    type="button"
                    onClick={() => handleSort("updatedAt")}
                    className="m-auto flex items-center gap-1 text-left transition hover:text-gray-900 hover:cursor-pointer"
                    aria-label="Urutkan berdasarkan tanggal terakhir diperbarui"
                  >
                    <span>Terakhir Diperbarui</span>
                    {sortConfig.key === "updatedAt" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </TH>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {visibleDrafts.map((document, index) => (
                <tr
                  key={document.nomorAju}
                  className={`${index % 2 == 0 ? "bg-gray-50" : "bg-red-50"} hover:bg-red-100`}
                >
                  <TD>{firstItemIndex + index + 1}</TD>
                  <TD>{document.nomorAju}</TD>
                  <TD>{document.kodeDokumen}</TD>
                  <TD>{document.jenisEntitas}</TD>
                  <TD>{formatDateIndonesian(document.createdAt)}</TD>
                  <TD>{formatDateIndonesian(document.updatedAt)}</TD>
                  <TD className="flex gap-3 justify-end">
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
                  </TD>
                </tr>
              ))}

              {sortedDrafts.length === 0 && (
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

        <div className="flex flex-col gap-3 border-t px-4 py-3 bg-red-100 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
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
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={16} />
            </button>
            <span aria-live="polite">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type THProps = {
  children: React.ReactNode;
  className?: string;
};

type FilterInputProps = {
  value: string;
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function TH({ children, className }: THProps) {
  return (
    <th
      className={`px-4 py-3 text-center text-base font-bold text-gray-900 ${className}`}
    >
      {children}
    </th>
  );
}

function TD({ children, className }: THProps) {
  return (
    <td className={`px-4 py-3 font-medium text-center ${className}`}>
      {children}
    </td>
  );
}

function FilterInput({ value, label, onChange }: FilterInputProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      aria-label={label}
      className="w-full max-w-48 rounded-sm border bg-background text-gray-900 border-red-200 px-2 py-1 font-normal focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
    />
  );
}

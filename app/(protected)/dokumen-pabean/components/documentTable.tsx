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
import ModalUserConfirmation from "./modalUserConfirmation";

type SortKey = "createdAt" | "updatedAt";
type SortDirection = "asc" | "desc";

export default function DocumentTable() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);
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
      setDraftToDelete(null);
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
      <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
        {/* ERROR MESSAGE */}
        {error && (
          <div className="m-3 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
              !
            </div>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275 text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <TH className="w-16 text-center">Nomor</TH>

                <TH>
                  <div className="space-y-2">
                    <p>Nomor Aju</p>
                    <FilterInput
                      value={nomorAjuFilter}
                      label="Filter Nomor Aju"
                      onChange={(event) => {
                        setNomorAjuFilter(event.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </TH>

                <TH>
                  <div className="space-y-2">
                    <p>Kode Dokumen</p>
                    <FilterInput
                      value={kodeDokumenFilter}
                      label="Filter Kode Dokumen"
                      onChange={(event) => {
                        setKodeDokumenFilter(event.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </TH>

                <TH>
                  <div className="space-y-2">
                    <p>Jenis Entitas</p>
                    <FilterInput
                      value={jenisEntitasFilter}
                      label="Filter Jenis Entitas"
                      onChange={(event) => {
                        setJenisEntitasFilter(event.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </TH>

                <TH>
                  <button
                    type="button"
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-blue-600"
                    aria-label="Urutkan berdasarkan tanggal dibuat"
                  >
                    <span>Tanggal Dibuat</span>
                    {sortConfig.key === "createdAt" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={15} />
                      ) : (
                        <ArrowDown size={15} />
                      )
                    ) : (
                      <ArrowUpDown size={15} className="text-slate-400" />
                    )}
                  </button>
                </TH>

                <TH>
                  <button
                    type="button"
                    onClick={() => handleSort("updatedAt")}
                    className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-blue-600"
                    aria-label="Urutkan berdasarkan tanggal terakhir diperbarui"
                  >
                    <span>Terakhir Diperbarui</span>
                    {sortConfig.key === "updatedAt" ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={15} />
                      ) : (
                        <ArrowDown size={15} />
                      )
                    ) : (
                      <ArrowUpDown size={15} className="text-slate-400" />
                    )}
                  </button>
                </TH>

                <TH className="w-24 text-center">Aksi</TH>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visibleDrafts.map((document, index) => (
                <tr
                  key={document.nomorAju}
                  className="transition-colors hover:bg-slate-50"
                >
                  <TD className="text-center tabular-nums text-slate-500">
                    {firstItemIndex + index + 1}
                  </TD>

                  <TD className="whitespace-nowrap font-medium text-slate-800">
                    {document.nomorAju}
                  </TD>

                  <TD>{document.kodeDokumen}</TD>

                  <TD>{document.jenisEntitas}</TD>

                  <TD className="whitespace-nowrap text-slate-600">
                    {formatDateIndonesian(document.createdAt)}
                  </TD>

                  <TD className="whitespace-nowrap text-slate-600">
                    {formatDateIndonesian(document.updatedAt)}
                  </TD>

                  <TD>
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/dokumen-pabean/${encodeURIComponent(
                          document.nomorAju,
                        )}`}
                        aria-label={`Buka dokumen ${document.nomorAju}`}
                        title="Buka dokumen"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                      >
                        <SquareArrowOutUpRight size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDraftToDelete(document.nomorAju)}
                        aria-label={`Hapus draft ${document.nomorAju}`}
                        title="Hapus draft"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash size={17} />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))}

              {sortedDrafts.length === 0 && (
                <tr>
                  <TD colSpan={7} className="py-10 text-center text-slate-400">
                    {drafts.length === 0
                      ? "Belum ada dokumen."
                      : "Tidak ada dokumen yang sesuai dengan filter."}
                  </TD>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="draft-page-size">Baris per halaman</label>

            <select
              id="draft-page-size"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3">
            <span className="tabular-nums" aria-live="polite">
              Halaman {currentPage} dari {totalPages}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION */}
      {draftToDelete && (
        <ModalUserConfirmation
          isDanger
          title="Hapus Draft"
          description={`Apakah Anda yakin ingin menghapus draft ${draftToDelete}?`}
          handleYes={() => {
            void handleDeleteDraft(draftToDelete);
          }}
          handleNo={() => setDraftToDelete(null)}
        />
      )}
    </>
  );
}

type THProps = {
  children?: React.ReactNode;
  className?: string;
};

type TDProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
};

type FilterInputProps = {
  value: string;
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function TH({ children, className = "" }: THProps) {
  return (
    <th
      className={`px-4 py-3 text-left align-top font-semibold text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}

function TD({ children, className = "", colSpan }: TDProps) {
  return (
    <td
      colSpan={colSpan}
      className={`px-4 py-3 align-middle text-slate-700 ${className}`}
    >
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
      className="w-full min-w-32 max-w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-normal text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

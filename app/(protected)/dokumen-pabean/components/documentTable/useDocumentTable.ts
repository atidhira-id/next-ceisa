"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Draft } from "@/app/types";

export type SortKey = "createdAt" | "updatedAt";
export type SortDirection = "asc" | "desc";

export function useDocumentTable() {
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

  // Mengambil data draft dari API
  const fetchDrafts = useCallback(async (signal?: AbortSignal) => {
    const response = await fetch("/api/documents/drafts", {
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data draft.");
    }

    const result: { drafts: Draft[] } = await response.json();

    return result.drafts;
  }, []);

  // Memuat ulang daftar draft
  const loadDrafts = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) {
          setIsLoading(true);
        }

        setError("");

        const nextDrafts = await fetchDrafts();

        setDrafts(nextDrafts);
      } catch (error) {
        console.error("Gagal mengambil daftar draft:", error);
        setError("Data dari database tidak dapat dimuat.");
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [fetchDrafts],
  );

  // Memuat data saat komponen pertama kali ditampilkan
  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialDrafts() {
      try {
        const nextDrafts = await fetchDrafts(controller.signal);

        if (!controller.signal.aborted) {
          setDrafts(nextDrafts);
          setError("");
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Gagal mengambil daftar draft:", error);
          setError("Data dari database tidak dapat dimuat.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialDrafts();

    return () => {
      controller.abort();
    };
  }, [fetchDrafts]);

  // Mengatur pengurutan data
  const handleSort = (key: SortKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

    setPage(1);
  };

  // Filter data draft
  const filteredDrafts = useMemo(() => {
    return drafts.filter(
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
  }, [drafts, nomorAjuFilter, kodeDokumenFilter, jenisEntitasFilter]);

  // Mengurutkan data draft
  const sortedDrafts = useMemo(() => {
    return [...filteredDrafts].sort((draftA, draftB) => {
      const leftValue = new Date(draftA[sortConfig.key]).getTime();
      const rightValue = new Date(draftB[sortConfig.key]).getTime();

      return sortConfig.direction === "asc"
        ? leftValue - rightValue
        : rightValue - leftValue;
    });
  }, [filteredDrafts, sortConfig]);

  // Mengatur pagination
  const totalPages = Math.max(1, Math.ceil(sortedDrafts.length / pageSize));

  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * pageSize;

  const visibleDrafts = sortedDrafts.slice(
    firstItemIndex,
    firstItemIndex + pageSize,
  );

  // Menghapus draft
  const handleDeleteDraft = async (nomorAju: string) => {
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

      setDraftToDelete(null);
      await loadDrafts(false);
    } catch (error) {
      console.error("Gagal menghapus draft:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghapus draft.",
      );
    }
  };

  return {
    drafts,
    isLoading,
    error,

    draftToDelete,
    setDraftToDelete,

    nomorAjuFilter,
    setNomorAjuFilter,
    kodeDokumenFilter,
    setKodeDokumenFilter,
    jenisEntitasFilter,
    setJenisEntitasFilter,

    page,
    setPage,
    pageSize,
    setPageSize,

    sortConfig,
    handleSort,

    sortedDrafts,
    visibleDrafts,
    totalPages,
    currentPage,
    firstItemIndex,

    handleDeleteDraft,
  };
}

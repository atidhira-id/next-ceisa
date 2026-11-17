"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDrafts,
  deleteDraft,
  DraftResponse,
} from "@/services/draft.service";

export type SortKey = "createdAt" | "updatedAt";
export type SortDirection = "asc" | "desc";

export function useDocumentTable() {
  const [drafts, setDrafts] = useState<DraftResponse[]>([]);
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

  const fetchDrafts = useCallback(async (): Promise<DraftResponse[]> => {
    const result = await getDrafts();

    return result.data.map((draft) => ({
      id: draft.id,
      ajuNumber: draft.ajuNumber,
      documentType: draft.documentType,
      entityType: draft.entityType,
      status: draft.status,
      createdAt: draft.createdAt,
      updatedAt: draft.updatedAt,
    }));
  }, []);

  const loadDrafts = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) setIsLoading(true);

        setError("");

        const nextDrafts = await fetchDrafts();
        setDrafts(nextDrafts);
      } catch (error) {
        console.error("Gagal mengambil daftar draft:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Data dari database tidak dapat dimuat.",
        );
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [fetchDrafts],
  );

  useEffect(() => {
    let active = true;

    async function loadInitialDrafts() {
      try {
        const nextDrafts = await fetchDrafts();

        if (active) {
          setDrafts(nextDrafts);
          setError("");
        }
      } catch (error) {
        if (active) {
          console.error("Gagal mengambil daftar draft:", error);

          setError(
            error instanceof Error
              ? error.message
              : "Data dari database tidak dapat dimuat.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialDrafts();

    return () => {
      active = false;
    };
  }, [fetchDrafts]);

  const handleSort = (key: SortKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

    setPage(1);
  };

  const filteredDrafts = useMemo(() => {
    return drafts.filter(
      (draft) =>
        draft.ajuNumber
          .toLowerCase()
          .includes(nomorAjuFilter.trim().toLowerCase()) &&
        draft.documentType
          .toLowerCase()
          .includes(kodeDokumenFilter.trim().toLowerCase()) &&
        draft.entityType
          .toLowerCase()
          .includes(jenisEntitasFilter.trim().toLowerCase()),
    );
  }, [drafts, nomorAjuFilter, kodeDokumenFilter, jenisEntitasFilter]);

  const sortedDrafts = useMemo(() => {
    return [...filteredDrafts].sort((draftA, draftB) => {
      const leftValue = new Date(draftA[sortConfig.key]).getTime();
      const rightValue = new Date(draftB[sortConfig.key]).getTime();

      return sortConfig.direction === "asc"
        ? leftValue - rightValue
        : rightValue - leftValue;
    });
  }, [filteredDrafts, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedDrafts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * pageSize;

  const visibleDrafts = sortedDrafts.slice(
    firstItemIndex,
    firstItemIndex + pageSize,
  );

  const handleDeleteDraft = async (id: string) => {
    try {
      await deleteDraft(id);

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

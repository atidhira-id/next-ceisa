"use client";

import { useCallback, useEffect, useState } from "react";
import { CompanyType, getCompanies } from "@/app/services/company.service";
import type { OptionType } from "@/app/types/option";

let companiesCache: CompanyType[] | null = null;

export function useCompanies() {
  const [companies, setCompanies] = useState<CompanyType[]>(
    () => companiesCache ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => companiesCache === null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await getCompanies(signal);

      if (!signal?.aborted) {
        companiesCache = response.data;
        setCompanies(response.data);
        setError(null);
      }
    } catch (error) {
      if (signal?.aborted) return;

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data Company.",
      );
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (companiesCache !== null) return;

    const controller = new AbortController();

    async function loadData() {
      await fetchData(controller.signal);
    }

    loadData();

    return () => controller.abort();
  }, [fetchData]);

  const companyOptions: OptionType[] = companies.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await fetchData();
  }, [fetchData]);

  return { companies, companyOptions, isLoading, error, refetch };
}

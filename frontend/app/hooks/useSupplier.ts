"use client";

import { useCallback, useEffect, useState } from "react";
import { getSuppliers, SupplierType } from "@/app/services/supplier.service";
import type { OptionType } from "@/app/types/option";

let supplierCache: SupplierType[] | null = null;

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<SupplierType[]>(
    () => supplierCache ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => supplierCache === null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await getSuppliers(signal);

      if (!signal?.aborted) {
        supplierCache = response.data;
        setSuppliers(response.data);
        setError(null);
      }
    } catch (error) {
      if (signal?.aborted) return;

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data Supplier.",
      );
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (supplierCache !== null) return;

    const controller = new AbortController();

    async function loadData() {
      await fetchData(controller.signal);
    }

    loadData();

    return () => controller.abort();
  }, [fetchData]);

  const supplierOptions: OptionType[] = suppliers.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await fetchData();
  }, [fetchData]);

  return { suppliers, supplierOptions, isLoading, error, refetch };
}

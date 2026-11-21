"use client";

import { useCallback, useEffect, useState } from "react";
import { getHsCodes } from "@/app/services/hsCode.service";
import type { HsCode, OptionType } from "@/app/types/option";

let hsCodesCache: HsCode[] | null = null;

export function useHsCodes() {
  const [data, setData] = useState<HsCode[]>(() => hsCodesCache ?? []);
  const [loading, setLoading] = useState(() => hsCodesCache === null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await getHsCodes(signal);

      if (!signal?.aborted) {
        hsCodesCache = response.data;
        setData(response.data);
        setError(null);
      }
    } catch (error) {
      if (signal?.aborted) return;

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data HS Code.",
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (hsCodesCache !== null) return;

    const controller = new AbortController();

    async function loadData() {
      await fetchData(controller.signal);
    }

    loadData();

    return () => controller.abort();
  }, [fetchData]);

  const hsCodeOptions: OptionType[] = data.map((item) => ({
    value: item.code,
    label: item.label,
  }));

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  return {
    hsCodes: data,
    hsCodeOptions,
    loading,
    error,
    refetch,
  };
}

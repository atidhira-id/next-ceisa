"use client";

import { useCallback, useEffect, useState } from "react";
import { getGoodsTypes } from "@/app/services/goodsType.service";
import type { GoodsType, OptionType } from "@/app/types/option";

let goodsTypesCache: GoodsType[] | null = null;

export function useGoodsTypes() {
  const [data, setData] = useState<GoodsType[]>(() => goodsTypesCache ?? []);
  const [loading, setLoading] = useState(() => goodsTypesCache === null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await getGoodsTypes(signal);

      if (!signal?.aborted) {
        goodsTypesCache = response.data;
        setData(response.data);
        setError(null);
      }
    } catch (error) {
      if (signal?.aborted) return;

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data tipe barang.",
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (goodsTypesCache !== null) return;

    const controller = new AbortController();

    async function loadData() {
      await fetchData(controller.signal);
    }

    loadData();

    return () => controller.abort();
  }, [fetchData]);

  const goodsTypeOptions: OptionType[] = data.map((item) => ({
    value: item.code,
    label: item.label,
  }));

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  return {
    goodsTypes: data,
    goodsTypeOptions,
    loading,
    error,
    refetch,
  };
}

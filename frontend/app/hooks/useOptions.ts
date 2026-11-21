"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import type {
  OptionType,
  MasterOptionType,
  ApiResponse,
} from "@/app/types/option";

const optionsCache = new Map<string, OptionType[]>();

export function useOptions(categoryCode: string) {
  const [options, setOptions] = useState<OptionType[]>(
    () => optionsCache.get(categoryCode) ?? [],
  );

  const [isLoading, setIsLoading] = useState(
    () => !optionsCache.has(categoryCode),
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (optionsCache.has(categoryCode)) return;

    const controller = new AbortController();

    async function fetchOptions() {
      try {
        const response = await api<ApiResponse<MasterOptionType[]>>(
          `/api/options/categories/${encodeURIComponent(categoryCode)}/items`,
          { signal: controller.signal },
        );

        const mappedOptions = response.data.map((item) => ({
          value: item.value,
          label: item.label,
        }));

        if (controller.signal.aborted) return;

        optionsCache.set(categoryCode, mappedOptions);
        setOptions(mappedOptions);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Gagal mengambil data options.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchOptions();

    return () => controller.abort();
  }, [categoryCode]);

  return { options, isLoading, error };
}

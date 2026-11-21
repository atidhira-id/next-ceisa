import { api } from "@/app/lib/api";
import type { ApiResponse, HsCode } from "@/app/types/option";

export async function getHsCodes(signal?: AbortSignal) {
  return api<ApiResponse<HsCode[]>>("/api/hs-codes", {
    signal,
  });
}

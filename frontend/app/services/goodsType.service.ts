import { api } from "@/app/lib/api";
import type { ApiResponse, GoodsType } from "@/app/types/option";

export async function getGoodsTypes(signal?: AbortSignal) {
  return api<ApiResponse<GoodsType[]>>("/api/goods-types", {
    signal,
  });
}

import { api } from "@/app/lib/api";
import { ApiResponse } from "./draft.service";

export type SupplierType = {
  id: string;
  name: string;
  address: string;
  countryCode: string;
};

export async function getSuppliers(signal?: AbortSignal) {
  return api<ApiResponse<SupplierType[]>>("/api/supplier", {
    signal,
  });
}

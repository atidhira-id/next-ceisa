import { api } from "@/app/lib/api";
import { ApiResponse } from "./draft.service";

export type CompanyType = {
  id: string;
  identityTypeCode: string;
  identityNumber: string;
  name: string;
  address: string;
  apiTypeCode: string;
  apiNumber: string;
  statusCode: string;
  countryCode: string;
};

export async function getCompanies(signal?: AbortSignal) {
  return api<ApiResponse<CompanyType[]>>("/api/companies", { signal });
}

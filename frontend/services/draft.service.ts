import { api } from "@/lib/api";
import type { DraftType } from "@/app/types";

export type DraftResponse = {
  id: string;
  ajuNumber: string;
  documentType: string;
  entityType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Draft = {
  id: string;
  ajuNumber: string;
  documentType: string;
  entityType: string;
  status: "DRAFT" | "READY";

  header: DraftType["header"] | null;
  entities: DraftType["entities"] | null;
  documents: DraftType["documents"] | null;
  packages: DraftType["packages"] | null;
  containers: DraftType["containers"] | null;
  transport: DraftType["transport"] | null;
  transactions: DraftType["transactions"] | null;
  goods: DraftType["goods"] | null;
  declarations: DraftType["declarations"] | null;

  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  message: string;
  data: T;
};

export async function getDrafts() {
  return api<ApiResponse<DraftResponse[]>>("/api/document-drafts", {
    cache: "no-store",
  });
}

export async function getDraft(id: string) {
  return api<ApiResponse<DraftType>>(
    `/api/document-drafts/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    },
  );
}

export async function createDraft(documentType: string, entityType: string) {
  return api<ApiResponse<DraftType>>("/api/document-drafts", {
    method: "POST",
    body: JSON.stringify({
      documentType,
      entityType,
    }),
  });
}

export async function deleteDraft(id: string) {
  return api<ApiResponse<null>>(`/api/document-drafts/${id}`, {
    method: "DELETE",
  });
}

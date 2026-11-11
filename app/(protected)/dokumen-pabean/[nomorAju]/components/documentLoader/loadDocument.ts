import type { FormInputs } from "@/app/types";

type DraftResponse = {
  draft: {
    nomorAju: string;
    data: FormInputs;
  };
};

export async function loadDocumentDraft(nomorAju: string): Promise<FormInputs> {
  const response = await fetch(
    `/api/documents/drafts/${encodeURIComponent(nomorAju)}`,
    { cache: "no-store" },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ??
        (response.status === 404
          ? "Draft tidak ditemukan atau belum disimpan."
          : "Gagal memuat draft."),
    );
  }

  const payload = result as DraftResponse;

  if (!payload.draft?.data) {
    throw new Error("Data draft tidak ditemukan.");
  }

  return payload.draft.data;
}

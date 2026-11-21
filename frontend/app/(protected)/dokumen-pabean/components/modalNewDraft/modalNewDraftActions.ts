import type { DraftType } from "@/app/types/draft";
import { createDraft } from "@/app/services/draft.service";

export async function createNewDraft(
  entityCode: string,
  documentCode: string,
): Promise<DraftType & { id: string }> {
  const result = await createDraft(documentCode, entityCode);

  const draft = result.data;

  if (!draft?.id || !draft.ajuNumber) {
    throw new Error("Data draft yang diterima tidak valid.");
  }

  return draft;
}

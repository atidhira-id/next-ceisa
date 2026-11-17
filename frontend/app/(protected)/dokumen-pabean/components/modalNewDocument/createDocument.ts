import type { DraftType } from "@/app/types";
import { createDraft } from "@/services/draft.service";

export async function createDocument(
  entitas: string,
  kodeDokumen: string,
): Promise<DraftType & { id: string }> {
  const result = await createDraft(kodeDokumen, entitas);

  const draft = result.data;
  console.log(draft);

  if (!draft?.id || !draft.ajuNumber) {
    throw new Error("Data draft yang diterima tidak valid.");
  }

  return draft;
}

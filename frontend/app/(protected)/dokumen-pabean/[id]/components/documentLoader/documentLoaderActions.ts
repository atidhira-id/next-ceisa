import type { DraftType } from "@/app/types/draft";
import { getDraft } from "@/app/services/draft.service";

export async function loadDocumentDraft(id: string): Promise<DraftType> {
  const result = await getDraft(id);
  const draft = result.data;

  if (!draft) {
    throw new Error("Data draft tidak ditemukan.");
  }

  return {
    id: draft.id,
    ajuNumber: draft.ajuNumber,
    documentType: draft.documentType,
    entityType: draft.entityType,

    header: draft.header ?? {},
    entities: draft.entities ?? {
      importer: {},
      owner: { affiliation: "" },
      npwp: {},
      sender: {},
      seller: {},
    },
    documents: draft.documents ?? [],
    packages: draft.packages ?? [],
    containers: draft.containers ?? [],
    transport: draft.transport ?? {},
    transactions: draft.transactions ?? {},
    goods: draft.goods ?? [],
    declarations: draft.declarations ?? {},
  };
}

import { DraftSection } from "@/app/providers/draftProvider";
import { api } from "@/lib/api";

export async function saveDocumentDraft(
  id: string,
  section: DraftSection,
  data: unknown,
): Promise<void> {
  await api(`/api/document-drafts/${id}/${section}`, {
    method: "PATCH",
    body: JSON.stringify({ data }),
  });
}

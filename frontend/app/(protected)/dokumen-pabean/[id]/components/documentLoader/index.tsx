"use client";

import { useEffect, useState } from "react";
import { useDraft } from "@/app/providers/draftProvider";
import { DocumentForm } from "../documentForm";
import { loadDocumentDraft } from "./loadDocument";

export function DocumentLoader({ id }: { id: string }) {
  const { setDraftData } = useDraft();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDraft() {
      setIsLoading(true);
      setError("");

      try {
        const data = await loadDocumentDraft(id);

        if (!cancelled) {
          setDraftData(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat memuat draft.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDraft();

    return () => {
      cancelled = true;
    };
  }, [id, setDraftData]);

  if (isLoading) {
    return <p className="p-6">Memuat data dokumen...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return <DocumentForm id={id} />;
}

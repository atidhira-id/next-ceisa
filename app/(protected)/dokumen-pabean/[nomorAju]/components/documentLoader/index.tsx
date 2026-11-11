"use client";
import { useEffect, useState } from "react";
import { useDocument } from "@/app/providers/document-provider";
import { DocumentForm } from "../documentForm";
import { loadDocumentDraft } from "./loadDocument";

export function DocumentLoader({ nomorAju }: { nomorAju: string }) {
  const { documentData, setDocumentData } = useDocument();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDraft() {
      setIsLoading(true);
      setError("");

      try {
        const data = await loadDocumentDraft(nomorAju);
        if (!cancelled) {
          setDocumentData(data);
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
  }, [nomorAju, setDocumentData]);

  if (isLoading) {
    return <p className="p-6">Memuat data dokumen...</p>;
  }

  if (error && documentData?.nomorAju !== nomorAju) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      {error && <p className="mb-4 text-sm text-amber-700">{error}</p>}
      <DocumentForm nomorAju={nomorAju} />
    </>
  );
}

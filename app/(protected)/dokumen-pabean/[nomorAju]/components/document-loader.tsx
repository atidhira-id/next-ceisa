"use client";

import { useEffect, useState } from "react";

import { useDocument } from "@/app/providers/document-provider";

import { DocumentForm } from "./document-form";
import { FormInputs } from "@/app/providers/types";

type Props = {
  nomorAju: string;
};

type DraftResponse = {
  draft: {
    nomorAju: string;
    data: FormInputs;
  };
};

export function DocumentLoader({ nomorAju }: Props) {
  const { documentData, setDocumentData } = useDocument();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDraft() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/documents/drafts/${encodeURIComponent(nomorAju)}`,
          { cache: "no-store" },
        );

        // Jika draft belum tersimpan, data baru yang sudah ada
        // di provider tetap boleh digunakan.
        if (response.status === 404) {
          if (!cancelled && documentData?.nomorAju !== nomorAju) {
            setError("Draft tidak ditemukan atau belum disimpan.");
          }
          return;
        }

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message ?? "Gagal memuat draft.");
        }

        const payload = result as DraftResponse;

        if (!cancelled) {
          setDocumentData(payload.draft.data);
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
    // documentData sengaja tidak menjadi dependency agar perubahan
    // input formulir tidak memicu pengambilan ulang draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

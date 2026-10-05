"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type DocumentData = {
  nomorAju: string;
  entitas: string;
  kodeDokumen: string;
  pelabuhanTujuan?: string;
  kantorPabean?: string;
  jenisPIB?: string;
  jenisImport?: string;
  caraPembayaran?: string;
  entity: Record<string, unknown>;
  document: Record<string, unknown>;
  transport: Record<string, unknown>;
  package: Record<string, unknown>;
  transaction: Record<string, unknown>;
  goods: Record<string, unknown>;
  levy: Record<string, unknown>;
  statement: Record<string, unknown>;
};

type DocumentContextType = {
  documentData: DocumentData | null;
  setDocumentData: React.Dispatch<React.SetStateAction<DocumentData | null>>;
  updateDocumentData: (data: Partial<DocumentData>) => void;
  resetDocumentData: () => void;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);

  function updateDocumentData(data: Partial<DocumentData>) {
    setDocumentData((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        ...data,
      };
    });
  }

  function resetDocumentData() {
    setDocumentData(null);
  }

  const value = useMemo(
    () => ({
      documentData,
      setDocumentData,
      updateDocumentData,
      resetDocumentData,
    }),
    [documentData],
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error("useDocument harus digunakan di dalam DocumentProvider");
  }

  return context;
}

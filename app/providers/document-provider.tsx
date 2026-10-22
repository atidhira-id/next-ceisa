"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { type FormInputs as DocumentData } from "./types";

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

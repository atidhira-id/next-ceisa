"use client";
import { createContext, useContext, useMemo, useState } from "react";
import {
  HeaderData,
  EntityData,
  DocumentItemData,
  PengangkutData,
  KemasanItemData,
  KontainerItemData,
} from "./types";

export type DocumentData = {
  jenisEntitas: string;
  nomorAju: string;
  kodeDokumen: string;
  header: HeaderData;
  entitas1: EntityData;
  entitas7: EntityData;
  entitas9: EntityData;
  entitas10: EntityData;
  entitas11: EntityData;
  dokumen: DocumentItemData[];
  pengangkut: PengangkutData;
  kemasan: KemasanItemData[];
  kontainer: KontainerItemData[];
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

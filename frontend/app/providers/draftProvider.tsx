"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { type DraftType } from "../types";

export type DraftSection =
  | "header"
  | "entities"
  | "documents"
  | "transport"
  | "packages"
  | "containers"
  | "transactions"
  | "goods"
  | "declarations";

type DraftContextType = {
  draft: DraftType | null;
  setDraftData: React.Dispatch<React.SetStateAction<DraftType | null>>;
  updateDraftData: (data: Partial<DraftType>) => void;
  resetDraftData: () => void;
  dirtySections: Set<DraftSection>;
  markSectionDirty: (section: DraftSection) => void;
  markSectionSaved: (section: DraftSection) => void;
};

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftData] = useState<DraftType | null>(null);

  const [dirtySections, setDirtySections] = useState<Set<DraftSection>>(
    new Set(),
  );

  function updateDraftData(data: Partial<DraftType>) {
    setDraftData((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        ...data,
      };
    });
  }

  function resetDraftData() {
    setDraftData(null);
  }

  function markSectionDirty(section: DraftSection) {
    setDirtySections((current) => {
      const next = new Set(current);
      next.add(section);
      return next;
    });
  }

  function markSectionSaved(section: DraftSection) {
    setDirtySections((current) => {
      const next = new Set(current);
      next.delete(section);
      return next;
    });
  }

  const value = useMemo(
    () => ({
      draft,
      setDraftData,
      updateDraftData,
      resetDraftData,

      dirtySections,
      markSectionDirty,
      markSectionSaved,
    }),
    [draft, dirtySections],
  );

  return (
    <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
  );
}

export function useDraft() {
  const context = useContext(DraftContext);

  if (!context) {
    throw new Error("useDocument harus digunakan di dalam DocumentProvider");
  }

  return context;
}

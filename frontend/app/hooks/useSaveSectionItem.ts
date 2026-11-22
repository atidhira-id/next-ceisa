import { useState } from "react";
import { ApiError } from "../lib/api";
import {
  DraftItemSection,
  saveSectionItem,
} from "@/app/services/draft.service";

export type ValidationError = {
  code: string;
  path: (string | number)[];
  message: string;
};

type SaveDraftItemOptions<T extends { series: number }> = {
  draftId: string;
  section: DraftItemSection;
  items: T[];
  onUpdate: (items: T[]) => void;
  onClose: () => void;
};

export function useSaveDraftItem<T extends { series: number }>({
  draftId,
  section,
  items,
  onUpdate,
  onClose,
}: SaveDraftItemOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );

  async function handleSave(item: T) {
    try {
      setIsSaving(true);
      setValidationErrors([]);

      console.log(draftId, section, item);
      await saveSectionItem(draftId, section, item);

      const existingIndex = items.findIndex(
        (current) => current.series === item.series,
      );

      const updatedItems = [...items];

      if (existingIndex >= 0) {
        updatedItems[existingIndex] = item;
      } else {
        updatedItems.push(item);
      }

      onUpdate(updatedItems);
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        const errors = Array.isArray(error.errors) ? error.errors : [];

        setValidationErrors(
          errors.length > 0
            ? errors
            : [
                {
                  code: "error",
                  path: [],
                  message: error.message,
                },
              ],
        );
      } else {
        setValidationErrors([
          {
            code: "error",
            path: [],
            message: "Gagal menyimpan data.",
          },
        ]);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return {
    handleSave,
    isSaving,
    validationErrors,
    setValidationErrors,
  };
}

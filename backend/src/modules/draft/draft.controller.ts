import type { Request, Response, NextFunction } from "express";
import {
  getDrafts,
  getDraftById,
  createDraft,
  saveDraftSection,
  deleteDraft,
  finalizeDraft,
  saveItem,
} from "./draft.service";
import { AppError } from "../../utils/appError";

export async function getDraftsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user.id;

    const drafts = await getDrafts(userId);

    return res.json({ data: drafts });
  } catch (error) {
    next(error);
  }
}

export async function getDraftByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
      throw new AppError("ID draft tidak valid.", 400);
    }

    const userId = res.locals.user.id;

    const draft = await getDraftById(id, userId);

    if (!draft) {
      throw new AppError("Draft tidak ditemukan.", 404);
    }

    return res.json({ data: draft });
  } catch (error) {
    next(error);
  }
}

export async function createDraftHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user.id;
    const { documentType, entityType } = req.body;
    const draft = await createDraft(userId, documentType, entityType);

    return res.status(201).json({
      message: "Draft berhasil dibuat.",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveDraftSectionHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    const section = req.params.section;

    if (typeof id !== "string" || typeof section !== "string") {
      return res.status(400).json({
        message: "Parameter tidak valid.",
      });
    }

    const userId = res.locals.user.id;

    const draft = await saveDraftSection(id, userId, section, req.body?.data);

    return res.json({
      message: "Section draft berhasil disimpan.",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveItemHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    const section = req.params.section;

    if (typeof id !== "string" || typeof section !== "string") {
      throw new AppError("Parameter tidak valid.", 400);
    }

    const userId = res.locals.user.id;

    const draft = await saveItem(id, userId, section, req.body?.data);

    return res.json({
      message: "Item draft berhasil disimpan.",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDraftHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
      throw new AppError("ID draft tidak valid.", 400);
    }

    const userId = res.locals.user.id;
    await deleteDraft(id, userId);

    return res.json({
      message: "Draft berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
}

export async function finalizeDraftHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID draft tidak valid.",
      });
    }

    const userId = res.locals.user.id;

    const result = await finalizeDraft(id, userId);

    if (!result.success) {
      if (result.notFound) {
        return res.status(404).json({
          message: "Draft tidak ditemukan atau sudah bukan berstatus DRAFT.",
        });
      }

      return res.status(400).json({
        message: "Draft belum dapat difinalisasi.",
        errors: result.errors,
      });
    }

    return res.json({
      message: "Draft berhasil difinalisasi.",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
}

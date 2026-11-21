import type { Request, Response, NextFunction } from "express";
import {
  getDrafts,
  getDraftById,
  createDraft,
  updateDraftSection,
  deleteDraft,
  validateItem,
  finalizeDraft,
} from "./draft.service";

import {
  createDraftSchema,
  updateDraftSectionSchema,
  draftSectionSchema,
} from "./schemas/draft.schema";
import { headerSchema } from "./schemas/header.schema";
import { entitiesSchema } from "./schemas/entities.schema";
import { documentsSchema } from "./schemas/documents.schema";
import { packagesSchema } from "./schemas/packages.schema";
import { containersSchema } from "./schemas/containers.schema";
import { transportSchema } from "./schemas/transport.schema";
import { transactionsSchema } from "./schemas/transaction.schema";
import { goodsSchema } from "./schemas/goods.schema";
import { declarationsSchema } from "./schemas/declarations.schema";

export async function listDrafts(
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

export async function showDraft(
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

    const draft = await getDraftById(id, userId);

    if (!draft) {
      return res.status(404).json({
        message: "Draft tidak ditemukan.",
      });
    }

    return res.json({ data: draft });
  } catch (error) {
    next(error);
  }
}

export async function createNewDraft(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = createDraftSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data draft tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const userId = res.locals.user.id;

    const draft = await createDraft(
      userId,
      validation.data.documentType,
      validation.data.entityType,
    );

    return res.status(201).json({
      message: "Draft berhasil dibuat.",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveDraftSection(
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

    const sectionValidation = draftSectionSchema.safeParse(section);

    if (!sectionValidation.success) {
      return res.status(400).json({
        message: "Section draft tidak ditemukan.",
      });
    }

    const bodyValidation = updateDraftSectionSchema.safeParse(req.body);

    if (!bodyValidation.success) {
      return res.status(400).json({
        message: "Data section tidak valid.",
        errors: bodyValidation.error.flatten(),
      });
    }

    const schemas = {
      header: {
        schema: headerSchema,
        message: "Data Header tidak valid.",
      },
      entities: {
        schema: entitiesSchema,
        message: "Data Entitas tidak valid.",
      },
      documents: {
        schema: documentsSchema,
        message: "Data Dokumen tidak valid.",
      },
      packages: {
        schema: packagesSchema,
        message: "Data Kemasan tidak valid.",
      },
      containers: {
        schema: containersSchema,
        message: "Data Kontainer tidak valid.",
      },
      transport: {
        schema: transportSchema,
        message: "Data Pengangkut tidak valid.",
      },
      transactions: {
        schema: transactionsSchema,
        message: "Data Transactions tidak valid.",
      },
      goods: {
        schema: goodsSchema,
        message: "Data Barang tidak valid.",
      },
      declarations: {
        schema: declarationsSchema,
        message: "Data Pernyataan tidak valid.",
      },
    };

    const selectedSection = sectionValidation.data;
    const sectionConfig = schemas[selectedSection];

    const validation = sectionConfig.schema.safeParse(bodyValidation.data.data);

    if (!validation.success) {
      console.log("Zod validation errors:", validation.error.issues);

      return res.status(400).json({
        message: sectionConfig.message,
        errors: validation.error.issues,
      });
    }

    const userId = res.locals.user.id;

    const draft = await updateDraftSection(
      id,
      userId,
      selectedSection,
      validation.data,
    );

    if (!draft) {
      return res.status(404).json({
        message: "Draft tidak ditemukan.",
      });
    }

    return res.json({
      message: "Section draft berhasil disimpan.",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeDraft(
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

    const deleted = await deleteDraft(id, userId);

    if (!deleted) {
      return res.status(404).json({
        message: "Draft tidak ditemukan.",
      });
    }

    return res.json({
      message: "Draft berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
}

export async function validateItemHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const itemType = Array.isArray(req.params.itemType)
      ? req.params.itemType[0]
      : req.params.itemType;

    const result = await validateItem(itemType, req.body);

    if (!result.valid) {
      return res
        .status(result.message?.includes("tidak dikenal") ? 404 : 400)
        .json(result);
    }

    return res.json(result);
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

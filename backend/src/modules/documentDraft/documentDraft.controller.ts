import type { Request, Response, NextFunction } from "express";
import {
  getDocumentDrafts,
  getDocumentDraftById,
  createDocumentDraft,
  updateDocumentDraftSection,
  deleteDocumentDraft,
  finalizeDocumentDraft,
} from "./documentDraft.service";

import {
  createDocumentDraftSchema,
  updateDocumentDraftSectionSchema,
  documentDraftSectionSchema,
} from "./schemas/documentDraft.schema";
import { headerSchema } from "./schemas/header.schema";
import { entitiesSchema } from "./schemas/entities.schema";
import { documentsSchema } from "./schemas/documents.schema";
import { packageItemSchema } from "./schemas/packages.schema";
import { containerItemSchema } from "./schemas/containers.schema";
import { transportSchema } from "./schemas/transport.schema";
import { transactionsSchema } from "./schemas/transaction.schema";
import { goodsSchema } from "./schemas/goods.schema";
import { declarationsSchema } from "./schemas/declarations.schema";

export async function listDocumentDrafts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = res.locals.user.id;

    const drafts = await getDocumentDrafts(userId);

    return res.json({ data: drafts });
  } catch (error) {
    next(error);
  }
}

export async function showDocumentDraft(
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

    const draft = await getDocumentDraftById(id, userId);

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

export async function createNewDocumentDraft(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = createDocumentDraftSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Data draft tidak valid.",
        errors: validation.error.flatten(),
      });
    }

    const userId = res.locals.user.id;

    const draft = await createDocumentDraft(
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

export async function saveDocumentDraftSection(
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

    const sectionValidation = documentDraftSectionSchema.safeParse(section);

    if (!sectionValidation.success) {
      return res.status(400).json({
        message: "Section draft tidak ditemukan.",
      });
    }

    const bodyValidation = updateDocumentDraftSectionSchema.safeParse(req.body);

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
        schema: packageItemSchema,
        message: "Data Kemasan tidak valid.",
      },
      containers: {
        schema: containerItemSchema,
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

    const draft = await updateDocumentDraftSection(
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

export async function removeDocumentDraft(
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

    const deleted = await deleteDocumentDraft(id, userId);

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

export async function finalizeDocumentDraftHandler(
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

    const result = await finalizeDocumentDraft(id, userId);

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

import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { generateAjuNumber } from "./ajuNumber.service";
import { draftItemSectionSchema, itemSchemas } from "./schemas/item.schema";
import { finalizeSchema } from "./schemas/finalize.schema";
import { validateFinalizeCrossSections } from "./schemas/finalizeCross.schema";
import { Draft } from "../../types/draft";
import {
  createDraftSchema,
  draftSectionSchema,
  updateDraftSectionSchema,
} from "./schemas/draft.schema";
import { AppError } from "../../utils/appError";
import { headerSchema } from "./schemas/sectionHeader.schema";
import { entitiesSchema } from "./schemas/sectionEntities.schema";
import { documentsSchema } from "./schemas/sectionDocuments.schema";
import { packagesSchema } from "./schemas/sectionPackages.schema";
import { containersSchema } from "./schemas/sectionContainers.schema";
import { transportSchema } from "./schemas/sectionTransport.schema";
import { transactionSchema } from "./schemas/sectionTransaction.schema";
import { goodsSchema } from "./schemas/sectionGoods.schema";
import { declarationsSchema } from "./schemas/sectionDeclarations.schema";

const sectionSchemas = {
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
    schema: transactionSchema,
    message: "Data Transaksi tidak valid.",
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

const initialData: Partial<Draft> = {
  header: {},

  entities: {
    importer: {},
    owner: { affiliation: "" },
    npwp: {},
    sender: {},
    seller: {},
  },

  documents: [],
  packages: [],
  containers: [],
  transport: {},
  transactions: {},
  goods: [],

  declarations: {
    place: "JAKARTA",
    date: new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
    }).format(new Date()),
    name: "",
    position: "",
  },
};

export async function getDrafts(userId: string) {
  return prisma.draft.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getDraftById(id: string, userId: string) {
  return prisma.draft.findFirst({
    where: {
      id,
      createdById: userId,
    },
  });
}

export async function createDraft(
  userId: string,
  documentType: string,
  entityType: string,
) {
  const validation = createDraftSchema.safeParse({ documentType, entityType });

  if (!validation.success) {
    throw new AppError("Data draft tidak valid.", 400, {
      errors: validation.error.flatten(),
    });
  }
  const ajuNumber = await generateAjuNumber();

  return prisma.draft.create({
    data: {
      ajuNumber,
      documentType: validation.data.documentType,
      entityType: validation.data.entityType,
      createdById: userId,
      ...initialData,
    },
  });
}

export async function saveDraftSection(
  id: string,
  userId: string,
  section: string,
  data: Prisma.InputJsonValue,
) {
  // Check if section exist
  const sectionValidation = draftSectionSchema.safeParse(section);
  if (!sectionValidation.success) {
    throw new AppError("Section draft tidak ditemukan.", 400);
  }

  // Validate request body
  const bodyValidation = updateDraftSectionSchema.safeParse({ data });
  if (!bodyValidation.success) {
    throw new AppError("Data section tidak valid.", 400, {
      errors: bodyValidation.error.flatten(),
    });
  }

  // Validate section data
  const selectedSection = sectionValidation.data;
  const sectionConfig = sectionSchemas[selectedSection];
  const validation = sectionConfig.schema.safeParse(bodyValidation.data.data);
  if (!validation.success) {
    throw new AppError(sectionConfig.message, 400, {
      errors: validation.error.issues,
    });
  }

  // Check if draft exist
  const draft = await prisma.draft.findFirst({
    where: {
      id,
      createdById: userId,
    },
    select: {
      id: true,
    },
  });
  if (!draft) {
    throw new AppError("Draft tidak ditemukan.", 404);
  }

  // Update section data in draft
  return prisma.draft.update({
    where: {
      id,
    },
    data: {
      [selectedSection]: validation.data,
    },
  });
}

export async function saveItem(
  id: string,
  userId: string,
  section: string,
  data: unknown,
) {
  // Check if section valid
  const sectionValidation = draftItemSectionSchema.safeParse(section);
  if (!sectionValidation.success) {
    throw new AppError("Section item tidak valid.", 400);
  }

  // Validate request body
  const bodyValidation = updateDraftSectionSchema.safeParse({ data });
  if (!bodyValidation.success) {
    throw new AppError("Data item tidak valid.", 400, {
      errors: bodyValidation.error.flatten(),
    });
  }

  // Validate item based on section
  const selectedSection = sectionValidation.data;
  const validation = itemSchemas[selectedSection].safeParse(
    bodyValidation.data.data,
  );
  if (!validation.success) {
    throw new AppError("Data item tidak valid.", 400, {
      errors: validation.error.issues,
    });
  }

  // Check if draft exist
  const draft = await prisma.draft.findFirst({
    where: {
      id,
      createdById: userId,
    },
  });
  if (!draft) {
    throw new AppError("Draft tidak ditemukan.", 404);
  }

  // Get current items in selected section
  const currentItems = draft[selectedSection];
  if (currentItems !== null && !Array.isArray(currentItems)) {
    throw new AppError("Format data item pada draft tidak valid.", 500);
  }

  const itemData = validation.data;
  const items: Prisma.JsonValue[] = Array.isArray(currentItems)
    ? [...currentItems]
    : [];

  // Check item position based on series
  const existingIndex = items.findIndex(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      !Array.isArray(item) &&
      "series" in item &&
      item.series === itemData.series,
  );

  // Update item if exist, add new item if not
  if (existingIndex >= 0) {
    items[existingIndex] = itemData as Prisma.JsonObject;
  } else {
    items.push(itemData as Prisma.JsonObject);
  }

  // Update item list in draft
  return prisma.draft.update({
    where: {
      id,
    },
    data: {
      [selectedSection]: items as Prisma.InputJsonArray,
    },
  });
}

export async function deleteDraft(id: string, userId: string) {
  const draft = await prisma.draft.findFirst({
    where: {
      id,
      createdById: userId,
    },
    select: {
      id: true,
    },
  });

  if (!draft) {
    throw new AppError("Draft tidak ditemukan.", 404);
  }

  await prisma.draft.delete({
    where: {
      id,
    },
  });

  return true;
}

export async function finalizeDraft(id: string, userId: string) {
  const draft = await prisma.draft.findFirst({
    where: {
      id,
      createdById: userId,
      status: "DRAFT",
    },
  });

  if (!draft) {
    return {
      success: false as const,
      notFound: true,
    };
  }

  const validation = finalizeSchema.safeParse({
    header: draft.header,
    entities: draft.entities,
    documents: draft.documents,
    packages: draft.packages,
    containers: draft.containers,
    transport: draft.transport,
    transactions: draft.transactions,
    goods: draft.goods,
    declarations: draft.declarations,
  });

  if (!validation.success) {
    return {
      success: false as const,
      errors: validation.error.flatten(),
    };
  }

  const crossValidation = validateFinalizeCrossSections({
    documents: validation.data.documents,
    goods: validation.data.goods,
  });

  if (!crossValidation.success) {
    return {
      success: false as const,
      errors: crossValidation.errors,
    };
  }

  const updatedDraft = await prisma.draft.updateMany({
    where: {
      id,
      createdById: userId,
      status: "DRAFT",
    },
    data: {
      status: "READY",
    },
  });

  if (updatedDraft.count === 0) {
    return {
      success: false as const,
      notFound: true,
    };
  }

  return {
    success: true as const,
    data: await prisma.draft.findUnique({
      where: { id },
    }),
  };
}

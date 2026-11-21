import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { generateAjuNumber } from "./ajuNumber.service";
import { itemSchemas, ItemType } from "./schemas/itemValidation.schema";
import { finalizeSchema } from "./schemas/finalize.schema";
import { validateFinalizeCrossSections } from "./schemas/finalize-cross.schema";
import { Draft } from "../../types/draft";

const sections = [
  "header",
  "entities",
  "documents",
  "packages",
  "containers",
  "transport",
  "transactions",
  "goods",
  "declarations",
] as const;

type DraftSection = (typeof sections)[number];

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
  const ajuNumber = await generateAjuNumber();

  return prisma.draft.create({
    data: {
      ajuNumber,
      documentType,
      entityType,
      createdById: userId,

      ...initialData,
    },
  });
}

export async function updateDraftSection(
  id: string,
  userId: string,
  section: DraftSection,
  data: Prisma.InputJsonValue,
) {
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
    return null;
  }

  return prisma.draft.update({
    where: {
      id,
    },
    data: {
      [section]: data,
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
    return false;
  }

  await prisma.draft.delete({
    where: {
      id,
    },
  });

  return true;
}

export async function validateItem(itemType: string, data: unknown) {
  if (!(itemType in itemSchemas)) {
    return {
      valid: false,
      message: `Tipe item '${itemType}' tidak dikenal.`,
      errors: [],
    };
  }

  const schema = itemSchemas[itemType as ItemType];
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      valid: false,
      message: "Data tidak valid.",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  return {
    valid: true,
    data: result.data,
    errors: [],
  };
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
    containers:
      draft.packages &&
      typeof draft.packages === "object" &&
      !Array.isArray(draft.packages)
        ? (draft.packages as Record<string, unknown>).containers
        : undefined,
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

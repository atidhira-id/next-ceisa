import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { generateAjuNumber } from "./ajuNumber.service";
import { finalizeSchema } from "./schemas/finalize.schema";
import { validateFinalizeCrossSections } from "./schemas/finalize-cross.schema";
import { DocumentDraft } from "../../types/documentDraft";

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

type DocumentDraftSection = (typeof sections)[number];

const initialData: Partial<DocumentDraft> = {
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

export async function getDocumentDrafts(userId: string) {
  return prisma.documentDraft.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getDocumentDraftById(id: string, userId: string) {
  return prisma.documentDraft.findFirst({
    where: {
      id,
      createdById: userId,
    },
  });
}

export async function createDocumentDraft(
  userId: string,
  documentType: string,
  entityType: string,
) {
  const ajuNumber = await generateAjuNumber();

  return prisma.documentDraft.create({
    data: {
      ajuNumber,
      documentType,
      entityType,
      createdById: userId,

      ...initialData,
    },
  });
}

export async function updateDocumentDraftSection(
  id: string,
  userId: string,
  section: DocumentDraftSection,
  data: Prisma.InputJsonValue,
) {
  const draft = await prisma.documentDraft.findFirst({
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

  return prisma.documentDraft.update({
    where: {
      id,
    },
    data: {
      [section]: data,
    },
  });
}

export async function deleteDocumentDraft(id: string, userId: string) {
  const draft = await prisma.documentDraft.findFirst({
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

  await prisma.documentDraft.delete({
    where: {
      id,
    },
  });

  return true;
}

export async function finalizeDocumentDraft(id: string, userId: string) {
  const draft = await prisma.documentDraft.findFirst({
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

  const updatedDraft = await prisma.documentDraft.updateMany({
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
    data: await prisma.documentDraft.findUnique({
      where: { id },
    }),
  };
}

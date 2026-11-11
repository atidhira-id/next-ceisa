import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { getCurrentDateIndonesia } from "@/lib/date";
import { exportDocumentToExcel } from "@/lib/excel/export-document";
import { FormInputs } from "@/app/types";

const MAX_SEQUENCE = 999999;
const DOCUMENT_PREFIX = "000020PATRIA";
export async function generateNomorAju(): Promise<string> {
  // Ambil nomor urut dari PostgreSQL Sequence
  const rows = await prisma.$queryRaw<Array<{ urutan: bigint }>>`
    SELECT nextval('nomor_aju_sequence') AS urutan
  `;

  const urutan = rows[0]?.urutan;

  if (urutan === undefined) {
    throw new Error("Gagal mengambil nomor urut AJU.");
  }

  // Periksa batas nomor urut
  if (urutan > BigInt(MAX_SEQUENCE)) {
    throw new Error("NOMOR_AJU_LIMIT_REACHED");
  }

  // Bentuk nomor AJU
  const datePart = getCurrentDateIndonesia();
  const sequencePart = urutan.toString().padStart(6, "0");

  return `${DOCUMENT_PREFIX}${datePart}${sequencePart}`;
}

export async function exportDocument(documentData: FormInputs) {
  return await exportDocumentToExcel(documentData);
}

export async function getDocumentDrafts(userId: string) {
  return prisma.documentDraft.findMany({
    where: {
      createdById: userId,
      status: "DRAFT",
    },
    select: {
      id: true,
      nomorAju: true,
      kodeDokumen: true,
      jenisEntitas: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function saveDocumentDraft(
  userId: string,
  documentData: FormInputs,
) {
  return prisma.documentDraft.upsert({
    where: {
      nomorAju_createdById: {
        nomorAju: documentData.nomorAju,
        createdById: userId,
      },
    },
    create: {
      nomorAju: documentData.nomorAju,
      kodeDokumen: documentData.kodeDokumen,
      jenisEntitas: documentData.jenisEntitas,
      data: documentData as unknown as Prisma.InputJsonValue,
      createdById: userId,
    },
    update: {
      kodeDokumen: documentData.kodeDokumen,
      jenisEntitas: documentData.jenisEntitas,
      data: documentData as unknown as Prisma.InputJsonValue,
      status: "DRAFT",
    },
    select: {
      id: true,
      nomorAju: true,
      updatedAt: true,
    },
  });
}

export async function getDocumentDraft(nomorAju: string, userId: string) {
  return prisma.documentDraft.findFirst({
    where: {
      nomorAju,
      createdById: userId,
      status: "DRAFT",
    },
    select: {
      id: true,
      nomorAju: true,
      kodeDokumen: true,
      jenisEntitas: true,
      data: true,
      status: true,
      updatedAt: true,
    },
  });
}

export async function deleteDocumentDraft(nomorAju: string, userId: string) {
  const draft = await prisma.documentDraft.findFirst({
    where: {
      nomorAju,
      createdById: userId,
      status: "DRAFT",
    },
    select: {
      id: true,
    },
  });

  if (!draft) {
    return null;
  }

  await prisma.documentDraft.update({
    where: {
      id: draft.id,
    },
    data: {
      status: "DELETED",
    },
  });

  return draft;
}

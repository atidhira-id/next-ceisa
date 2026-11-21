import { prisma } from "../../config/prisma";

type HsCodeInput = {
  code: string;
  label: string;
  importDutyPercentage: string;
  vatPercentage: string;
  incomeTaxPercentage: string;
  borderRestriction?: string | null;
  postBorderRestriction?: string | null;
};

export async function getHsCodes() {
  return prisma.hsCode.findMany({
    orderBy: { code: "asc" },
  });
}

export async function getHsCodeByCode(code: string) {
  return prisma.hsCode.findUnique({
    where: { code },
  });
}

export async function upsertHsCode(data: HsCodeInput) {
  const {
    code,
    label,
    importDutyPercentage,
    vatPercentage,
    incomeTaxPercentage,
    borderRestriction,
    postBorderRestriction,
  } = data;

  return prisma.hsCode.upsert({
    where: { code },
    update: {
      label,
      importDutyPercentage,
      vatPercentage,
      incomeTaxPercentage,
      borderRestriction: borderRestriction ?? null,
      postBorderRestriction: postBorderRestriction ?? null,
    },
    create: {
      code,
      label,
      importDutyPercentage,
      vatPercentage,
      incomeTaxPercentage,
      borderRestriction: borderRestriction ?? null,
      postBorderRestriction: postBorderRestriction ?? null,
    },
  });
}

export async function deleteHsCode(code: string) {
  return prisma.hsCode.delete({
    where: { code },
  });
}

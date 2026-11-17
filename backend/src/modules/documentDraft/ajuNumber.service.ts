import { prisma } from "../../config/prisma";

export async function generateAjuNumber(): Promise<string> {
  const result = await prisma.$queryRaw<{ sequence: bigint }[]>`
    SELECT nextval('nomor_aju_sequence') AS sequence
  `;

  const sequence = result[0].sequence;

  if (sequence > 999999n) {
    throw new Error("Nomor urut AJU telah mencapai batas maksimum.");
  }

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateString = `${year}${month}${day}`;
  const sequenceString = sequence.toString().padStart(6, "0");

  return `000020PATRIA${dateString}${sequenceString}`;
}

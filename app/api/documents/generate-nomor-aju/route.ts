import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Silakan login terlebih dahulu." },
        { status: 401 },
      );
    }

    // Check user session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan." },
        { status: 401 },
      );
    }

    // Take sequence number from Neon PostgreSQL.
    const rows = await prisma.$queryRaw<Array<{ urutan: bigint }>>`
      SELECT nextval('nomor_aju_sequence') AS urutan
    `;

    const urutan = rows[0].urutan;

    if (urutan > 999999) {
      return NextResponse.json(
        { message: "Nomor urut AJU sudah mencapai batas maksimum." },
        { status: 409 },
      );
    }

    const prefix = "000020PATRIA";

    // Gunakan tanggal Indonesia (WIB).
    const datePart = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date())
      .replace(/-/g, "");

    const sequencePart = urutan.toString().padStart(6, "0");
    const nomorAju = `${prefix}${datePart}${sequencePart}`;

    return NextResponse.json({ nomorAju });
  } catch (error) {
    console.error("Gagal membuat nomor AJU:", error);

    return NextResponse.json(
      { message: "Gagal membuat nomor AJU." },
      { status: 500 },
    );
  }
}

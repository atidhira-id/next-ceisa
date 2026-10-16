import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ nomorAju: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { nomorAju } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Silakan login terlebih dahulu." },
        { status: 401 },
      );
    }

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

    const draft = await prisma.documentDraft.findFirst({
      where: {
        nomorAju,
        createdById: user.id,
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

    if (!draft) {
      return NextResponse.json(
        { message: "Draft tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ draft });
  } catch (error) {
    console.error("Gagal mengambil detail draft:", error);

    return NextResponse.json(
      { message: "Gagal mengambil detail draft." },
      { status: 500 },
    );
  }
}

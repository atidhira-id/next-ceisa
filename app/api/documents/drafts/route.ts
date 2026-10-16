import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@/generated/prisma/client";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { DocumentData } from "@/app/providers/document-provider";

export const runtime = "nodejs";

export async function GET() {
  try {
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

    const drafts = await prisma.documentDraft.findMany({
      where: {
        createdById: user.id,
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

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error("Gagal mengambil daftar draft:", error);

    return NextResponse.json(
      { message: "Gagal mengambil daftar draft." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Data draft tidak valid." },
        { status: 400 },
      );
    }

    const documentData = body as DocumentData;

    if (
      typeof documentData.nomorAju !== "string" ||
      !documentData.nomorAju.trim() ||
      typeof documentData.kodeDokumen !== "string" ||
      !documentData.kodeDokumen.trim() ||
      typeof documentData.jenisEntitas !== "string" ||
      !documentData.jenisEntitas.trim()
    ) {
      return NextResponse.json(
        {
          message: "Nomor Aju, Kode Dokumen, dan Jenis Entitas wajib tersedia.",
        },
        { status: 400 },
      );
    }

    const draft = await prisma.documentDraft.upsert({
      where: {
        nomorAju_createdById: {
          nomorAju: documentData.nomorAju,
          createdById: user.id,
        },
      },
      create: {
        nomorAju: documentData.nomorAju,
        kodeDokumen: documentData.kodeDokumen,
        jenisEntitas: documentData.jenisEntitas,
        data: documentData as unknown as Prisma.InputJsonValue,
        createdById: user.id,
      },
      update: {
        kodeDokumen: documentData.kodeDokumen,
        jenisEntitas: documentData.jenisEntitas,
        data: documentData as unknown as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        nomorAju: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Draft berhasil disimpan.",
      draft,
    });
  } catch (error) {
    console.error("Gagal menyimpan draft:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan saat menyimpan draft." },
      { status: 500 },
    );
  }
}

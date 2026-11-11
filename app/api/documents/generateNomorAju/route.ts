import { NextResponse } from "next/server";
import { generateNomorAju } from "@/services/document.service";
import { requireAuth } from "@/lib/auth/requireAuth";

export const runtime = "nodejs";

export async function POST() {
  try {
    const auth = await requireAuth();
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error.message },
        { status: auth.error.status },
      );
    }

    const nomorAju = await generateNomorAju();

    return NextResponse.json({ nomorAju });
  } catch (error) {
    if (error instanceof Error && error.message === "NOMOR_AJU_LIMIT_REACHED") {
      return NextResponse.json(
        { message: "Nomor urut AJU sudah mencapai batas maksimum." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Gagal membuat nomor AJU." },
      { status: 500 },
    );
  }
}

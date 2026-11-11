import { NextResponse } from "next/server";
import { FormInputs } from "@/app/types";
import {
  getDocumentDrafts,
  saveDocumentDraft,
} from "@/services/document.service";
import { saveDraftSchema } from "@/validators/document.schema";
import { requireAuth } from "@/lib/auth/requireAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error.message },
        { status: auth.error.status },
      );
    }

    const drafts = await getDocumentDrafts(auth.user.id);

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
    const auth = await requireAuth();
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error.message },
        { status: auth.error.status },
      );
    }

    const body: unknown = await request.json();
    const validation = saveDraftSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Data draft tidak valid.",
          errors: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const documentData = validation.data as FormInputs;
    const draft = await saveDocumentDraft(auth.user.id, documentData);

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

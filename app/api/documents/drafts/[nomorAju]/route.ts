import { NextResponse } from "next/server";
import {
  deleteDocumentDraft,
  getDocumentDraft,
} from "@/services/document.service";
import { requireAuth } from "@/lib/auth/requireAuth";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ nomorAju: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { nomorAju } = await params;

    const auth = await requireAuth();
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error.message },
        { status: auth.error.status },
      );
    }

    const draft = await getDocumentDraft(nomorAju, auth.user.id);

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

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { nomorAju } = await params;

    const auth = await requireAuth();

    if (auth.error) {
      return NextResponse.json(
        { message: auth.error.message },
        { status: auth.error.status },
      );
    }

    const draft = await deleteDocumentDraft(nomorAju, auth.user.id);

    if (!draft) {
      return NextResponse.json(
        { message: "Draft tidak ditemukan atau sudah dihapus." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Draft berhasil dihapus.",
    });
  } catch (error) {
    console.error("Gagal menghapus draft:", error);

    return NextResponse.json(
      { message: "Gagal menghapus draft." },
      { status: 500 },
    );
  }
}

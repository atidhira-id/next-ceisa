import { NextResponse } from "next/server";
import { exportDocument } from "@/services/document.service";
import { exportDocumentSchema } from "@/validators/document.schema";
import { FormInputs } from "@/app/types";
import { requireAuth } from "@/lib/auth/requireAuth";

export const runtime = "nodejs";

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

    const validation = exportDocumentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Data dokumen tidak valid.",
          errors: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const documentData = validation.data as FormInputs;
    const excelBuffer = await exportDocument(documentData);

    const date = new Date().toISOString().slice(0, 10);
    const filename = `dokumen-${documentData.nomorAju}-${date}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Gagal export dokumen ke Excel:", error);

    return NextResponse.json(
      { message: "Gagal membuat file Excel." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { exportDocumentToExcel } from "@/lib/excel/export-document";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // Parse the request body to get the document data
    const documentData = await request.json();
    if (!documentData || typeof documentData !== "object") {
      return NextResponse.json(
        {
          message: "Data dokumen tidak valid.",
        },
        {
          status: 400,
        },
      );
    }

    if (!documentData.nomorAju) {
      return NextResponse.json(
        {
          message: "Nomor Aju wajib tersedia.",
        },
        {
          status: 400,
        },
      );
    }

    if (!documentData.kodeDokumen) {
      return NextResponse.json(
        {
          message: "Kode Dokumen wajib tersedia.",
        },
        {
          status: 400,
        },
      );
    }

    // Export the document data to an Excel file
    const excelBuffer = await exportDocumentToExcel(documentData);

    const now = new Date();
    const filename = `dokumen-${String(documentData.nomorAju)}-${now.toISOString().split("T")[0]}.xlsx`;

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
      {
        message: "Gagal membuat file Excel.",
      },
      {
        status: 500,
      },
    );
  }
}

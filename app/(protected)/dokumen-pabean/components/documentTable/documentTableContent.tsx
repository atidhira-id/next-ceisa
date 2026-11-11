"use client";

import Link from "next/link";
import { SquareArrowOutUpRight, Trash } from "lucide-react";
import type { Draft } from "@/app/types";
import { formatDateIndonesian } from "@/lib/utils";

type DocumentTableContentProps = {
  drafts: Draft[];
  visibleDrafts: Draft[];
  firstItemIndex: number;
  onDelete: (nomorAju: string) => void;
};

type TDProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
};

function TD({ children, className = "", colSpan }: TDProps) {
  return (
    <td
      colSpan={colSpan}
      className={`px-4 py-3 align-middle text-slate-700 ${className}`}
    >
      {children}
    </td>
  );
}

export default function DocumentTableContent({
  drafts,
  visibleDrafts,
  firstItemIndex,
  onDelete,
}: DocumentTableContentProps) {
  return (
    <tbody className="divide-y divide-slate-100">
      {visibleDrafts.map((document, index) => (
        <tr
          key={document.nomorAju}
          className="transition-colors hover:bg-slate-50"
        >
          <TD className="text-center tabular-nums text-slate-500">
            {firstItemIndex + index + 1}
          </TD>

          <TD className="whitespace-nowrap font-medium text-slate-800">
            {document.nomorAju}
          </TD>

          <TD>{document.kodeDokumen}</TD>

          <TD>{document.jenisEntitas}</TD>

          <TD className="whitespace-nowrap text-slate-600">
            {formatDateIndonesian(document.createdAt)}
          </TD>

          <TD className="whitespace-nowrap text-slate-600">
            {formatDateIndonesian(document.updatedAt)}
          </TD>

          <TD>
            <div className="flex items-center justify-center gap-1">
              <Link
                href={`/dokumen-pabean/${encodeURIComponent(document.nomorAju)}`}
                aria-label={`Buka dokumen ${document.nomorAju}`}
                title="Buka dokumen"
                className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                <SquareArrowOutUpRight size={17} />
              </Link>

              <button
                type="button"
                onClick={() => onDelete(document.nomorAju)}
                aria-label={`Hapus draft ${document.nomorAju}`}
                title="Hapus draft"
                className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash size={17} />
              </button>
            </div>
          </TD>
        </tr>
      ))}

      {visibleDrafts.length === 0 && (
        <tr>
          <TD colSpan={7} className="py-10 text-center text-slate-400">
            {drafts.length === 0
              ? "Belum ada dokumen."
              : "Tidak ada dokumen yang sesuai dengan filter."}
          </TD>
        </tr>
      )}
    </tbody>
  );
}

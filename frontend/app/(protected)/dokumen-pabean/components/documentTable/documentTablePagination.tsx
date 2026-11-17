"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

type DocumentTablePaginationProps = {
  pageSize: number;
  onPageSizeChange: (value: number) => void;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function DocumentTablePagination({
  pageSize,
  onPageSizeChange,
  currentPage,
  totalPages,
  onPageChange,
}: DocumentTablePaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <label htmlFor="draft-page-size">Baris per halaman</label>

        <select
          id="draft-page-size"
          value={pageSize}
          onChange={(event) => {
            onPageSizeChange(Number(event.target.value));
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center justify-end gap-3">
        <span className="tabular-nums" aria-live="polite">
          Halaman {currentPage} dari {totalPages}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Halaman sebelumnya"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Halaman berikutnya"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

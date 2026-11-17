"use client";

import type { ChangeEvent } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { SortKey, SortDirection } from "./useDocumentTable";

type DocumentTableFiltersProps = {
  nomorAjuFilter: string;
  kodeDokumenFilter: string;
  jenisEntitasFilter: string;

  onNomorAjuChange: (value: string) => void;
  onKodeDokumenChange: (value: string) => void;
  onJenisEntitasChange: (value: string) => void;

  sortConfig: {
    key: SortKey;
    direction: SortDirection;
  };
  onSort: (key: SortKey) => void;
};

type FilterInputProps = {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FilterInput({ value, label, onChange }: FilterInputProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      aria-label={label}
      className="w-full min-w-32 max-w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-normal text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

type THProps = {
  children?: React.ReactNode;
  className?: string;
};

function TH({ children, className = "" }: THProps) {
  return (
    <th
      className={`px-4 py-3 text-left align-top font-semibold text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}

function SortButton({
  label,
  sortKey,
  sortConfig,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sortConfig: {
    key: SortKey;
    direction: SortDirection;
  };
  onSort: (key: SortKey) => void;
}) {
  const isActive = sortConfig.key === sortKey;

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-blue-600"
      aria-label={`Urutkan berdasarkan ${label}`}
    >
      <span>{label}</span>

      {isActive ? (
        sortConfig.direction === "asc" ? (
          <ArrowUp size={15} />
        ) : (
          <ArrowDown size={15} />
        )
      ) : (
        <ArrowUpDown size={15} className="text-slate-400" />
      )}
    </button>
  );
}

export default function DocumentTableFilters({
  nomorAjuFilter,
  kodeDokumenFilter,
  jenisEntitasFilter,
  onNomorAjuChange,
  onKodeDokumenChange,
  onJenisEntitasChange,
  sortConfig,
  onSort,
}: DocumentTableFiltersProps) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50">
      <tr>
        <TH className="w-16 text-center">Nomor</TH>

        <TH>
          <div className="space-y-2">
            <p>Nomor Aju</p>
            <FilterInput
              value={nomorAjuFilter}
              label="Filter Nomor Aju"
              onChange={(event) => onNomorAjuChange(event.target.value)}
            />
          </div>
        </TH>

        <TH>
          <div className="space-y-2">
            <p>Kode Dokumen</p>
            <FilterInput
              value={kodeDokumenFilter}
              label="Filter Kode Dokumen"
              onChange={(event) => onKodeDokumenChange(event.target.value)}
            />
          </div>
        </TH>

        <TH>
          <div className="space-y-2">
            <p>Jenis Entitas</p>
            <FilterInput
              value={jenisEntitasFilter}
              label="Filter Jenis Entitas"
              onChange={(event) => onJenisEntitasChange(event.target.value)}
            />
          </div>
        </TH>

        <TH>
          <SortButton
            label="Tanggal Dibuat"
            sortKey="createdAt"
            sortConfig={sortConfig}
            onSort={onSort}
          />
        </TH>

        <TH>
          <SortButton
            label="Terakhir Diperbarui"
            sortKey="updatedAt"
            sortConfig={sortConfig}
            onSort={onSort}
          />
        </TH>

        <TH className="w-24 text-center">Aksi</TH>
      </tr>
    </thead>
  );
}

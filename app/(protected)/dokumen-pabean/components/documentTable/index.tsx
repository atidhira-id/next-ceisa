"use client";

import { useDocumentTable } from "./useDocumentTable";
import DocumentTableFilters from "./documentTableFilter";
import DocumentTableContent from "./documentTableContent";
import DocumentTablePagination from "./documentTablePagination";
import ModalUserConfirmation from "../../../../components/modalUserConfirmation";

export default function DocumentTable() {
  const {
    drafts,
    isLoading,
    error,

    draftToDelete,
    setDraftToDelete,

    nomorAjuFilter,
    setNomorAjuFilter,
    kodeDokumenFilter,
    setKodeDokumenFilter,
    jenisEntitasFilter,
    setJenisEntitasFilter,

    setPage,
    pageSize,
    setPageSize,

    sortConfig,
    handleSort,

    visibleDrafts,
    totalPages,
    currentPage,
    firstItemIndex,

    handleDeleteDraft,
  } = useDocumentTable();

  if (isLoading) {
    return <p>Memuat daftar dokumen...</p>;
  }

  return (
    <>
      <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
        {/* ERROR MESSAGE */}
        {error && (
          <div className="m-3 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
              !
            </div>

            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275 text-left text-sm">
            <DocumentTableFilters
              nomorAjuFilter={nomorAjuFilter}
              kodeDokumenFilter={kodeDokumenFilter}
              jenisEntitasFilter={jenisEntitasFilter}
              onNomorAjuChange={(value) => {
                setNomorAjuFilter(value);
                setPage(1);
              }}
              onKodeDokumenChange={(value) => {
                setKodeDokumenFilter(value);
                setPage(1);
              }}
              onJenisEntitasChange={(value) => {
                setJenisEntitasFilter(value);
                setPage(1);
              }}
              sortConfig={sortConfig}
              onSort={handleSort}
            />

            <DocumentTableContent
              drafts={drafts}
              visibleDrafts={visibleDrafts}
              firstItemIndex={firstItemIndex}
              onDelete={setDraftToDelete}
            />
          </table>
        </div>

        {/* PAGINATION */}
        <DocumentTablePagination
          pageSize={pageSize}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* DELETE CONFIRMATION */}
      {draftToDelete && (
        <ModalUserConfirmation
          isDanger
          title="Hapus Draft"
          description={`Apakah Anda yakin ingin menghapus draft ${draftToDelete}?`}
          handleYes={() => {
            void handleDeleteDraft(draftToDelete);
          }}
          handleNo={() => setDraftToDelete(null)}
        />
      )}
    </>
  );
}

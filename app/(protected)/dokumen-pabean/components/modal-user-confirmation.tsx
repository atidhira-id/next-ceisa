type ModalUserConfirmationProps = {
  handleYes: () => void;
  handleNo: () => void;
};

export default function ModalUserConfirmation({
  handleYes,
  handleNo,
}: ModalUserConfirmationProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-document-title"
        aria-describedby="delete-document-description"
      >
        <h2 id="delete-document-title" className="text-lg font-semibold">
          Hapus Dokumen
        </h2>
        <p
          id="delete-document-description"
          className="mt-2 text-sm text-gray-600"
        >
          Apakah Anda yakin ingin menghapus dokumen ini?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleNo}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleYes}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

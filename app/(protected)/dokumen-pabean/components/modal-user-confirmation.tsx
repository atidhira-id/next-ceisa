type ModalUserConfirmationProps = {
  handleYes: () => void;
  handleNo: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
};

export default function ModalUserConfirmation({
  handleYes,
  handleNo,
  title = "Hapus Dokumen",
  description = "Apakah Anda yakin ingin menghapus dokumen ini?",
  confirmLabel = "Hapus",
}: ModalUserConfirmationProps) {
  const titleId = `${title.toLowerCase().replace(/\s+/g, "-")}-title`;
  const descriptionId = `${title.toLowerCase().replace(/\s+/g, "-")}-description`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        <p id={descriptionId} className="mt-2 text-sm text-gray-600">
          {description}
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
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

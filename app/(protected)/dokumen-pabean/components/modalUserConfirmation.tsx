import { NormalButton } from "./buttons";

type ModalUserConfirmationProps = {
  handleYes: () => void;
  handleNo: () => void;
  isDanger?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
};

export default function ModalUserConfirmation({
  handleYes,
  handleNo,
  isDanger = false,
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
        <p id={descriptionId} className="mt-2 text-base text-gray-600">
          {description}
        </p>
        <div className="mt-20 flex justify-end gap-3">
          <NormalButton variant={"inverted"} onClick={handleNo}>
            Batal
          </NormalButton>
          <NormalButton
            variant={isDanger ? "danger" : "normal"}
            onClick={handleYes}
          >
            {confirmLabel}
          </NormalButton>
        </div>
      </div>
    </div>
  );
}

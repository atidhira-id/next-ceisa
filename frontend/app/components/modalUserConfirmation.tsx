import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from "@/app/components/modal";

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
  const descriptionId = `${title.toLowerCase().replace(/\s+/g, "-")}-description`;

  return (
    <ModalWrapper className="w-full max-w-md">
      <ModalHeader title={title} onCloseModal={handleNo}></ModalHeader>
      <ModalContent>
        <p id={descriptionId} className="mb-20 text-base text-gray-600">
          {description}
        </p>
      </ModalContent>

      <ModalFooter
        textYes={confirmLabel}
        isDanger={isDanger}
        handleYes={handleYes}
        handleNo={handleNo}
      ></ModalFooter>
    </ModalWrapper>
  );
}

import React from "react";
import { NormalButton } from "./buttons";

type ModalWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export function ModalWrapper({ className, children }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-2 backdrop-blur-sm sm:p-4">
      <div
        className={`${className} max-h-[90dvh] rounded-sm border border-slate-200 bg-white shadow-2xl shadow-slate-950/20`}
      >
        {children}
      </div>
    </div>
  );
}

type ModalHeaderProps = {
  title: string;
  onCloseModal: () => void;
  children?: React.ReactNode;
};

export function ModalHeader({
  title,
  onCloseModal,
  children,
}: ModalHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-800">
          {title}
        </h2>
        {children}
      </div>

      <button
        type="button"
        onClick={onCloseModal}
        aria-label="Tutup modal"
        className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 hover:cursor-pointer"
      >
        <span className="text-xl leading-none">&times;</span>
      </button>
    </div>
  );
}

type ModalContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function ModalContent({ className, children }: ModalContentProps) {
  return <div className={`${className} space-y-5 px-6 py-5`}>{children}</div>;
}

type ModalFooterProps = {
  textYes?: string;
  textNo?: string;
  isDanger?: boolean;
  disabled?: boolean;
  handleYes: () => void;
  handleNo: () => void;
  children?: React.ReactNode;
};

export function ModalFooter({
  textYes = "Ya",
  textNo = "Batal",
  isDanger = false,
  disabled = false,
  handleNo,
  handleYes,
  children,
}: ModalFooterProps) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7 mt-4">
      {children}
      <div className="ml-auto flex gap-2">
        <NormalButton variant={"inverted"} onClick={handleNo}>
          {textNo}
        </NormalButton>

        <NormalButton
          variant={isDanger ? "danger" : "normal"}
          disabled={disabled}
          onClick={handleYes}
        >
          {textYes}
        </NormalButton>
      </div>
    </div>
  );
}

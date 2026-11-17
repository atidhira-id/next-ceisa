import React from "react";

type NormalButtonProps = {
  children: React.ReactNode;
  variant?: "normal" | "inverted" | "danger";
  disabled?: boolean;
  onClick?: () => void;
};

export function NormalButton({
  children,
  variant = "normal",
  disabled = false,
  onClick,
}: NormalButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-sm px-2 py-1 md:px-4 md:py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    normal:
      "bg-gray-800 text-white shadow-sm hover:bg-gray-900 focus-visible:ring-gray-900 active:bg-gray-900",

    inverted:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 focus-visible:ring-slate-400 active:bg-slate-200",

    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500 active:bg-red-800",
  };

  const disabledStyles = "cursor-not-allowed opacity-50 shadow-none";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? disabledStyles : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

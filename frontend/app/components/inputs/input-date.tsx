"use client";
import { useId } from "react";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type InputDateProps = {
  labelPosition?: "top" | "left";
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  rules?: Rule<string>[];
  error?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
};

export default function InputDate({
  labelPosition = "top",
  label,
  value,
  onChange,
  rules,
  error,
  disabled = false,
  min,
  max,
}: InputDateProps) {
  const inputId = useId();
  const { error: err, onBlur } = useFieldError(value, rules, error);

  return (
    <div
      className={`w-full ${labelPosition === "left" ? "flex items-center gap-4 mb-4" : ""}`}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 ${
            labelPosition === "left" ? "w-1/3 shrink-0 mb-0" : "mb-2"
          }`}
        >
          {label}
        </label>
      )}
      <div className={labelPosition === "left" ? "w-full" : "w-full"}>
        <input
          id={inputId}
          type="date"
          onBlur={onBlur}
          aria-invalid={!!err}
          aria-describedby={err ? `${inputId}-error` : undefined}
          value={value ?? ""}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${
            err ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {err && <Error id={inputId} err={err} />}
      </div>
    </div>
  );
}

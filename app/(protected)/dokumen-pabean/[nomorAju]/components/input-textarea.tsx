import { useId } from "react";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type InputTextAreaProps = {
  title?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  rules?: Rule<string>[];
  error?: string;
};

export default function InputTextArea({
  title,
  value,
  onChange,
  rules,
  error,
  disabled = false,
  rows = 4,
}: InputTextAreaProps) {
  const inputId = useId();
  const { error: err, onBlur } = useFieldError(value, rules, error);

  return (
    <div className="w-full">
      {title && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {title}
        </label>
      )}
      <textarea
        id={inputId}
        onBlur={onBlur}
        aria-invalid={!!err}
        aria-describedby={err ? `${inputId}-error` : undefined}
        rows={rows}
        value={value ?? ""}
        disabled={disabled}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${
          err ? "border-red-500" : "border-gray-300"
        }`}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {err && <Error id={inputId} err={err} />}
    </div>
  );
}

import { useId } from "react";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type InputTextAreaProps = {
  labelPosition?: "top" | "left";
  title?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  rules?: Rule<string>[];
  error?: string;
};

export default function InputTextArea({
  labelPosition = "top",
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
    <div
      className={`w-full ${labelPosition === "left" ? "flex items-center gap-4 mb-4" : ""}`}
    >
      {title && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 ${
            labelPosition === "left" ? "w-1/3 shrink-0 mb-0" : "mb-2"
          }`}
        >
          {title}
        </label>
      )}
      <div className={`w-full relative`}>
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
        {err && (
          <div className="absolute -bottom-5 left-0">
            <Error id={inputId} err={`${title} ${err}`} />
          </div>
        )}
      </div>
    </div>
  );
}

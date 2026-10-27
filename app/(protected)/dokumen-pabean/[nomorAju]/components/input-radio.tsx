import { useId } from "react";
import { type OptionType } from "@/lib/options";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type RadioProps = {
  labelPosition?: "top" | "left";
  title?: string;
  options: OptionType[];
  value: string;
  onChange?: (value: string) => void;
  rules?: Rule<string>[];
  error?: string;
  disabled?: boolean;
};

export default function InputRadio({
  labelPosition = "top",
  title,
  options,
  value,
  onChange,
  rules,
  error,
  disabled = false,
}: RadioProps) {
  const inputId = useId();
  const { error: err, onBlur } = useFieldError(value, rules, error);

  return (
    <div
      className={`w-full ${labelPosition === "left" ? "flex items-center gap-4 mb-4" : ""} ${err && "mb-8"}`}
    >
      {title && (
        <legend
          className={`block text-sm font-medium text-gray-700 ${
            labelPosition === "left" ? "w-1/3 shrink-0 mb-0" : "mb-2"
          }`}
        >
          {title}
        </legend>
      )}
      <div className={`w-full relative`}>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {options.map((opt) => {
            const id = `${inputId}-${opt.value}`;
            return (
              <label
                key={opt.value}
                htmlFor={id}
                className={`flex items-center gap-2 text-sm text-gray-900 ${
                  disabled
                    ? "cursor-not-allowed text-gray-500"
                    : "cursor-pointer"
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name={inputId}
                  onBlur={onBlur}
                  aria-describedby={err ? `${inputId}-error` : undefined}
                  value={opt.value}
                  checked={value === opt.value}
                  disabled={disabled}
                  className="h-4 w-4 border-gray-300 disabled:cursor-not-allowed"
                  onChange={() => onChange?.(opt.value)}
                />
                {opt.label}
              </label>
            );
          })}
        </div>
        {err && (
          <div className="absolute -bottom-5 left-0">
            <Error id={inputId} err={`${title} ${err}`} />
          </div>
        )}
      </div>
    </div>
  );
}

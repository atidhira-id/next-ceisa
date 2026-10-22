import { useId } from "react";
import { type OptionType } from "@/lib/options";

type RadioProps = {
  title?: string;
  options: OptionType[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function InputRadio({
  title,
  options,
  value,
  onChange,
  disabled = false,
}: RadioProps) {
  const name = useId();
  return (
    <fieldset className="w-full" disabled={disabled}>
      {title && (
        <legend className="mb-2 block text-sm font-medium text-gray-700">
          {title}
        </legend>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {options.map((opt) => {
          const id = `${name}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={`flex items-center gap-2 text-sm text-gray-900 ${
                disabled ? "cursor-not-allowed text-gray-500" : "cursor-pointer"
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
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
    </fieldset>
  );
}

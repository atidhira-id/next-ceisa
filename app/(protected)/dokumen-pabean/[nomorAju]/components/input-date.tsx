import { useId } from "react";

type InputDateProps = {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  min?: string;
  max?: string;
};

export default function InputDate({
  label,
  value,
  onChange,
  disabled = false,
  min,
  max,
}: InputDateProps) {
  const generatedId = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={generatedId}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={generatedId}
        type="date"
        value={value ?? ""}
        disabled={disabled}
        min={min}
        max={max}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

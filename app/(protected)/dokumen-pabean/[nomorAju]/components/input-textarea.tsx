import { useId } from "react";

type InputTextAreaProps = {
  title?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
};

export default function InputTextArea({
  title,
  value,
  onChange,
  disabled = false,
  rows = 4,
}: InputTextAreaProps) {
  const id = useId();

  return (
    <div className="w-full">
      {title && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {title}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value ?? ""}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

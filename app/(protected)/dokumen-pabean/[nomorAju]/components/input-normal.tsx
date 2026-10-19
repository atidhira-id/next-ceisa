import { useId } from "react";

type InputNormalProps = {
  title?: string;
  type?: string;
  value: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function InputNormal({
  title,
  type = "text",
  value,
  onChange,
  disabled = false,
}: InputNormalProps) {
  const inputId = useId();
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
      <input
        id={inputId}
        type={type}
        value={value ?? ""}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

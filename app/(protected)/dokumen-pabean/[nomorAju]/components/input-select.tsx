"use client";

import { useId, useMemo, useState } from "react";

type InputSelectProps = {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export default function InputSelect({
  label,
  value,
  options,
  onChange,
}: InputSelectProps) {
  // Generate a unique ID for the input element
  const inputId = useId();

  // Find the selected option based on the current value
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  // State to manage the input query and whether the dropdown is open
  const [query, setQuery] = useState(() => selectedOption?.label ?? "");
  const [isOpen, setIsOpen] = useState(false);

  // Filter the options based on the input query
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter(({ label, value: optionValue }) => {
      const optionText = `${label} ${optionValue}`.toLowerCase();
      return optionText.includes(normalizedQuery);
    });
  }, [options, query]);

  // Handle the selection of an option
  function handleSelect(selectedValue: string, selectedLabel: string) {
    onChange(selectedValue);
    setQuery(selectedLabel);
    setIsOpen(false);
  }

  // Clear the user selection on input field
  function clearSelection() {
    onChange("");
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={query}
          autoComplete="off"
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => {
              setQuery(selectedOption?.label ?? "");
              setIsOpen(false);
            }, 150);
          }}
          onChange={(event) => {
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            setIsOpen(true);
          }}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />

        {query && (
          <button
            type="button"
            aria-label={`Clear ${label}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearSelection}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-lg text-gray-500 transition hover:text-gray-700"
          >
            ×
          </button>
        )}

        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(option.value, option.label)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

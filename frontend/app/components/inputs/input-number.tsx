"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type InputNumberProps = {
  labelPosition?: "top" | "left";
  numberFormat?: "ID" | "US";
  title?: string;
  value: number;
  onChange?: (value: number) => void;
  rules?: Rule<number>[];
  error?: string;
  disabled?: boolean;
};

function getSeparators(numberFormat: "ID" | "US") {
  return numberFormat === "ID"
    ? { decimal: ",", grouping: "." }
    : { decimal: ".", grouping: "," };
}

function format(raw: string, numberFormat: "ID" | "US") {
  const { decimal, grouping } = getSeparators(numberFormat);
  const cleaned = raw
    .split("")
    .filter((character) => /\d/.test(character) || character === decimal)
    .join("");
  const [intRaw, ...fractionParts] = cleaned.split(decimal);
  const hasDecimal = cleaned.includes(decimal);
  const fraction = fractionParts.join("");
  const int = (
    intRaw.replace(/^0+(?=\d)/, "") || (hasDecimal ? "0" : "")
  ).replace(/\B(?=(\d{3})+(?!\d))/g, grouping);
  return hasDecimal ? `${int}${decimal}${fraction}` : int;
}

function parse(text: string, numberFormat: "ID" | "US") {
  const { decimal, grouping } = getSeparators(numberFormat);
  return Number(text.split(grouping).join("").replace(decimal, ".")) || 0;
}

function fromNumber(n: number, numberFormat: "ID" | "US") {
  if (!n) {
    return "";
  }

  const { decimal } = getSeparators(numberFormat);
  return format(String(n).replace(".", decimal), numberFormat);
}

export default function InputNumber({
  labelPosition = "top",
  numberFormat = "ID",
  title,
  value,
  onChange,
  rules,
  error,
  disabled = false,
}: InputNumberProps) {
  const inputId = useId();
  const { error: err, onBlur } = useFieldError(value, rules, error);
  const ref = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const [text, setText] = useState(() => fromNumber(value, numberFormat));
  const [prevValue, setPrevValue] = useState(value);
  const [prevNumberFormat, setPrevNumberFormat] = useState(numberFormat);

  // Sync the displayed text when the value or number format changes externally.
  if (numberFormat !== prevNumberFormat) {
    setPrevNumberFormat(numberFormat);
    setPrevValue(value);
    setText(fromNumber(value, numberFormat));
  } else if (value !== prevValue) {
    setPrevValue(value);
    if (parse(text, numberFormat) !== value) {
      setText(fromNumber(value, numberFormat));
    }
  }

  // restore caret after reformatting
  useLayoutEffect(() => {
    if (caretRef.current !== null && ref.current) {
      ref.current.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { decimal } = getSeparators(numberFormat);
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;
    const significant = raw
      .slice(0, caret)
      .split("")
      .filter(
        (character) => /\d/.test(character) || character === decimal,
      ).length;
    const next = format(raw, numberFormat);

    let pos = 0;
    let count = 0;
    while (pos < next.length && count < significant) {
      if (/\d/.test(next[pos]) || next[pos] === decimal) count++;
      pos++;
    }
    caretRef.current = pos;

    setText(next);
    onChange?.(parse(next, numberFormat));
  };

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
        <input
          ref={ref}
          id={inputId}
          onBlur={onBlur}
          aria-invalid={!!err}
          aria-describedby={err ? `${inputId}-error` : undefined}
          type="text"
          inputMode="decimal"
          placeholder={`0${getSeparators(numberFormat).decimal}0`}
          value={text}
          disabled={disabled}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${
            err ? "border-red-500" : "border-gray-300"
          }`}
          onChange={handleChange}
        />

        {err && (
          <div className="absolute -bottom-5 left-0">
            <Error id={inputId} err={`${title || "Nilai"} ${err}`} />
          </div>
        )}
      </div>
    </div>
  );
}

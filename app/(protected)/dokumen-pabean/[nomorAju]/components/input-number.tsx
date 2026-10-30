"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { Rule, useFieldError } from "@/lib/validation";
import Error from "./error";

type InputNumberProps = {
  labelPosition?: "top" | "left";
  title?: string;
  value: number;
  onChange?: (value: number) => void;
  rules?: Rule<number>[];
  error?: string;
  disabled?: boolean;
};

function format(raw: string) {
  const cleaned = raw.replace(/[^\d,]/g, "");
  const [intRaw, ...rest] = cleaned.split(",");
  const int = (
    intRaw.replace(/^0+(?=\d)/, "") || (rest.length ? "0" : "")
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return rest.length ? `${int},${rest.join("")}` : int;
}

function parse(text: string) {
  return Number(text.replace(/\./g, "").replace(",", ".")) || 0;
}

function fromNumber(n: number) {
  return n === 0 ? "" : format(String(n).replace(".", ","));
}

export default function InputNumber({
  labelPosition = "top",
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
  const [text, setText] = useState(() => fromNumber(value));
  const [prevValue, setPrevValue] = useState(value);

  // sync when parent changes value externally
  if (value !== prevValue) {
    setPrevValue(value);
    if (parse(text) !== value) setText(fromNumber(value));
  }

  // restore caret after reformatting
  useLayoutEffect(() => {
    if (caretRef.current !== null && ref.current) {
      ref.current.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;
    const significant = raw.slice(0, caret).replace(/[^\d,]/g, "").length;
    const next = format(raw);

    let pos = 0;
    let count = 0;
    while (pos < next.length && count < significant) {
      if (/[\d,]/.test(next[pos])) count++;
      pos++;
    }
    caretRef.current = pos;

    setText(next);
    onChange?.(parse(next));
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
          placeholder="0.0"
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

import { useState } from "react";

export type Rule<T> = (value: T) => string | undefined;

// returns first error message, or undefined if valid
export const validate = <T>(value: T, rules?: Rule<T>[]) => {
  for (const rule of rules ?? []) {
    const msg = rule(value);
    if (msg) return msg;
  }
};

const fmt = (n: number) => n.toLocaleString("id-ID");

// number: 0 counts as empty (InputNumber emits 0 when empty)
export const required =
  (msg = "Wajib diisi"): Rule<string | number> =>
  (v) =>
    v == null || v === "" || v === 0 ? msg : undefined;

export const min =
  (n: number, msg?: string): Rule<number> =>
  (v) =>
    v < n ? (msg ?? `Minimal ${fmt(n)}`) : undefined;

export const max =
  (n: number, msg?: string): Rule<number> =>
  (v) =>
    v > n ? (msg ?? `Maksimal ${fmt(n)}`) : undefined;

export const minLength =
  (n: number, msg?: string): Rule<string> =>
  (v) =>
    v.length < n ? (msg ?? `Minimal ${n} karakter`) : undefined;

export const maxLength =
  (n: number, msg?: string): Rule<string> =>
  (v) =>
    v.length > n ? (msg ?? `Maksimal ${n} karakter`) : undefined;

export const kontainerName =
  (msg = "Format 4 huruf 7 angka (Contoh: ABCD1234567)"): Rule<string> =>
  (v) => {
    const regex = /^[A-Za-z]{4}\d{7}$/;
    return !regex.test(String(v)) ? msg : undefined;
  };

// external `error` wins; rule errors show only after first blur
export function useFieldError<T>(
  value: T,
  rules?: Rule<T>[],
  externalError?: string,
) {
  const [touched, setTouched] = useState(false);
  const error = externalError ?? (touched ? validate(value, rules) : undefined);
  return { error, onBlur: () => setTouched(true) };
}

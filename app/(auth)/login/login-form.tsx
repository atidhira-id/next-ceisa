"use client";

import { signIn } from "next-auth/react";
import { SubmitEvent, useState } from "react";
import { redirect } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    let result;
    try {
      result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } finally {
      setLoading(false);
    }

    if (!result || result.error) {
      setError("Email atau password salah.");
      return;
    }
    redirect("/dokumen-pabean");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputLogin
        label="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <InputLogin
        label="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
      />

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !email.trim() || !password}
        className="mt-3 w-full rounded-lg bg-red-900 px-4 py-3 text-base font-semibold tracking-wide text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-800 hover:shadow-red-700/30 hover:cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {loading ? "Sedang Masuk..." : "Masuk"}
      </button>
    </form>
  );
}

type InputLoginType = {
  label: "email" | "password";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

function InputLogin({
  label,
  value,
  onChange,
  showPassword = false,
  onTogglePassword,
}: InputLoginType) {
  const isPassword = label === "password";

  return (
    <div className="space-y-2">
      <label
        htmlFor={label}
        className="block text-sm font-semibold capitalize text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={label}
          name={label}
          type={isPassword ? (showPassword ? "text" : "password") : "email"}
          autoComplete={isPassword ? "current-password" : "email"}
          required
          value={value}
          onChange={onChange}
          placeholder={isPassword ? "Masukkan password" : "nama@email.com"}
          className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

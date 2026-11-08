"use client";

import { signIn } from "next-auth/react";
import { SubmitEvent, ChangeEvent, useState } from "react";
import { redirect } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

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
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading || email == "" || password == ""}
        className="w-full rounded-md bg-black px-4 py-3 mt-5 text-white font-bold tracking-wide disabled:opacity-50 hover:cursor-pointer"
      >
        {loading ? "Sedang Masuk..." : "Masuk"}
      </button>
    </form>
  );
}

type InputLoginType = {
  label: "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputLogin({ label, value, onChange }: InputLoginType) {
  return (
    <div>
      <label htmlFor={label} className="mb-1 block text-md font-medium">
        {label == "email" ? "Email" : "Password"}
      </label>

      <input
        id={label}
        name={label}
        type={label == "email" ? "email" : "password"}
        required
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-red-300 px-3 py-2 outline-none focus:border-red-600"
      />
    </div>
  );
}

// import Image from "next/image";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8">
      {/* BACKGROUND BLOBS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Top Left Blob*/}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-red-300/40 blur-3xl sm:h-96 sm:w-96" />

        {/* Bottom Right Blob */}
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl sm:h-120 sm:w-120" />

        {/* Top right Blob */}
        <div className="absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-red-300/30 blur-3xl sm:h-80 sm:w-80" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-3xl sm:h-96 sm:w-96" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.08]" />
      </div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/70 bg-white/85 px-5 py-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:px-8">
        {/* LOGO */}
        <div className="mb-12 flex flex-col items-center justify-center gap-3">
          <div className="relative h-10 w-20">
            {/* <Image
              src="/utpe.png"
              alt="UTPE Logo"
              fill
              priority
              className="object-contain"
            /> */}
            <h1 className="text-xl font-bold text-center">UTPE</h1>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            UTPE Ceisa Clone
          </h2>

          <p className="text-center text-sm text-slate-500">
            Import & Export Document Management
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

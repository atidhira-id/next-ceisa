import Image from "next/image";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md flex flex-col gap-5 py-5 px-4 md:px-6 m-4 border border-red-400 rounded-sm bg-white">
        {/* LOGO */}
        <div className="flex flex-col items-center justify-center gap-2 mb-20">
          <div className="relative block w-15 h-8">
            <Image src={"/utpe.png"} alt="Logo" fill className="object-cover" />
          </div>
          <h1 className="text-lg font-bold">UTPE Ceisa Clone</h1>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Login</h1>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to your admin dashboard
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

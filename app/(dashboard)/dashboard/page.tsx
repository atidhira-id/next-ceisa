import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Selamat datang, {session.user?.name ?? session.user?.email}.
      </p>
    </main>
  );
}

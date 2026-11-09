import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { DashboardShell } from "@/app/(protected)/dashboardShell";
import { DocumentProvider } from "@/app//providers/document-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <DocumentProvider>
      <DashboardShell
        user={{
          name: session.user?.name ?? null,
          email: session.user?.email ?? "",
        }}
      >
        {children}
      </DashboardShell>
    </DocumentProvider>
  );
}

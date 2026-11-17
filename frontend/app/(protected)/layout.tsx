"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";
import { DashboardShell } from "@/app/(protected)/dashboardShell";
import { DraftProvider } from "@/app/providers/draftProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <DraftProvider>
      <DashboardShell
        user={{
          name: user.name,
          email: user.email,
        }}
      >
        {children}
      </DashboardShell>
    </DraftProvider>
  );
}

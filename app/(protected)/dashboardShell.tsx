"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { navigation } from "@/app/constants/sideNavigation";
import { LogOut, Menu, MoveLeft, MoveRight, X } from "lucide-react";
// import Image from "next/image";

const dashboardText = {
  companyName: "PT. United Tractors Pandu Engineering",
  logout: "Keluar",
};

type DashboardShellProps = {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string;
  };
};

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 md:static md:z-auto ${
          collapsed ? "md:w-20" : "md:w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div
          className={` flex h-16 shrink-0 items-center justify-center border-b border-slate-200  ${
            collapsed ? " px-5 md:px-0" : "px-5"
          }`}
        >
          <Link
            href="/dokumen-pabean"
            className="relative block w-15 h-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* <Image
              src={"/utpe.png"}
              alt="Logo"
              fill
              priority
              className="object-cover"
            /> */}
            <h1 className="text-center text-xl font-bold">UTPE</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dokumen-pabean"
                ? pathname === "/dokumen-pabean"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 font-semibold text-gray-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${collapsed ? "md:justify-center" : ""}`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center ${
                    isActive
                      ? "text-gray-600"
                      : "text-slate-500 group-hover:text-slate-700"
                  }`}
                >
                  <item.icon size={19} aria-hidden="true" />
                </span>

                <span className={collapsed ? "md:hidden" : undefined}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="shrink-0 border-t border-slate-200 p-3">
          <div className={`mb-3 px-2 ${collapsed ? "md:hidden" : ""}`}>
            <p className="truncate text-sm font-semibold text-slate-800">
              {user.name ?? "Administrator"}
            </p>

            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 ${
              collapsed ? "md:justify-center" : ""
            }`}
          >
            <LogOut size={19} />

            <span className={collapsed ? "md:hidden" : undefined}>
              {dashboardText.logout}
            </span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm">
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-controls="dashboard-sidebar"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>

          {/* COLLAPSE SIDEBAR */}
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MoveRight size={18} /> : <MoveLeft size={18} />}
          </button>

          {/* COMPANY NAME */}
          <div className="ml-2 min-w-0 md:ml-4">
            <p className="truncate text-base font-semibold text-slate-800">
              {dashboardText.companyName}
            </p>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

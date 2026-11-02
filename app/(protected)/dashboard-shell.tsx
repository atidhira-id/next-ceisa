"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { House, LogOut, Menu, MoveLeft, MoveRight, X } from "lucide-react";

type DashboardShellProps = {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string;
  };
};

const navigation = [
  {
    label: "Daftar Dokumen",
    href: "/dokumen-pabean",
    icon: House,
  },
];

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r bg-white transition-all duration-200 md:static md:z-auto ${
          collapsed ? "md:w-20" : "md:w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div
          className={`flex h-16 justify-center items-center border-b ${
            collapsed ? "justify-center px-5 md:px-0" : "px-5"
          }`}
        >
          <Link
            href="/dokumen-pabean"
            className="font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            <p className={collapsed ? "md:hidden" : "text-center"}>PT. UTPE</p>
            {collapsed && <span className="hidden md:inline">UTPE</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
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
                className={`flex items-center rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-gray-200 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } gap-3 ${collapsed ? "md:justify-center" : ""}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <item.icon size={18} aria-hidden="true" />
                </span>

                <span className={collapsed ? "md:hidden" : undefined}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t p-3">
          <div className={`mb-3 px-2 ${collapsed ? "md:hidden" : ""}`}>
            <p className="truncate text-sm font-medium">
              {user.name ?? "Administrator"}
            </p>

            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
              collapsed ? "gap-3 md:justify-center" : "gap-3"
            }`}
          >
            <LogOut size={20} />

            <span className={collapsed ? "md:hidden" : undefined}>Logout</span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center border-b bg-white px-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
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

          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 md:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MoveRight size={16} /> : <MoveLeft size={16} />}
          </button>

          <div className="ml-2 min-w-0 md:ml-4">
            <p className="truncate text-md font-bold">
              PT. Badan United Tractors Pandu Engineering
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

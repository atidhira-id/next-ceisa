"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

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
    icon: "⌂",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "⚙",
  },
];

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } flex shrink-0 flex-col border-r bg-white transition-all duration-200`}
      >
        {/* Logo */}
        <div
          className={`flex h-16 items-center border-b ${
            collapsed ? "justify-center" : "px-5"
          }`}
        >
          <Link href="/dashboard" className="font-semibold">
            {collapsed ? "IE" : "Import Eksport"}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-gray-100 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } ${collapsed ? "justify-center" : "gap-3"}`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-base">
                  {item.icon}
                </span>

                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t p-3">
          {!collapsed && (
            <div className="mb-3 px-2">
              <p className="truncate text-sm font-medium">
                {user.name ?? "Administrator"}
              </p>

              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <span>↪</span>

            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center border-b bg-white px-4">
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>

          <div className="ml-4">
            <p className="text-sm font-medium">Import Eksport Dashboard</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

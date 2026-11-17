import type { Metadata } from "next";
import { AuthProvider } from "@/app/providers/authProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Importation Management System",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

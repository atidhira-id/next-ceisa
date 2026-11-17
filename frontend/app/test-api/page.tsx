"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function TestApiPage() {
  const [result, setResult] = useState("");

  async function testConnection() {
    try {
      const response = await api<{
        success: boolean;
        message: string;
      }>("/api/health");

      setResult(response.message);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Koneksi gagal.");
    }
  }

  return (
    <main className="p-8">
      <h1>Test Backend API</h1>

      <button onClick={testConnection}>Test Connection</button>

      <p>{result}</p>
    </main>
  );
}

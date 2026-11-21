import { api } from "@/app/lib/api";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
}

interface AuthResponse {
  message: string;
  user: AuthUser;
}

export async function login(email: string, password: string) {
  return api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getCurrentUser() {
  return api<{ user: AuthUser }>("/api/auth/me");
}

export async function logout() {
  return api<{ message: string }>("/api/auth/logout", {
    method: "POST",
  });
}

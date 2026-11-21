const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
}

type ApiOptions = RequestInit & {
  body?: BodyInit | null;
};

export class ApiError extends Error {
  status: number;
  errors?: unknown;

  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body && !isFormData
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message || "Terjadi kesalahan pada server.",
      response.status,
      data?.errors,
    );
  }

  return data as T;
}

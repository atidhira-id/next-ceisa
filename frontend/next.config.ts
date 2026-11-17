import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.API_BACKEND_URL ?? "http://localhost:4000";

    return [
      {
        source: "/api/documents/:path*",
        destination: `${backendUrl}/api/documents/:path*`,
      },
    ];
  },
};

export default nextConfig;

import { backendUrl } from "@/lib/constants/api";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.0.247", "46.119.98.78"],
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${backendUrl}/api/:path*`,
            },
            {
                source: "/uploads/:path*",
                destination: `${backendUrl}/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;

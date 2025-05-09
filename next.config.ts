import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "www.pinterest.com", "example.com"],
  },
};

export default nextConfig;

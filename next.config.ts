import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.pinimg.com",
      "www.pinterest.com",
      "example.com",
      "",
      "localhost",
    ],
  },
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "5001",
      pathname: "/uploads/**",
    },
  ],
};

export default nextConfig;

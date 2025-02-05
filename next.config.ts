import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch potential issues in React
  swcMinify: true, // Enables SWC compiler for faster builds
  output: "standalone", // Ensures better compatibility for deployment (optional)
};

export default nextConfig;

const nextConfig = {
  output: "standalone", // ✅ Ensures proper standalone build
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "", // ✅ Fixes asset paths
  basePath: "", // ✅ If using a subpath, set it like '/myapp'
  reactStrictMode: true,
};

export default nextConfig;

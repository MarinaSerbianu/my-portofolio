import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Case-study JSON is read from disk at build time; include it in serverless traces too.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*.json"],
  },
};

export default nextConfig;

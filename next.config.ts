import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.gangnambam\\.com" }],
        destination: "https://gangnambam.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

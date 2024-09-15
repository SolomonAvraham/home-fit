/** @type {import('next').NextConfig} */


const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // All API requests
        destination: "https://adgdbgbbbfcgbdsbdg.online/:path*", // Proxy to backend
      },
    ];
  },
  experimental: {
    // Disable Turbopack
    turbopack: false,
  },
};

export default nextConfig;

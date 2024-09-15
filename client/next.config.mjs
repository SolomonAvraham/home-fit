/** @type {import('next').NextConfig} */


const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api", // All API requests
        destination: "https://adgdbgbbbfcgbdsbdg.online/api", // Proxy to backend
      },
    ];
  },
  experimental: {
    // Disable Turbopack
    turbopack: false,
  },
};

export default nextConfig;

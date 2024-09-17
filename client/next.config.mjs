/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://adgdbgbbbfcgbdsbdg.online/api/:path*", // Ensure the URL starts with "https://"
      },
    ];
  },
};

export default nextConfig;

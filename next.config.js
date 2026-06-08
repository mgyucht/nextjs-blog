/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/health", destination: "/api/health" }];
  },
};

module.exports = nextConfig;

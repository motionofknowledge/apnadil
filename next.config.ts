import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'https://mokother.s3.ap-south-1.amazonaws.com',
      
    ]
  },
};

export default nextConfig;



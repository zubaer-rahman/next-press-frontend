import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',  
       },
       {
        protocol: 'https',
        hostname: 'example.com',  
       },
    ],
  },
};

export default nextConfig;

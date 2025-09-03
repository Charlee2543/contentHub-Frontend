import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "storagecontenthub.s3.us-east-1.amazonaws.com",
            port: "",
            pathname: "/**",
            search: "",
         },
      ],
   },
};

export default nextConfig;

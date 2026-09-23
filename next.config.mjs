/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/api/**/*': ['./private_assets/**/*'],
  },
};

export default nextConfig;

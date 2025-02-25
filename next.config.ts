import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['sequelize', 'mariadb'],
};

export default nextConfig;

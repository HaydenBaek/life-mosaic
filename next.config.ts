import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  env: {
    // Production Environment Variables
    host: process.env.MYSQL_HOST || 'prod-db-host.com',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'prod_user',
    password: process.env.MYSQL_PASSWORD || 'prod_password',
    database: process.env.MYSQL_DATABASE || 'prod_db_name',
  },
};

export default nextConfig;

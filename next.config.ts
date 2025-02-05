import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST || "prod-db-host.com",
    MYSQL_PORT: process.env.MYSQL_PORT || "3306",
    MYSQL_USER: process.env.MYSQL_USER || "prod_user",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "prod_password",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "prod_db_name",
  },
};

export default nextConfig;

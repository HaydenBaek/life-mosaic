import mysql, { PoolOptions } from "mysql2/promise";
import fs from "fs";

// Load SSL certificate if needed
const sslConfig =
  process.env.MYSQL_SSL === "true"
    ? { ca: fs.readFileSync(process.env.MYSQL_CA_CERT_PATH as string) }
    : undefined;

// Define a database connection config
const dbConfig: PoolOptions = {
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,
  port: Number(process.env.MYSQL_PORT) || 3306,
  ssl: sslConfig, // Only use SSL if required
  waitForConnections: true, // Prevent connection overload
  connectionLimit: 10, // Limits simultaneous connections
  queueLimit: 0, // No query limit
};

// Create a connection pool (better than a single connection)
const db = mysql.createPool(dbConfig);

export default db;

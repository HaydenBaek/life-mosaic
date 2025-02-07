import mysql, { PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define database connection with SSL
const dbConfig: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  ssl: process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10, // ✅ Ensure connection pooling is enabled
  queueLimit: 0,
  
};

// Create a connection pool
const db = mysql.createPool(dbConfig);

export default db;

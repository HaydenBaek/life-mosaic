import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import "dotenv/config"; // Load environment variables

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "lifemosaic",
  port: Number(process.env.MYSQL_PORT) || 3306,
};

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Check if the email is already in use
    const [existingUsers]: any = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      await connection.end();
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Insert the new user into the database (Plain Password)
    const [result]: any = await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    await connection.end();

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: result.insertId,
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

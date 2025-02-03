import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Connect to MySQL
    const connection = await mysql.createConnection(GetDBSettings());
    
    // Query user
    const [rows]: any = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    // Verify password (plain text for now)
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

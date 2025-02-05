import { NextResponse } from "next/server";
import pool from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    //    Checking if the email already exists
    const [existingUsers]: any = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    //    Insert new user into the database
    const [result]: any = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return NextResponse.json(
      {
        message: "User registered successfully!",
        user: {
          id: result.insertId,
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("  Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

// GET: Fetch all users
export async function GET() {
  try {
    console.log("Fetching all users");

    const [users] = await pool.execute(
      "SELECT id, email, name FROM users" // Excludes passwords
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result]: any = await pool.execute(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, password, name]
    );

    return NextResponse.json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error("Error creating user:", (error as Error).message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

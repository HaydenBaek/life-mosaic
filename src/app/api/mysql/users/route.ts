import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";

// 🔹 GET: Fetch all users
export async function GET() {
  try {
    console.log("Fetching all users");

    const connection = await mysql.createConnection(GetDBSettings());
    const [users] = await connection.execute("SELECT id, email, name FROM users"); // Don't return passwords
    await connection.end();

    return NextResponse.json(users);
  } catch (err) {
    console.error("ERROR: ", (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// 🔹 POST: Create a new user
export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const connection = await mysql.createConnection(GetDBSettings());
    const [result]: any = await connection.execute(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, password, name]
    );
    await connection.end();

    return NextResponse.json({ message: "User created successfully", userId: result.insertId });
  } catch (err) {
    console.error("ERROR: ", (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

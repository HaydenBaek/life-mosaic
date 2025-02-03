import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Hayden1123!",
  database: "lifemosaic",
};

// ✅ Handle GET request to fetch diary entries
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [entries] = await connection.execute(
      "SELECT id, entry_date, content FROM diary_entries WHERE user_id = ? ORDER BY entry_date DESC",
      [user_id]
    );
    await connection.end();

    return NextResponse.json(entries);
  } catch (error) {
    console.error("🚨 Diary Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Handle POST request to save a new diary entry
export async function POST(req: Request) {
  try {
    const { user_id, entry_date, content } = await req.json();

    console.log("📌 Received Data:", { user_id, entry_date, content });

    if (!user_id || !entry_date || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      "INSERT INTO diary_entries (user_id, entry_date, content) VALUES (?, ?, ?)",
      [user_id, entry_date, content]
    );

    await connection.end();

    console.log("✅ Entry Saved Successfully");

    return NextResponse.json({ message: "Diary entry saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("🚨 Diary Save Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

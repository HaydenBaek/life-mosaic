import { NextResponse } from "next/server";
import pool from "@/lib/db"; 

// Fetch diary entries for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    //    Use connection pool (no need to open/close manually)
    const [entries] = await pool.execute(
      "SELECT id, entry_date, content FROM diary_entries WHERE user_id = ? ORDER BY entry_date DESC",
      [user_id]
    );

    return NextResponse.json(entries);
  } catch (error) {
    console.error(" Diary Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Save a new diary entry
export async function POST(req: Request) {
  try {
    const { user_id, entry_date, content } = await req.json();

    if (!user_id || !entry_date || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    //    Use connection pool
    await pool.execute(
      "INSERT INTO diary_entries (user_id, entry_date, content) VALUES (?, ?, ?)",
      [user_id, entry_date, content]
    );

    return NextResponse.json({ message: "Diary entry saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("  Diary Save Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a diary entry
export async function DELETE(req: Request) {
  try {
    const { id, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json({ error: "Diary ID and User ID are required" }, { status: 400 });
    }

    //    Use connection pool
    await pool.execute("DELETE FROM diary_entries WHERE id = ? AND user_id = ?", [id, user_id]);

    return NextResponse.json({ message: "Diary entry deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("  Diary Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

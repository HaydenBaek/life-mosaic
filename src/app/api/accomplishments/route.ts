import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Fetch all accomplishments for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const [accomplishments] = await pool.execute(
      "SELECT id, title, description, achievement_date FROM accomplishments WHERE user_id = ? ORDER BY achievement_date DESC",
      [user_id]
    );

    return NextResponse.json(accomplishments);
  } catch (error) {
    console.error("Fetch Accomplishments Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Save a new accomplishment
export async function POST(req: Request) {
  try {
    const { user_id, title, description, achievement_date } = await req.json();

    if (!user_id || !title || !achievement_date) {
      return NextResponse.json({ error: "User ID, Title, and Date are required" }, { status: 400 });
    }

    await pool.execute(
      "INSERT INTO accomplishments (user_id, title, description, achievement_date) VALUES (?, ?, ?, ?)",
      [user_id, title, description, achievement_date]
    );

    return NextResponse.json({ message: "Accomplishment added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Save Accomplishment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete an accomplishment
export async function DELETE(req: Request) {
  try {
    const { id, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json({ error: "Accomplishment ID and User ID are required" }, { status: 400 });
    }

    await pool.execute("DELETE FROM accomplishments WHERE id = ? AND user_id = ?", [id, user_id]);

    return NextResponse.json({ message: "Accomplishment deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Delete Accomplishment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Fetch goals for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const [goals] = await pool.execute(
      "SELECT id, goal_name, image_url, price FROM goals WHERE user_id = ?",
      [user_id]
    );

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Goal Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add a new goal
export async function POST(req: Request) {
  try {
    const { user_id, goal_name, image_url, price } = await req.json();

    if (!user_id || !goal_name || !image_url || price === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await pool.execute(
      "INSERT INTO goals (user_id, goal_name, image_url, price) VALUES (?, ?, ?, ?)", 
      [user_id, goal_name, image_url, price]
    );

    return NextResponse.json({ message: "Goal added!" }, { status: 201 });
  } catch (error) {
    console.error("Goal Save Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//deleting goallll
export async function DELETE(req: Request) {
  try {
    const { id, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json({ error: "Goal ID and User ID are required" }, { status: 400 });
    }

    //checking if the goal even exists
    const [existingGoals]: any = await pool.execute(
      "SELECT id FROM goals WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (existingGoals.length === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    //deleting the goal
    await pool.execute("DELETE FROM goals WHERE id = ? AND user_id = ?", [id, user_id]);

    return NextResponse.json({ message: "Goal deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("  Goal Deletion Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


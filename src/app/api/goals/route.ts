import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Fetch goals for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [goals] = await connection.execute(
      "SELECT id, goal_name, image_url, price FROM goals WHERE user_id = ?",
      [user_id]
    );

    await connection.end();
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

    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO goals (user_id, goal_name, image_url, price) VALUES (?, ?, ?, ?)", 
      [user_id, goal_name, image_url, price]
    );
    await connection.end();

    return NextResponse.json({ message: "Goal added!" }, { status: 201 });
  } catch (error) {
    console.error("Goal Save Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a goal
export async function DELETE(req: Request) {
  try {
    const { id, user_id } = await req.json();

    if (!id || !user_id) {
      return NextResponse.json({ error: "Goal ID and User ID are required" }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "DELETE FROM goals WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    await connection.end();

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Goal not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Goal deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Goal Deletion Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

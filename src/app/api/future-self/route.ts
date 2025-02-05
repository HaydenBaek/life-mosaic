import { NextResponse } from "next/server";
import pool from "@/lib/db"; //    Use connection pool

//    GET: Fetch the latest Future Self data for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    //    Use pool connection
    const [rows]: any = await pool.execute(
      "SELECT * FROM future_self WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      [user_id]
    );

    return NextResponse.json(rows.length > 0 ? rows[0] : {});
  } catch (error) {
    console.error("  Future-Self Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//    POST: Save or update Future Self data
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { user_id, ...fields } = data;

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const columnMap: { [key: string]: string } = {
      career: "career_url",
      ultimateGoal: "ultimate_goal_url",
      house1: "house1_url",
      house2: "house2_url",
      car1: "car1_url",
      car2: "car2_url",
      boat: "boat_url",
      hobby1: "hobby1_url",
      hobby2: "hobby2_url",
      hobby3: "hobby3_url",
      hobby4: "hobby4_url",
      pet1: "pet1_url",
      pet2: "pet2_url",
    };

    const fieldNames = Object.keys(fields).map((key) => columnMap[key]).filter(Boolean);
    const fieldValues = Object.values(fields);

    if (fieldNames.length === 0) {
      return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    //    Construct ON DUPLICATE KEY UPDATE statement correctly
    const updates = fieldNames.map((field) => `${field} = VALUES(${field})`).join(", ");

    //    Use connection pool
    await pool.execute(
      `INSERT INTO future_self (user_id, ${fieldNames.join(", ")}) 
       VALUES (?, ${fieldValues.map(() => "?").join(", ")}) 
       ON DUPLICATE KEY UPDATE ${updates}`,
      [user_id, ...fieldValues]
    );

    return NextResponse.json({ message: "Future Self saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("  Future-Self Save Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//    PATCH: Remove a specific image URL from Future Self
export async function PATCH(req: Request) {
  try {
    const { user_id, field } = await req.json();

    if (!user_id || !field) {
      return NextResponse.json({ error: "User ID and field name are required" }, { status: 400 });
    }

    const columnMap: { [key: string]: string } = {
      career: "career_url",
      ultimateGoal: "ultimate_goal_url",
      house1: "house1_url",
      house2: "house2_url",
      car1: "car1_url",
      car2: "car2_url",
      boat: "boat_url",
      hobby1: "hobby1_url",
      hobby2: "hobby2_url",
      hobby3: "hobby3_url",
      hobby4: "hobby4_url",
      pet1: "pet1_url",
      pet2: "pet2_url",
    };

    const columnName = columnMap[field];

    if (!columnName) {
      return NextResponse.json({ error: "Invalid field name" }, { status: 400 });
    }

    //    Use connection pool
    await pool.execute(`UPDATE future_self SET ${columnName} = NULL WHERE user_id = ?`, [user_id]);

    return NextResponse.json({ message: "Image deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("  Future-Self Image Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

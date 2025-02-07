import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY; 
    if (!apiKey) {
      return NextResponse.json({ error: "Missing NASA API key" }, { status: 500 });
    }

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch NASA APOD");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

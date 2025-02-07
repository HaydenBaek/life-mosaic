import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.API_NINJAS_KEY; 
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": apiKey },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    return NextResponse.json(data[0]); 
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

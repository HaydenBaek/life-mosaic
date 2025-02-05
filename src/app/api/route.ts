import { NextResponse, NextRequest } from "next/server";

//Practicing for response handling

// GET request handler
export async function GET(request: NextRequest) {
  const results = {
    message: "Hello World!",
  };

  return NextResponse.json(results);
}

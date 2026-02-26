import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    // Return a simple token (the password itself base64-encoded)
    const token = Buffer.from(password).toString("base64");
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

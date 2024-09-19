import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
 
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const response = NextResponse.json({ authenticated: true,token }, { status: 200 });

  return response;
}

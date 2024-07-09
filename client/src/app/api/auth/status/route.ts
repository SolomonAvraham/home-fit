import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(false, { status: 401 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    return NextResponse.json(false, { status: 401 });
  }
}

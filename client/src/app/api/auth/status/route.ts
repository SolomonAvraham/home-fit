import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.log("🚀 ~ GET ~ No token found in cookies");
      return NextResponse.json(false, { status: 401 });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("🚀 ~ GET ~ JWT_SECRET is not set");
      return NextResponse.json(false, { status: 500 }); // Internal Server Error
    }
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(false, { status: 401 });
  }
}

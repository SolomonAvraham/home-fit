import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  cookies().set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set("X-Need-Reload", "true");

  return response;
}

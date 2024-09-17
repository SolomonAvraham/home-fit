import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  cookies().set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json(true, { status: 201 });
}

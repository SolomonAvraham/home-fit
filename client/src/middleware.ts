import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const JWT_SECRET = process.env.JWT_SECRET;

  if (token && JWT_SECRET) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );

      return NextResponse.next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/test", "/admin/settings/:path*"],
};

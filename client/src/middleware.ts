import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const JWT_SECRET = process.env.JWT_SECRET;

  let response = NextResponse.next();

  if (token && JWT_SECRET) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );

      // Set auth_status cookie to authenticated
      response.cookies.set("auth_status", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    } catch (error) {
      console.error("JWT Verification Error middleware:", error);

      if ((error as any).code === "ERR_JWT_EXPIRED") {
        response = NextResponse.redirect(new URL("/auth/login", req.url));
        response.cookies.set("token", "", { expires: new Date(0) });
      } else {
        response = NextResponse.redirect(new URL("/auth/login", req.url));
      }

      response.cookies.set("auth_status", "unauthenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }
  } else {
    console.log("middleware No token found");
    response = NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.set("auth_status", "unauthenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

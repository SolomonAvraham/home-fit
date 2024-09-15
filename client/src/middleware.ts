import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";

export async function middleware(req: NextRequest) {
  const testing = await axios.get("/api", {
    withCredentials: true,
  });
  console.log("🚀 ~ middleware ~ testing:", testing);

  console.log("🚀 ~ middleware ~ req:", req);
  const token = req.cookies.get("token")?.value;

  console.log("🚀 ~ middleware ~ token:", token);

  const a = req.headers;
  console.log("🚀 ~ middleware ~ a:", a);

  const aa = req.cookies.getAll();
  console.log("🚀 ~ middleware ~ aa:", aa);

  const JWT_SECRET = process.env.JWT_SECRET;
  console.log("🚀 ~ middleware ~ JWT_SECRET:", JWT_SECRET);

  let response = NextResponse.next();

  if (token && JWT_SECRET) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );

      response.cookies.set("auth_status", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    } catch (error) {
      console.error("JWT Verification Error middleware:", error);
      const currentPath = req.nextUrl.pathname;

      if ((error as any).code === "ERR_JWT_EXPIRED") {
        response = NextResponse.redirect(new URL("/auth/login", req.url));
        response.cookies.set("token", "", { expires: new Date(0) });
      } else {
        response = NextResponse.redirect(new URL("/auth/login", req.url));
      }

      response.cookies.set("lastVisitedPath", currentPath, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
      });

      response.cookies.set("auth_status", "unauthenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }
  } else {
    console.log("middleware No token found");

    const currentPath = req.nextUrl.pathname;

    response = NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.set("lastVisitedPath", currentPath, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });

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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authStatus = req.cookies.get("auth_status")?.value;

  if (authStatus !== "authenticated" || authStatus === undefined) {
    redirectToLogin(req);
    return;
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", req.url));
  response.cookies.set("lastVisitedPath", req.nextUrl.pathname, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  response.cookies.set("auth_status", "unauthenticated", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

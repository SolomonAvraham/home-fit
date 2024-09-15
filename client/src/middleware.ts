import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const authStatus = req.cookies.get("auth_status")?.value;
  console.log("🚀 ~ middleware ~ authStatus:", authStatus);

  if (authStatus !== "authenticated") {
    return redirectToLogin(req);
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
  });
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

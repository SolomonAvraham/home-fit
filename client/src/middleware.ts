import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware triggered for path:", req.nextUrl.pathname);
  console.log("All cookies:", req.cookies.getAll());
  
  const authStatus = req.cookies.get("auth_status")?.value;

  console.log("Auth status:", authStatus); // Add this for debugging

  if (authStatus !== "authenticated") {
    console.log("Redirecting to login"); // Add this for debugging
    return redirectToLogin(req);
  }

  console.log("Access granted"); // Add this for debugging
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/auth/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);

  response.cookies.set("lastVisitedPath", req.nextUrl.pathname, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  response.cookies.delete("auth_status"); // Change this line

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

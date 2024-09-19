import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token || !JWT_SECRET) {
    return redirectToLogin(req);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return handleAuthError(req, error);
  }
}

function redirectToLogin(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", req.url));
  setLastVisitedPath(req, response);
  return response;
}

function handleAuthError(req: NextRequest, error: unknown) {
  const response = NextResponse.redirect(new URL("/auth/login", req.url));

  if ((error as any).code === "ERR_JWT_EXPIRED") {
    response.cookies.set("token", "", { expires: new Date(0) });
  }

  setLastVisitedPath(req, response);
  return response;
}

function setLastVisitedPath(req: NextRequest, response: NextResponse) {
  const currentPath = req.nextUrl.pathname;
  response.cookies.set("lastVisitedPath", currentPath, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

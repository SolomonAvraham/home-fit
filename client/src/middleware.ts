import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import axiosInstance from "./utils/axiosInstance";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const JWT_SECRET = process.env.JWT_SECRET;

//   let response = NextResponse.next();

//   if (token && JWT_SECRET) {
//     try {
//       const { payload } = await jwtVerify(
//         token,
//         new TextEncoder().encode(JWT_SECRET)
//       );

//       response.cookies.set("auth_status", "authenticated", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       });

//       return response;
//     } catch (error) {
//       console.error("JWT Verification Error middleware:", error);
//       const currentPath = req.nextUrl.pathname;

//       if ((error as any).code === "ERR_JWT_EXPIRED") {
//         response = NextResponse.redirect(new URL("/auth/login", req.url));
//         response.cookies.set("token", "", { expires: new Date(0) });
//       } else {
//         response = NextResponse.redirect(new URL("/auth/login", req.url));
//       }

//       response.cookies.set("lastVisitedPath", currentPath, {
//         httpOnly: false,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60,
//       });

//       response.cookies.set("auth_status", "unauthenticated", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       });

//       return response;
//     }
//   } else {
//     console.log("middleware No token found");

//     const currentPath = req.nextUrl.pathname;

//     response = NextResponse.redirect(new URL("/auth/login", req.url));

//     response.cookies.set("lastVisitedPath", currentPath, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60,
//     });

//     response.cookies.set("auth_status", "unauthenticated", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     return response;
//   }
// }

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();

  try {
    // Make a request to your Express API to check authentication status
    const authCheckResponse = await axiosInstance.get("/api");
    console.log("🚀 ~ middleware ~ authCheckResponse:", authCheckResponse)

    if (authCheckResponse.data) {
      response.cookies.set("auth_status", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    } else {
      throw new Error("User is not authenticated");
    }
  } catch (error) {
    console.error("Authentication Error in middleware:", error);
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

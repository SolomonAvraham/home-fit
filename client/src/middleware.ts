import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseURL } from "./utils/axiosInstance";

export async function middleware(req: NextRequest) {
  const axios = require("axios");

  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  try {
    //const response = await axiosInstance.get("/api/verifyToken");
    const response = await fetch(`${process.env.BASE_URL}/api/verifyToken`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include the token in the request
    });
    console.log("🚀 ~ middleware ~ response:", response);

    if (!response.ok) {
      throw new Error(`Failed to verify token: ${response.status}`);
    }

    const isTokenValid = await response.json();
    console.log("🚀 Token Verification Response:", isTokenValid);

    if (isTokenValid === true) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL("/auth/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    const loginUrl = new URL("/auth/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseURL } from "./utils/axiosInstance";

export async function middleware(request: NextRequest) {
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
    const response = await axiosInstance.get("/api/verifyToken");

    const isTokenValid = response.data;

    if (isTokenValid === true) {
      return NextResponse.next();
    } else {
      return new NextResponse("token not found", { status: 401 });
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return new NextResponse("token not found", { status: 401 });
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};

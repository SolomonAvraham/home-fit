import { NextResponse, NextRequest } from "next/server";
import { login } from "@/services/authService";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await login({ email, password });

    if (response.status === 200 && response.data.token) {
      const token = response.data.token;

       const nextResponse = NextResponse.json(response.data, { status: 200 });

       nextResponse.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return nextResponse;
    } else {
      return NextResponse.json("Authentication failed", { status: 401 });
    }
  } catch (error: any) {
    console.error("Error in login route:", error);

    const errorMessage =
      error.response?.data?.message || "An error occurred during login";
    const errorStatus = error.response?.status || 500;

    return NextResponse.json(errorMessage, { status: errorStatus });
  }
}

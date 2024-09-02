import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAuthStatus() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    if (typeof window !== "undefined") {
      redirectToLogin();
    }
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      if (typeof window !== "undefined") {
        handleTokenExpiry();
      }
      return false;
    }

    return true;
  } catch (error: unknown) {
    console.error("JWT Verification Error auth:", error);
    if (typeof window !== "undefined") {
      handleTokenExpiry();
    }
    return false;
  }
}

function handleTokenExpiry() {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    document.cookie = `lastVisitedPath=${currentPath}; path=/; max-age=3600; Secure; SameSite=Strict`;
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
  }
  redirectToLogin();
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}

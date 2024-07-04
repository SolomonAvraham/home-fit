import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAuthStatus() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return false;
  }

  try {
    await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return true;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return false;
  }
}

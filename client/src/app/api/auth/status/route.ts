import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//       console.log("🚀 ~ GET ~ No token found in cookies");
//       return NextResponse.json(false, { status: 401 });
//     }
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       console.log("🚀 ~ GET ~ JWT_SECRET is not set");
//       return NextResponse.json(false, { status: 500 }); // Internal Server Error
//     }
//     await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//     return NextResponse.json(true, { status: 200 });
//   } catch (error) {
//     console.log("🚀 ~ GET ~ error:", error);
//     return NextResponse.json(false, { status: 401 });
//   }
// }


 
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const secret = process.env.JWT_SECRET;

    // Prepare debug information
    const debugInfo = JSON.stringify({
      tokenExists: !!token,
      secretExists: !!secret,
      headers: Object.fromEntries(req.headers),
      cookies: req.cookies.getAll(),
    });

    if (!token) {
      console.log("No token found in cookies");
      return NextResponse.json(false, {
        status: 401,
        headers: { "X-Debug-Info": debugInfo },
      });
    }

    if (!secret) {
      console.log("JWT_SECRET is not set");
      return NextResponse.json(false, {
        status: 500,
        headers: { "X-Debug-Info": debugInfo },
      });
    }

    await jwtVerify(token, new TextEncoder().encode(secret));

    return NextResponse.json(true, {
      status: 200,
      headers: { "X-Debug-Info": debugInfo },
    });
  } catch (error:any) {
    console.error("Detailed error:", error);

    const debugInfo = JSON.stringify({
      error: error.message,
      stack: error.stack,
    });

    return NextResponse.json(false, {
      status: 401,
      headers: { "X-Debug-Info": debugInfo },
    });
  }
}
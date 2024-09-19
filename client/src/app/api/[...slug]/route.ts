// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { baseURL } from "@/utils/axiosInstance";

// const API_BASE_URL = baseURL;

// const uuidPattern =
//   /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string[] } }
// ) {
//   const slugArray = params.slug;
//   console.log("🚀 ~ Slug Array:", slugArray);

//   // Check if the last part of the slug array is a UUID
//   const lastSlug = slugArray[slugArray.length - 1];
//   const isUUID = uuidPattern.test(lastSlug);

//   if (isUUID) {
//     console.log("🚀 ~ UUID detected:", lastSlug);
//     // Handle the request with the UUID in the URL
//    } else {
//     console.log("🚀 ~ No UUID detected",{
//       message: `You accessed /api/${slugArray.join("/")}`,
//     });
//  }
//     return handleRequest(request, params.slug);
  
// }

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { slug: string[] } }
// ) {
//   return handleRequest(request, params.slug);
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { slug: string[] } }
// ) {
//   return handleRequest(request, params.slug);
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { slug: string[] } }
// ) {
//   return handleRequest(request, params.slug);
// }

// async function handleRequest(request: NextRequest, slugs: string[]) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const apiPath = "/" + slugs.join("/");
//   console.log("🚀 ~ handleRequest ~ apiPath:", apiPath)
//   const url = `${API_BASE_URL}${apiPath}${request.nextUrl.search}`;

//   console.log("🚀 ~ handleRequest ~ url:", url)
//   const headers = new Headers(request.headers);
//   headers.set("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch(url, {
//       method: request.method,
//       headers: headers,
//       body: request.bodyUsed ? await request.blob() : null,
//     });

//     const data = await response.json();

//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     console.error("API Proxy Error:", error);
//     return NextResponse.json({ message: "An error occurred",error }, { status: 500 });
//   }
// }

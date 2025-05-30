import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes
const protectedRoutes = [
  "/categories",
  "/profile",
  "/contact",
  "/my-products",
  "/dakesh",
  "/admin/dashboard",
  "/admin/users",
  "/admin/products",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Encode the original path into a query param
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/categories/:path*",
    "/profile",
    "/contact",
    "/my-products",
    "/dakesh",
    "/admin/dashboard",
    "/admin/users",
    "/admin/products",
  ],
};

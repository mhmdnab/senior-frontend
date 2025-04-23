import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes
const protectedRoutes = ["/categories", "/profile", "/products", "/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Encode the original path into a query param
    const registerUrl = new URL("/register", request.url);
    registerUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/categories/:path*",
    "/profile/:path*",
    "/products/:path*",
    "/contact/:path*",
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token");

  const isLoggedIn = !!sessionCookie;

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/staff") ||
    pathname.startsWith("/user");

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/signIn", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/user/:path*",
  ],
};
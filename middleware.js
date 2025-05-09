import { NextResponse } from "next/server";

export function middleware(req) {
  const jwt = req.cookies.get("jwt");
  const url = req.nextUrl.pathname;

  if (
    !jwt?.value?.length > 0 &&
    (url.startsWith("/settings") || url.startsWith("/tracker") || url.startsWith("/tracklist"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/account-recovery/:path*",
    "/settings/:path*",
    "/tracker/:path*",
    "/tracklist/:path*",
  ],
};

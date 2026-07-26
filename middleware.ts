import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes, except /admin/login
  if (path.startsWith("/admin")) {
    const session = request.cookies.get("xyrm_admin_session")?.value;
    const expectedToken = process.env.ADMIN_SESSION_TOKEN || "xyrm_secure_session_token_2026_f4d9b3a0e1c2";

    if (path === "/admin/login") {
      // If already logged in, redirect from login page to admin dashboard
      if (session === expectedToken) {
        const adminUrl = new URL("/admin", request.url);
        return NextResponse.redirect(adminUrl);
      }
    } else {
      // If not logged in, redirect to login page
      if (session !== expectedToken) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all paths starting with /admin
  matcher: ["/admin/:path*"],
};

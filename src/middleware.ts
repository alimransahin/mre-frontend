import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getActiveUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/signup"];
const logoutPath = "/logout"; // Define the logout path

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/profile/],
  admin: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === logoutPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const user = await getActiveUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    "/login",
    "/signup",
    "/logout",
  ],
};

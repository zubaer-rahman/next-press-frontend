import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./service/getNewAccessToken";
import { getSubscriptionStatus } from "./app/(public)/_actions/getSubscriptionStatus";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news", "/premium"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();
  let accessToken = request.cookies.get("accessToken")?.value!;
  const refeshToken = cookieStore.get("refreshToken")?.value;
  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;
  const decodedRefreshToken = refeshToken
    ? jwtUtils.verifyToken(
        refeshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      accessToken = newAccessToken!;
      decodedAccessToken = accessToken
        ? jwtUtils.verifyToken(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string,
          )
        : null;
    }
  }

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  let userRole = null;
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER")
      return NextResponse.redirect(new URL("/dashboard", request.url));
    else if (userRole === "AUTHOR")
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    else if (userRole === "ADMIN")
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => route === pathname || pathname.startsWith(route + "/"),
  );
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => route === pathname || pathname.startsWith(route + "/"),
  );

  if (!accessToken && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  if (pathname === "/premium") {
    const subscriptionStatus = await getSubscriptionStatus();

    const isActive = Boolean(
      subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed,
    );
    if (!isActive) {
      return NextResponse.redirect(new URL("/payment", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};

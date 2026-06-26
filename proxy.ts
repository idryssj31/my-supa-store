import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Role } from "@prisma/client";
import {
  AB_COOKIE,
  AB_COOKIE_OPTIONS,
  isAbVariant,
  type AbVariant,
} from "@/lib/ab/constants";

function pickAbVariant(request: NextRequest): AbVariant {
  const existing = request.cookies.get(AB_COOKIE)?.value;

  if (isAbVariant(existing)) {
    return existing;
  }

  return Math.random() < 0.5 ? "A" : "B";
}

function setAbCookie(response: NextResponse, variant: AbVariant): NextResponse {
  response.cookies.set(AB_COOKIE, variant, AB_COOKIE_OPTIONS);
  return response;
}

export async function proxy(request: NextRequest) {
  const override = request.nextUrl.searchParams.get("ab_variant");

  if (isAbVariant(override)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("ab_variant");

    return setAbCookie(NextResponse.redirect(url), override);
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const role = token?.role as Role | undefined;

    if (role !== "ADMIN") {
      const response = NextResponse.redirect(new URL("/", request.url));

      if (!isAbVariant(request.cookies.get(AB_COOKIE)?.value)) {
        return setAbCookie(response, pickAbVariant(request));
      }

      return response;
    }
  }

  if (isAbVariant(request.cookies.get(AB_COOKIE)?.value)) {
    return NextResponse.next();
  }

  return setAbCookie(NextResponse.next(), pickAbVariant(request));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

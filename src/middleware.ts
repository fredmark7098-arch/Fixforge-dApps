import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Ensures dev always emits middleware-manifest.json; no logic (static export has no edge at runtime). */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};

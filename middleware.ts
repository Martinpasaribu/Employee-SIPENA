// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/login", "/register"];
  const { pathname } = req.nextUrl;

  // Halaman publik
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token")?.value;

  // Tidak ada access token → login
  if (!accessToken) {
    return redirectToLogin(req);
  }

  // Cek token expired
  let isExpired = false;
  try {
    const decoded = jwt.decode(accessToken) as { exp?: number };
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      isExpired = true;
    }
  } catch {
    isExpired = true;
  }

  if (isExpired) {
    // Coba refresh token
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
      method: "GET",
      credentials: "include", // penting: kirim refreshToken cookie
      headers: {
        Cookie: req.cookies.toString(), // kirim semua cookie
      },
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();

      // Simpan access token baru di cookie
      const res = NextResponse.next();
      res.cookies.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return res;
    }

    // Refresh gagal → login
    return redirectToLogin(req);
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("session", "expired");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

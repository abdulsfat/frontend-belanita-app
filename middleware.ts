import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isProtectedPage = ["/profile", "/dashboard"].some((path) =>
        pathname.startsWith(path)
    );

    // ⛔ Belum login, tapi akses halaman protected
    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Sudah login, tapi akses halaman login/register
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // ⛔ Kalau user biasa coba akses dashboard
    if (pathname.startsWith("/dashboard") && role !== "admin") {
        return NextResponse.redirect(new URL("/not-found", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/profile",
        "/dashboard/:path*",
    ],
};

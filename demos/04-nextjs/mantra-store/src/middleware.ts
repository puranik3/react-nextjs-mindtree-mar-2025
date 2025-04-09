// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Add a matcher to control where the middleware will run (it runs for these matching routes only)
// export const config = {
//     matcher: ["/cart/:path*", "/auth/:path*", "/profile/:path*"],
// };

export async function middleware(request: NextRequest) {
    // getToken() extracts the JWT from cookies (managed by next-auth)
    // It lets you know if a user is logged in and optionally gives you role info
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isCartPage = request.nextUrl.pathname.startsWith("/cart");
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

    console.log("\n---");
    console.log("Middleware running. Path is", request.nextUrl.pathname);
    console.log("Token is", token);
    console.log("isCartPage", isCartPage);
    console.log("isAuthPage", isAuthPage);
    console.log("Request URL", request.url);
    console.log("---\n");

    // If user is not logged in and trying to access protected route
    if (!token && isCartPage) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    // If user is logged in and tries to access login page
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/products", request.url));
    }

    return NextResponse.next();
}

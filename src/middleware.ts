import { NextRequest, NextResponse } from "next/server";
import { GetSession } from "./utils/session";
import { APP_ROUTES, IsPublicRoute } from "./utils/config";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.icon).*)'
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const session = await GetSession();
    const isPublic = IsPublicRoute(path);
    if (isPublic || (session !== undefined && !isPublic)) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(APP_ROUTES.public.authentication, req.url));
}
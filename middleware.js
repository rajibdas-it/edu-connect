import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLICS_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig)



export default auth((req) => {
    const { nextUrl } = req
    const isAuthenticate = !!req.auth


    const isPublicRoute = (
        PUBLICS_ROUTES.find((route) => nextUrl.pathname.startsWith(route))
        || nextUrl.pathname === ROOT)

    console.log("Current Path", nextUrl.pathname);
    console.log("Public Route", isPublicRoute);
    if (!isAuthenticate && !isPublicRoute) {
        return Response.redirect(new URL(LOGIN, nextUrl))
    }
})


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


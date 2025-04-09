import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'


import { NextResponse } from 'next/server'


const publicRoutes = createRouteMatcher([
    "/",
    "/api/webhook/register",
    "/sign-up",
    "/sign-in",
])


export default clerkMiddleware(async (auth, request) => {
    try {
        const { userId } = await auth()
        if (!publicRoutes(request) && !userId) {
            return NextResponse.redirect(new URL("/sign-in", request.url))
        }
        const client = await clerkClient()

        if (userId) {
            const user = await client.users.getUser(userId)
            const role = user.publicMetadata.role as string | undefined

            //admin role redirection
            if (role === "admin" && request.nextUrl.pathname === "/dashboard") {
                return NextResponse.redirect(new URL("/admin/dashboard", request.url))
            }

            // prevent non admin user to access the admin routes
            if (role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/dashboard", request.url))
            }

            //redirect auth user trying to access public routes
            if (publicRoutes.includes(request.nextUrl.pathname)) {
                return NextResponse.redirect(
                    new URL(
                        role === "admin" ? "/admin/dashboard" : "/dashboard",
                        request.url
                    )
                )
            }
        }
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL("/errro", request.url))
    }

}
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
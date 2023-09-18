// middleware to detect subdomain and log it to the console

import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

const test = process.env.VERCEL_ENV == "development" ? "editor.vaquero.dev" : null;

function resolveHost (request) {
    const requestHeaders = new Headers(request.headers);
    const host = test ? test : requestHeaders.get('host');

    const computeFragments = host.split('.').reverse().slice(2);

    if (host.startsWith('[::1]')) return { scope: 'internal', site: 'root' }

    if (host.endsWith('.vaquero.dev')) {
        if (computeFragments.length == 1) {
            const [subdomain] = computeFragments;

            if (subdomain == 'api') return { scope: 'internal', site: 'api' }

            if (subdomain == 'editor') return { scope: 'internal', site: 'editor' }

            return { scope: 'project', project: subdomain }
        } else if (computeFragments.length == 2) {
            const [project, user] = computeFragments;

            return { scope: 'user', project, user }
        } else {
            return { scope: 'error' }
        }
    }

    if (host == 'vaquero.dev') return { scope: 'internal', site: 'root' }

    return { scope: 'error' }
}

function getProjectFile (path, project, user) {
    return ['<p>hi</p>', {
        status: 200,
        headers: {
            'Content-Type': 'text/html'
        }
    }];
}

export default function middleware (request) {
    const { scope, ...host } = resolveHost(request);

    if (scope == 'internal' && host.site == 'api') {
        return NextResponse.rewrite(
            new URL('/api' + request.nextUrl.pathname, request.url)
        );
    }

    if (scope == 'internal' && host.site == 'editor') {
        return authMiddleware({
            publicRoutes: ['/code', '/', '/sign-in', '/sign-up', '/sign-out', '/sign-in/[[...index]]', '/sign-up/[[...index]]', '/sign-out/[[...index]]', '/sign-in/sso-callback', '/sign-up/sso-callback', '/sign-up/continue'],
            afterAuth(auth, req, evt) {
                console.log({ auth, req, evt });
                // handle users who aren't authenticated
                if (!auth.userId && !auth.isPublicRoute) {
                    return NextResponse.redirect(request.nextUrl.origin + '/sign-in?next=' + encodeURIComponent(req.url));
                }

                return NextResponse.rewrite(
                    new URL('/editor' + request.nextUrl.pathname, request.url)
                );
            }
        })(request);
    }

    if (scope == 'project' || scope == 'user') {
        const [path] = request.url.split('?');

        const [body, response] = getProjectFile(path, host.project, host.user);

        return new NextResponse(body, response);
    }
} // middleware to detect subdomain and log it to the console

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"]
}

 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({});
 
// export const config = {
//       matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
 
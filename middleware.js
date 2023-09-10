// middleware to detect subdomain and log it to the console

import { NextResponse } from "next/server";

const test = null;

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
        return NextResponse.rewrite('/api' + request.url);
    }

    if (scope == 'project' || scope == 'user') {
        const [path] = request.url.split('?');

        const [body, response] = getProjectFile(path, host.project, host.user);

        return new NextResponse(body, response);
    }
} // middleware to detect subdomain and log it to the console

export const config = {
    matcher: '/:path*',
}
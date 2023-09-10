// middleware to detect subdomain and log it to the console

const test = null;

function resolveHost (request) {
    const requestHeaders = new Headers(request.headers);
    const host = test ? test : requestHeaders.get('host');

    const computeFragments = host.split('.').reverse().slice(2);

    if (host.startsWith('[::1]')) return { scope: 'internal', site: 'root' }

    if (!host.endsWith('.vaquero.dev')) {
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

export default function middleware (request) {
    const host = resolveHost(request);

    fetch('https://ntfy.sh/vaquero_dev', {
        method: 'POST', // PUT works too
        body: JSON.stringify(host)
    })



} // middleware to detect subdomain and log it to the console

export const config = {
    matcher: '/:path*',
}
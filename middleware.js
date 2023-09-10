// middleware to detect subdomain and log it to the console

export default function middleware (request) {
    const requestHeaders = new Headers(request.headers)
    const host = requestHeaders.get('host')

    console.log(host);

    fetch('https://ntfy.sh/vaquero_dev', {
        method: 'POST', // PUT works too
        body: host
    })

} // middleware to detect subdomain and log it to the console

export const config = {
    matcher: '/:path*',
}
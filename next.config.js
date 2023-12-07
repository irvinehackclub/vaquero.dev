/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/remind",
      destination: "https://www.remind.com/join/ihs-hack",
      permanent: true
    }
  ],
  rewrites: async () => [
    {
      source: "/editor/__exec/:path*",
      destination: "http://emkc.org/:path*",
    },
  ]
}

module.exports = nextConfig

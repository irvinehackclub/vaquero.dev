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
      source: "/editor/__exec/api/v2/piston/execute/",
      destination: "http://emkc.org/api/v2/piston/execute/",
    },
  ]
}

module.exports = nextConfig

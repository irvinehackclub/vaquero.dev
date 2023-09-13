/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: [
    {
      source: "/remind",
      destination: "https://www.remind.com/join/ihs-hack",
      permanent: true
    }
  ]
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/remind",
      destination: "https://www.remind.com/join/ihs-hack",
      permanent: true
    },
    {
      source: "/discord",
      destination: "https://discord.gg/RcJpnuTDj6",
      permanent: true
    }
  ]
}

module.exports = nextConfig

import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { CssBaseline, GeistProvider } from '@geist-ui/core'

export default function App({ Component, pageProps }) {
  return <>
    <ClerkProvider>
      <GeistProvider themeType="dark">
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </ClerkProvider>
  </>
}

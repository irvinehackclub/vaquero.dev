import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
    <ClerkProvider>
      <GeistProvider themeType="dark">
        <CssBaseline />
        <Head>
          <link rel="favicon" href="/favicon.png" />
          <link rel="icon" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </GeistProvider>
    </ClerkProvider>
  </>
}

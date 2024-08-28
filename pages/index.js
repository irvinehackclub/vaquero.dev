import Inter from '@/components/Inter'
import { Button } from '@geist-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'




export default function Home() {
  return (
    <Inter>
      <Head>
        <title>Vaquero.dev</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <img src="/favicon.png" style={{
            height: "100px"
          }} />
          <h1>vaquero.dev</h1>
          <h2>Code Editor & Hosting</h2>

          <div style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem"
          }}>
            <Link href="https://editor.vaquero.dev">
              <Button type="secondary-light">
                Get Started
              </Button>
            </Link>


            <Link href="/about">
              <Button ghost type="secondary-light">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Inter>
  )
}

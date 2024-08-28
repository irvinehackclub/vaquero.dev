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
        <title>About vaquero.dev</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style dangerouslySetInnerHTML={{ __html: /*css*/`
            body {
                width: 100vw;
                height: 100vh;
                background: url("https://cloud-8lj4t1m8o-hack-club-bot.vercel.app/0image__45_-min__1_.png");
                background-size: cover;
            }

            div#main { /* page */
                background: white;
                width: min(calc(100vw - 100px), 1000px);
                min-height: calc(100vh - 100px);
                border-radius: 16px 16px 0px 0px;
                padding: 48px 56px;
                box-sizing: border-box;
                color: black;
            }

            div#main h1 {
                text-align: center;
            }
        ` }} />
      </Head>
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'end'
      }}>
        <div id="main">
          <h2>About vaquero.dev</h2>
          <p>vaquero.dev is a code editor and hosting platform built specifically for students. We realized that there weren't many alternatives out there, and the ones that existed were all paid services. Our platform is not affiliated with Irvine High School or Irvine Unified School District.</p>

          <h2 style={{ marginTop: "2rem" }}>Privacy & security</h2>
          <p>Because vaquero.dev handles student data, we have strict policies regarding privacy and security. You can learn more about these by reading our <Link href="/privacy">Privacy Policy</Link>.</p>

        </div>
      </div>
    </Inter>
  )
}

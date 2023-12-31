import Inter from '@/components/Inter'
import { Button } from '@geist-ui/core'
import Head from 'next/head'
import Image from 'next/image'
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
                padding: 64px 100px;
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
          <h1>About vaquero.dev</h1>
          <p>vaquero.dev is a code editor built specifically for members of Irvine Hack Club. We realized that while there were other out there, like Replit, they lacked a lot of useful features and typically had a ton of bloat. For example, members of our club would frequently attempt to write a line of code, only to see an incorrect AI suggestion, which discouraged many of our members.</p>
          <h2>Code Editor & Runner</h2>
          <p>for Irvine Hack Club</p>
          <a href="https://editor.vaquero.dev">
            <Button type="secondary-light">
              Launch Editor
            </Button>
          </a>
        </div>
      </div>
    </Inter>
  )
}

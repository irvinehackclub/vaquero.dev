import {dark, neobrutalism} from "@clerk/themes";
import Inter from '@/components/Inter'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Breadcrumbs, Button, Dot, Page, Select } from '@geist-ui/core'
import { Inbox, Home as HomeIcon } from '@geist-ui/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Editor, { Monaco } from "@monaco-editor/react";
import CodeExec from 'code-exec'

import Split from "react-split"

export function Navbar ({ children, breadcrumbs }) {
  return (
    <nav style={{
      width: '100%',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: '0px 32px',
      background: '#000',
      boxShadow: 'inset 0 -1px 0 0 hsla(0,0%,100%,.1)'
    }}>

      <Breadcrumbs>
        <Breadcrumbs.Item href="/dashboard"><HomeIcon /></Breadcrumbs.Item>
        {breadcrumbs}
        {/* <Breadcrumbs.Item href=""><Inbox /> Inbox</Breadcrumbs.Item>
        <Breadcrumbs.Item>Page</Breadcrumbs.Item> */}
      </Breadcrumbs>
{children}
      <div>
        <ClerkLoaded>
          <UserButton signInUrl="/sign-in" signUpUrl="/sign-up" userProfileMode="modal" afterSignOutUrl="/" appearance={dark} />
        </ClerkLoaded>
      </div>

    </nav>
  )
}

export function Code ({ defaultValue, onChange, language = 'javascript' }) {
  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    console.log("editor mounted", editor, monaco);
    editorRef.current = editor;
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Victor+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark"
        options={{
          fontFamily: '"Victor Mono"',
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
        }}
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        onChange={onChange}
      />
    </>
  )
}

export default function Home() {
  const [code, setCode] = useState(`// Vaquero IDE\n// NodeJS v18.15.0"`);

  const languages = {
    javascript: {
      name: 'JavaScript',
      editor: 'javascript',
      entryPoint: 'index.js',
      runtime: 'node-js'
    },
    typescript: {
      name: 'TypeScript',
      editor: 'typescript',
      entryPoint: 'index.ts',
      runtime: 'deno-ts',
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
    },
    python: {
      name: 'Python',
      editor: 'python',
      entryPoint: 'main.py',
      runtime: 'python3'
    },
    bash: {
      name: 'Bash',
      editor: 'bash',
      entryPoint: 'script.sh',
      runtime: 'sh',
      icon: "https://cloud-t3lu41126-hack-club-bot.vercel.app/0bash_dark-1331550886960171470.png"
    },
    java: {
      name: "Java",
      editor: 'java',
      entryPoint: "Main.java",
      runtime: "java"
    },
    ruby: {
      name: "Ruby",
      editor: "ruby",
      entryPoint: "main.rb",
      runtime: "ruby"
    }
  }

  const [languageString, setLanguageString] = useState('javascript');

  const language = languages[languageString];

  const [running, setRunning] = useState(false);

  const [output, setOutput] = useState(`Code output will be displayed here.\n\nPress "Run" to execute code.`);
  const [runStatus, setRunStatus] = useState({
    type: 'default', // "default" | "secondary" | "success" | "warning" | "error"
    name: "Ready"
  });


  async function run () {
    setRunning(true);
    setRunStatus({
      type: 'secondary',
      name: 'Running...'
    });
    setOutput('');
    const start = Date.now();

    let result;
    try {
      result = await CodeExec.with(language.runtime).run(
        new CodeExec.File(language.entryPoint, code)
      );
    } catch (err) {
      const elapsed = Date.now() - start;
      const time = elapsed >= 1000 ? `${Math.round(elapsed * 10) / 100}s` : `${elapsed}ms`;

      setOutput(`Failed due to an internal error after ${Date.now() - start}ms\n\n${err}`);
      setRunStatus({
        type: "error",
        name: `Failed after ${time}`
      });
      setRunning(false);
      return;
    }

    const elapsed = Date.now() - start;
    const time = elapsed >= 1000 ? `${Math.round(elapsed / 10) / 100}s` : `${elapsed}ms`;

    setOutput(result.output);

    if (result.code !== 0) {
      setRunStatus({
        type: "error",
        name: `Errored after ${time}`
      })
    } else if (result.stderr.trim().length && !result.stdout.trim().length) {
      setRunStatus({
        type: 'warning',
        name: `Finished in ${time}`
      });
    } else {
      setRunStatus({
        type: 'success',
        name: `Finished in ${time}`
      });
    }

    setRunning(false);
  }

  return (
    <Inter>
      <Head>
        <title>Vaquero IDE</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{`
        body {
          overflow-y: hidden;
        }
      `}</style>
      <Navbar breadcrumbs={[
        <Breadcrumbs.Item href="/code">Editor</Breadcrumbs.Item>
      ]}>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <Button onClick={run} loading={running} disabled={running} type="success" color="#00db75" className={"run-button" + (running ? " run-button-running" : "")}>Run</Button>

          <Select style={{ height: '40px' }} value={languageString} onChange={setLanguageString}>
            {Object.entries(languages).map(([language, { name }]) => (
              <Select.Option value={language}>{name}</Select.Option>
            ))}
          </Select>

        </div>
      </Navbar>

<Split
    className="split"
    style={{
      height: "calc(100vh - 64px)"
    }}
    gutterSize={8}
    snapOffset={20}
    minSize={400}
>
    <div style={{
      height: '100%'
    }}>
      <Code defaultValue={`// Vaquero IDE\n// NodeJS v18.15.0`} onChange={setCode} language={language.editor} />

    </div>
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
            <pre style={{
              flexGrow: '1',
              margin: '0px',
              borderRadius: '0px',
              whiteSpace: 'pre-wrap'
            }} className="code-output">{output}</pre>

      <div style={{
        height: '32px',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 8px',
        userSelect: 'none',
      }}>
            <Dot type={runStatus.type} className="geist-dot">{runStatus.name}</Dot>
      <div style={{
        height: '100%',
        lineHeight: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }}>
        <div style={{
          height: '100%',
          padding: '4px',
          boxSizing: 'border-box',
        }}>
          <img style={{
            height: '100%',
            borderRadius: '4px',
          }} src={language.icon ?? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language.editor}/${language.editor}-original.svg`} />
        </div>
        {language.name}
      </div>
            </div>
    </div>
</Split>
    </Inter>
  )
}
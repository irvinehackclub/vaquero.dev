import {dark, neobrutalism} from "@clerk/themes";
import Inter from '@/components/Inter'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Breadcrumbs, Button, Dot, Input, Modal, Page, Select, useToasts } from '@geist-ui/core'
import { Inbox, Home as HomeIcon, ExternalLink, Edit, Edit2, Edit3, Settings } from '@geist-ui/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import CodeExec from 'code-exec'

import Split from "react-split"
import { languages } from "@/lib/languages";
import useInterval from "@/hooks/useInterval";

import { useDebounce } from 'usehooks-ts'

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

export function Code ({ value, defaultValue, onChange, language = 'javascript' }) {
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
      <MonacoEditor
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark"
        options={{
          fontFamily: '"Victor Mono"',
          fontSize: 14,
          scrollBeyondLastLine: true,
          wordWrap: 'on',
          
        }}
        value={value}
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        onChange={onChange}
      />
    </>
  )
}

export default function Editor ({ identifier, rename, previewUrl, explicitSave, load, save, showLanguageSwitcher = false, editorName }) {
  const [finishedLoadingAt, setFinishedLoadingAt] = useState(null);
  const loading = !finishedLoadingAt;

  const [code, setCode] = useState('');
  const [lastEditTimestamps, setLastEditTimestamps] = useState([]);
  const codeHasBeenEdited = () => {
    setLastEditTimestamps([...lastEditTimestamps, Date.now()]);
  }

  const debouncedCode = useDebounce(code, 1000);

  const [languageString, setLanguageString] = useState('javascript');
  const language = languages[languageString];

  const [renameModal, setRenameModal] = useState(false);
  const [newIdentifier, setNewIdentifier] = useState(identifier);

  const { setToast } = useToasts()

  useEffect(() => {
    async function loadEditor () {
      const { language, code } = await load();

      console.log('Loaded 1');

      setLanguageString(language);
      setCode(code);

      setFinishedLoadingAt(Date.now());
    }

    loadEditor();
  }, []);

  useEffect(() => {
    if (finishedLoadingAt && finishedLoadingAt < Date.now() - 500) save({
      language: languageString,
      code
    });
  }, [debouncedCode, finishedLoadingAt]);;

  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(`Code output will be displayed here.\n\nPress "Run" to execute code.`);
  const [runStatus, setRunStatus] = useState({
    type: 'default', // "default" | "secondary" | "success" | "warning" | "error"
    name: "Ready"
  });


  async function run () {
    if (language.customRuntime) {
      setRunning(true);
      setRunStatus({
        type: 'secondary',
        name: 'Running...'
      });
      setOutput(code);
      await new Promise(resolve => setTimeout(resolve, 250));
      setRunning(false);
      setRunStatus({
        type: "success",
        name: `Preview updated!`
      });
      return;
    }
    setRunning(true);
    setRunStatus({
      type: 'secondary',
      name: 'Running...'
    });
    setOutput('');
    const start = Date.now();

    let result;
    try {
      result = await CodeExec.with(language.runtime, "editor.vaquero.dev/__exec").run(
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

  const [currentLink, setCurrentLink] = useState('#');

  useEffect(() => {
    setCurrentLink(window.location.href);
  }, []);

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
        <Breadcrumbs.Item href={currentLink}>{editorName}</Breadcrumbs.Item>
      ]}>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          {identifier && rename && (
            <>
              <Button icon={<Settings />} onClick={() => {
                setRenameModal(true);
              }} auto />
              <Modal visible={renameModal} onClose={() => setRenameModal(false)}>
                <Modal.Title>Project Settings</Modal.Title>
                <Modal.Subtitle>Configure your project</Modal.Subtitle>
                <Modal.Content>
                  <Input width="100%" labelRight=".vaquero.dev" placeholder="Project Name" value={newIdentifier} onChange={e => setNewIdentifier(e.target.value.toLowerCase().split(' ').join('_').split('').filter(char => char.match(/[a-z0-9_]/)).join(''))}>
                    Project URL
                  </Input>
                </Modal.Content>
                <Modal.Action passive onClick={() => setRenameModal(false)}>Cancel</Modal.Action>
                <Modal.Action onClick={async () => {
                  const success = await rename(newIdentifier);
                  
                  if (success) {
                    setToast({ text: 'Your project has been renamed successfully!', type: 'success' })
                  } else {
                    setToast({ text: 'That name is taken!', type: 'error' })
                  }
                }} disabled={newIdentifier == identifier} passive={newIdentifier == identifier}>Save</Modal.Action>
              </Modal>
            </>
          )}
          <Button onClick={run} loading={running || loading} disabled={running || loading} type="success" color="#00db75" className={"run-button" + (running ? " run-button-running" : "")}>Run</Button>
          {showLanguageSwitcher &&
            <Select style={{ height: '40px' }} value={languageString} disabled={running || loading} onChange={setLanguageString}>
              {Object.entries(languages).map(([language, { name }]) => (
                <Select.Option value={language}>{name}</Select.Option>
              ))}
            </Select>
          }
          {explicitSave && <Button onClick={() => explicitSave({ code, language })} type="secondary" color="#00db75">Save</Button>}

        </div>
      </Navbar>
        <div style={{
          position: 'absolute',
          top: 'calc(50% - 32px)',
          left: 'calc(50%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: loading ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 1000000
        }}>
          <h2>Loading</h2>
        </div>
<Split
    className="split"
    style={{
      height: "calc(100vh - 64px)",
      filter: loading ? 'blur(3px)' : 'none',
      transition: 'filter 0.3s ease-in-out',
      pointerEvents: loading ? 'none' : undefined,
      userSelect: loading ? 'none' : undefined
    }}
    gutterSize={8}
    snapOffset={20}
    minSize={400}
>
    <div style={{
      height: '100%'
    }}>
      <Code value={code} onChange={value => {
        setCode(value);
      }} language={language.editor} />

    </div>
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {previewUrl && 
        <div style={{
          height: '32px',
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px',
          gap: '4px',
          boxSizing: 'border-box',
          userSelect: 'none',
        }}>
          <input value={previewUrl} readOnly style={{
            display: 'flex',
            flexGrow: '1',
            background: 'transparent',
            padding: '4px',
            boxSizing: 'border-box',
            height: '100%',
            border: '1px solid #222',
            borderRadius: '4px',
          }} />
          <Button height={"24px"} icon={<ExternalLink />} width={"24px"} onClick={() => {
            window.open(previewUrl, '_blank');
          }}></Button>
        </div>
      }
 
      {language.runtime &&
            <pre style={{
              flexGrow: '1',
              margin: '0px',
              borderRadius: '0px',
              whiteSpace: 'pre-wrap'
            }} className="code-output">{output}</pre>
          }

          {language.customRuntime && (() => {
            const CustomRuntime = language.customRuntime;
            return (
              <CustomRuntime style={{
                flexGrow: '1',
                margin: '0px',
                borderRadius: '0px',
                whiteSpace: 'pre-wrap'
              }} code={output} />
            )
          })()}

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
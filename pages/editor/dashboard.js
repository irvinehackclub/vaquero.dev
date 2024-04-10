import { getAuth } from "@clerk/nextjs/server";
import Inter from '@/components/Inter'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Breadcrumbs, Button, Card, Divider, Dot, Drawer, Fieldset, Grid, Input, Page, Select, Text } from '@geist-ui/core'
import { Inbox, Home as HomeIcon, PlusCircle } from '@geist-ui/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CodeExec from 'code-exec'

import { Navbar } from '@/components/Editor'
import { languages } from '@/lib/languages'
import prisma from "@/lib/prisma";

function Projects ({ projects }) {
    const [drawerState, setDrawerState] = useState(false);
    const [languageString, setLanguageString] = useState("javascript");
    const [type, setType] = useState("web");

    const formRef = useRef(null);


    return (
        <>

            <Drawer visible={drawerState} onClose={() => setDrawerState(false)} placement="right" style={{
                textAlign: 'left',
                maxWidth: '600px',
                width: 'calc(100vw - 64px)'
            }}>
                <h2 style={{ marginBottom: '0px' }}>Let's build something new.</h2>
                <p style={{ marginTop: '16px' }}>To create a new project, select a type, give it a name, and start coding!</p>
                <Drawer.Content>
                <form onSubmit={event => {
                    event.preventDefault();
                    return false;
                }} action="/api/projects/new" method="POST" ref={formRef}>
                    <Fieldset.Group value={type} onChange={setType}>
                    <Fieldset label="web">
                    <Fieldset.Title>Static Web Project</Fieldset.Title>
                    <Fieldset.Subtitle style={{ marginBottom: '16px' }}>Build a project with the web technologies of HTML, CSS, and JavaScript.</Fieldset.Subtitle>

                        <Input name="webName" placeholder="Personal Website">
                            Project Name
                        </Input>

                    <Fieldset.Footer>
                        Using HTML, CSS, and JavaScript
                        <Button onClick={() => formRef.current.submit()} auto scale={1/3} font="12px" type="success">Create</Button>
                    </Fieldset.Footer>
                    </Fieldset>
                    <Fieldset label="terminal">
                    <Fieldset.Title>Terminal Project</Fieldset.Title>
                    <Fieldset.Subtitle style={{ marginBottom: '16px' }}>Create a project using various programming languages that run in the terminal.</Fieldset.Subtitle>

                        <Input name="terminalName" placeholder="FizzBuzz Algorithm">
                            Project Name
                        </Input>
                        <br /><br />
                        <label style={{ marginBottom: '0.5em', display: 'inline-block' }}>
                            <Text small style={{ color: '#999999' }}>
                                Language
                                </Text>
                        </label>
                        <br />

                        <Select value={languageString} onChange={setLanguageString}>
                            {Object.entries(languages).map(([language, { name }]) => (
                            <Select.Option value={language}>{name}</Select.Option>
                            ))}
                        </Select>

                        <span style={{ display: 'none' }}>
                            <Input hidden style={{ display: 'none' }} name="terminalLanguage" value={languageString} />
                        </span>

                    <Fieldset.Footer>
                    Using {languages[languageString].name}
                        <Button onClick={() => formRef.current.submit()} auto scale={1/3} font="12px" type="success">Create</Button>
                    </Fieldset.Footer>
                    </Fieldset>
                    <Fieldset label="hosted">
                    <Fieldset.Title>Hosted Project</Fieldset.Title>
                    <Fieldset.Subtitle>Launching soon, hosted projects are a combination of web and terminal projects. They allow you to combine the frontend of web with the backend of terminal to build amazing applications.</Fieldset.Subtitle>
                    <Fieldset.Footer>
                        <span></span>
                        <Button disabled auto scale={1/3} font="12px" type="success">Coming Soon</Button>
                    </Fieldset.Footer>
                    </Fieldset>
                    </Fieldset.Group>
                    <span style={{ display: 'none' }}>
                        <Input hidden name="type" value={type} />
                    </span>

                </form>

                </Drawer.Content>
            </Drawer>

            <Grid.Container gap={3} className="projects">
                {projects.map(project => (
                    <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                        <a style={{ width: '100%' }} href={project.url}>
                            <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card">
                                <Fieldset.Title>{project.title}</Fieldset.Title>
                                <Fieldset.Subtitle>{languages[project.language].name}</Fieldset.Subtitle>
                            </Card>
                        </a>
                    </Grid>
                ))}
                <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card" onClick={() => setDrawerState(true)}>
                        <Card.Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0px', height: '100%' }}>
                            <PlusCircle size={32} />
                            <Text margin={0}>Create Project</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default function Home({ projects }) {
  return (
    <Inter>
      <Head>
        <title>Vaquero IDE</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{`
        .project-card {
            cursor: pointer;
        }

        .project-card:hover {
            border-color: white!important;
        }
      `}</style>
      <Navbar>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>


        </div>
      </Navbar>
        <style>{`
            body {
                background: #101010;
            }
        
        `}</style>
        <Page style={{
            background: '#101010'
        }}>
            <Page.Header>
                <h2>Dashboard</h2>
            </Page.Header>
            <h3>Your Projects</h3>
            <Projects projects={projects} />
        </Page>
    </Inter>
  )
}

export const getServerSideProps = async ({ req }) => {
    const auth = getAuth(req);

    const projects = await prisma.project.findMany({
        where: {
            ownerId: auth.userId
        }
    });

    return {
        props: {
            projects: projects.map(project => ({
                title: project.name,
                language: project.language,
                url: '/edit/' + project.identifier
            }))
        }
    }
}

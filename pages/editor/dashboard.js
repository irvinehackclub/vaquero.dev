import { getAuth, clerkClient } from "@clerk/nextjs/server";
import Inter from '@/components/Inter'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Breadcrumbs, Modal, Button, Card, Divider, Dot, Drawer, Fieldset, Grid, Input, Page, Select, Text, useToasts, Code } from '@geist-ui/core'
import { Inbox, Home as HomeIcon, PlusCircle, FilePlus, UserPlus } from '@geist-ui/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CodeExec from 'code-exec'

import { Navbar } from '@/components/Editor'
import { languages } from '@/lib/languages'
import prisma from "@/lib/prisma";
import { useRouter } from "next/router";
import Link from "next/link";
import app from "@/lib/app";

function Projects({ projects, drawerState, setDrawerState, projectName, setProjectName }) {
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
                                    <Button onClick={() => formRef.current.submit()} auto scale={1 / 3} font="12px" type="success">Create</Button>
                                </Fieldset.Footer>
                            </Fieldset>
                            <Fieldset label="terminal">
                                <Fieldset.Title>Terminal Project</Fieldset.Title>
                                <Fieldset.Subtitle style={{ marginBottom: '16px' }}>Create a project using various programming languages that run in the terminal.</Fieldset.Subtitle>

                                <Input name="terminalName" placeholder="FizzBuzz Algorithm" value={projectName} onChange={e => setProjectName(e.target.value)}>
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
                                    <Button onClick={() => formRef.current.submit()} auto scale={1 / 3} font="12px" type="success">Create</Button>
                                </Fieldset.Footer>
                            </Fieldset>
                            <Fieldset label="hosted">
                                <Fieldset.Title>Hosted Project</Fieldset.Title>
                                <Fieldset.Subtitle>Launching soon, hosted projects are a combination of web and terminal projects. They allow you to combine the frontend of web with the backend of terminal to build amazing applications.</Fieldset.Subtitle>
                                <Fieldset.Footer>
                                    <span></span>
                                    <Button disabled auto scale={1 / 3} font="12px" type="success">Coming Soon</Button>
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
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                    <Fieldset.Title style={{
                                        flexGrow: "1",
                                        width: "100%"
                                    }}>{project.title}</Fieldset.Title>
                                    <img src={languages[project.language].icon} style={{
                                        maxHeight: "24px",
                                        width: "24px",
                                        objectFit: "contain"
                                    }} />
                                </div>
                                <Fieldset.Subtitle><Code>{project.identifier}</Code></Fieldset.Subtitle>
                            </Card>
                        </a>
                    </Grid>
                ))}
                <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card" onClick={() => setDrawerState(true)}>
                        <Card.Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0px', height: '100%' }}>
                            <FilePlus size={32} />
                            <Text margin={0}>Create Project</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    )
}

function Groups({ groups, drawerState, setDrawerState }) {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("Join");

    const formRef = useRef(null);


    return (
        <>

            <Drawer visible={drawerState} onClose={() => setDrawerState(false)} placement="right" style={{
                textAlign: 'left',
                maxWidth: '600px',
                width: 'calc(100vw - 64px)'
            }}>
                <h2 style={{ marginBottom: '0px' }}>Coding is better together.</h2>
                <p style={{ marginTop: '16px' }}>Join or create a group to share your projects with each other.</p>
                <Drawer.Content>
                    <form onSubmit={event => {
                        event.preventDefault();
                        return false;
                    }} action="/api/projects/new" method="POST" ref={formRef}>
                        <Fieldset.Group value={type} onChange={setType}>
                            <Fieldset label="Join">
                                <Fieldset.Title>Join a group</Fieldset.Title>
                                <Fieldset.Subtitle style={{ marginBottom: '16px' }}>Join a club or a class to share or submit projects.</Fieldset.Subtitle>

                                <Input name="groupCode" placeholder="_ _ _ _ _ _">
                                    Group Code
                                </Input>

                                <Fieldset.Footer>
                                    {/* After joining, you'll be able to share projects with the group */}
                                    Joining groups is currently disabled
                                    <Button disabled onClick={() => formRef.current.submit()} auto scale={1 / 3} font="12px" type="success">Create</Button>
                                </Fieldset.Footer>
                            </Fieldset>
                            <Fieldset label="Create">
                                <Fieldset.Title>Create a group</Fieldset.Title>
                                <Fieldset.Subtitle style={{ marginBottom: '16px' }}>Create a space for students to share projects.</Fieldset.Subtitle>

                                <Input name="groupName" placeholder="My Coding Club">
                                    Group Name
                                </Input>
                                <br /><br />
                                <label style={{ marginBottom: '0.5em', display: 'inline-block' }}>
                                    <Text small style={{ color: '#999999' }}>
                                        Type
                                    </Text>
                                </label>
                                <br />

                                <Select value={category} onChange={setCategory}>
                                    <Select.Option value={"club"}>Club</Select.Option>
                                    <Select.Option value={"class"}>Class</Select.Option>
                                    <Select.Option value={"other"}>Other</Select.Option>
                                </Select>

                                <span style={{ display: 'none' }}>
                                    <Input hidden style={{ display: 'none' }} name="terminalLanguage" value={"s"} />
                                </span>

                                <Fieldset.Footer>
                                    {/* After creating, you'll be able to give participants a join code */}
                                    Creating groups is currently disabled
                                    <Button disabled onClick={() => formRef.current.submit()} auto scale={1 / 3} font="12px" type="success">Create</Button>
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
                {groups.map(group => (
                    <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                        <a style={{ width: '100%' }} href={group.url}>
                            <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card">
                                <Fieldset.Title>{group.title}</Fieldset.Title>
                                <Fieldset.Subtitle>{languages[group.language].name}</Fieldset.Subtitle>
                            </Card>
                        </a>
                    </Grid>
                ))}
                <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card" onClick={() => setDrawerState(true)}>
                        <Card.Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0px', height: '100%' }}>
                            <UserPlus size={32} />
                            <Text margin={0}>Join Group</Text>
                        </Card.Content>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default function Home({ projects, user }) {
    const [drawerState, setDrawerState] = useState(false);
    const [groupsDrawerState, setGroupsDrawerState] = useState(false);
    const [projectName, setProjectName] = useState("");
    const router = useRouter();
    const toasts = useToasts();

    const [attendance, setAttendance] = useState(false);
    const [meetingCode, setMeetingCode] = useState("");


    return (
        <Inter>
            <Head>
                <title>{app.pageTitle()}</title>
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
            <Navbar breadcrumbs={[
                <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
            ]}>
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


                {/* <a style={{ width: '100%' }} href={"javascript:;"} onClick={async () => {
                    toasts.setToast({
                        text: "Opening the code editor, please wait...",
                        type: "default"
                    })
                    const res = await fetch("/api/projects/new", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            webName: "My Website",
                            name: "My Website",
                            type: "web"
                        }),
                        redirect: "follow"
                    });
                    router.push(res.url);
                }}>
                    <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card" mb={2}>
                        <Fieldset.Title>Hack Club Boba Drops <span style={{ fontFamily: "Inter" }}>{' '}&nbsp;→</span></Fieldset.Title>
                        <Fieldset.Subtitle>Build a website, get free boba</Fieldset.Subtitle>
                    </Card>
                </a> */}

                {/* <Card hoverable style={{ width: '100%', border: '1px solid #343434' }} className="project-card" mb={2} onClick={() => setAttendance(true)}>
                    <Fieldset.Title>Meeting Check-In <span style={{ fontFamily: "Inter" }}>{' '}&nbsp;→</span></Fieldset.Title>
                    <Fieldset.Subtitle>Log your attendance for an Irvine Hack Club meeting</Fieldset.Subtitle>
                </Card> */}

                <Modal visible={attendance} onClose={() => setAttendance(false)}>
                    <Modal.Title>Check-In</Modal.Title>
                    <Modal.Subtitle>{user.name} • {new Date().toDateString()}</Modal.Subtitle>
                    <Modal.Content>
                        <Input label="Meeting Code" width="100%" maxlength={6} value={meetingCode} onChange={e => setMeetingCode(e.target.value.toUpperCase())} style={{
                            textTransform: "uppercase",
                            letterSpacing: "10px"
                        }} />
                    </Modal.Content>
                    <Modal.Action passive onClick={() => setAttendance(false)}>Cancel</Modal.Action>
                    <Modal.Action>Submit</Modal.Action>
                </Modal>

                <h3>Projects</h3>
                <Projects projects={projects} drawerState={drawerState} setDrawerState={setDrawerState} />
                
                <h3 style={{
                    marginTop: "2rem"
                }}>Groups</h3>
                <p>You aren't in any groups yet. Create or join a group to get started.</p>

                <Groups groups={[]} drawerState={groupsDrawerState} setDrawerState={setGroupsDrawerState} />

                {/* <h3 style={{
                    marginTop: "2rem"
                }}>Admin</h3>
                <p>Manage the operation of vaquero.dev</p> */}

            </Page>
        </Inter>
    )
}

export const getServerSideProps = async ({ req }) => {
    const auth = getAuth(req);

    const user = auth.userId ? await (clerkClient.users.getUser(auth.userId)) : null;


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
                url: '/edit/' + project.identifier,
                identifier: project.identifier
            })),
            user: {
                email: user.externalAccounts[0]?.emailAddress,
                name: user.firstName + ' ' + user.lastName,
                id: user.id
            }
        }
    }
}

import { clerkClient, getAuth } from "@clerk/nextjs/server";
import Inter from '@/components/Inter'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Breadcrumbs, Button, Card, Divider, Dot, Drawer, Fieldset, Grid, Input, Page, Select, Text, useToasts } from '@geist-ui/core'
import { Inbox, Home as HomeIcon, PlusCircle } from '@geist-ui/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CodeExec from 'code-exec'

import { Navbar } from '@/components/Editor'
import { languages } from '@/lib/languages'
import prisma from "@/lib/prisma";
import { useRouter } from "next/router";

export default function Home({ user }) {

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
                    <h2>Meeting Attendance</h2>
                </Page.Header>

                <div dangerouslySetInnerHTML={{ __html: `
                <div style="width:100%;height:500px;" data-fillout-id="fbYEoTVSjdus" data-fillout-embed-type="standard" data-fillout-inherit-parameters data-fillout-dynamic-resize data-fillout-domain="forms.hackclub.com" data-email="${user.email}" data-name="${user.name}" data-userId="${user.id}"></div><script src="https://server.fillout.com/embed/v1/"></script>
                `}} />
            </Page>
        </Inter>
    )
}

export const getServerSideProps = async ({ req }) => {
    const { userId } = getAuth(req);
    const user = userId ? await (clerkClient.users.getUser(userId)) : null;

    return {
        props: {
            user: {
                email: user.externalAccounts[0]?.emailAddress,
                name: user.firstName + ' ' + user.lastName,
                id: user.id
            }
        }
    }
}

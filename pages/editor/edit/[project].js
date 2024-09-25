import Editor from "@/components/Editor"
import prisma from "@/lib/prisma";
import { clerkClient, ClerkLoaded } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { Page } from "@geist-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Edit ({ project }) {
    if (!project) return (
        <Page>
            <h2>We couldn't find that project!</h2>
            <p>Try visiting the <Link href="/dashboard">Dashboard</Link> to see all of your projects.</p>
        </Page>
    )

    const { id, name, language, files, fileId, identifier, editable } = project;

    const [upToDateIdentifier, setUpToDateIdentifier] = useState(identifier);

    const editor = (
        <Editor editable={editable} load={async () => {
            return {
                language,
                code: files[0].content
            }
        }} save={async ({ code, language }) => {
            console.log('actually saving')
            fetch("/api/projects/saveFile", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: fileId,
                    code
                })
            });
        }} identifier={identifier} rename={async newName => {
            const { success } = await fetch("/api/projects/changeIdentifier", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldIdentifier: upToDateIdentifier,
                    newIdentifier: newName
                })
            }).then(res => res.json());
            if (success) {
                setUpToDateIdentifier(newName);
            }
            return success;
        }} editorName={name} previewUrl={`https://${upToDateIdentifier}.vaquero.dev`} />
    );

    return editable ? (
        <ClerkLoaded>{editor}</ClerkLoaded>
    ) : editor;
}

export const getServerSideProps = async ({ req, params }) => {
    const auth = getAuth(req);

    const name = req.url.split('/').reverse()[0];

    console.log({ name, params, auth });

    const project = await prisma.project.findUnique({
        where: {
            identifier: name,
            // ownerId: auth.userId
        },
        include: {
            files: true
        }
    });

    let userName = "";
    try {
        const user = await clerkClient.users.getUser(project.ownerId);
        console.log(user);
        userName = user.username || user.firstName || "";
    } catch (err) {
        console.error(err);
    }

    const editable = project.ownerId == auth?.userId;

    return {
        props: {
            project: project ? {
                name: project.name,
                language: project.language,
                files: project.files,
                id: project.id,
                fileId: project.files[0].id,
                identifier: project.identifier,
                editable,
                userName
            } : null
        }
    }
}

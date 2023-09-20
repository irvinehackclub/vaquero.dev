import Editor from "@/components/Editor"
import prisma from "@/lib/prisma";
import { ClerkLoaded } from "@clerk/nextjs";

export default function Edit ({ project: { id, name, language, files, fileId } }) {
    
    return (
        <ClerkLoaded>
            <Editor load={async () => {
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
            }} editorName={name} />
        </ClerkLoaded>
    )
}

export const getServerSideProps = async ({ req, params }) => {
    const name = req.url.split('/').reverse()[0]

    console.log({ name, params })

    const project = await prisma.project.findUnique({
        where: {
            identifier: name
        },
        include: {
            files: true
        }
    });

    return {
        props: {
            project: {
                name: project.name,
                language: project.language,
                files: project.files,
                id: project.id,
                fileId: project.files[0].id
            }
        }
    }
}
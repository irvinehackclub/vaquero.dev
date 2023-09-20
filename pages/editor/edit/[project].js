import Editor from "@/components/Editor"
import prisma from "@/lib/prisma";

export default function Edit ({ project: { name, language, files } }) {
    
    return (
        <Editor load={async () => {
            return {
                language,
                code: files[0].content
            }
        }} save={async ({ code, language }) => {
            console.log('actually saving')
            fetch("/api/projects/save", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: name,
                    code,
                    language
                })
            });
        }} />
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
                files: project.files
            }
        }
    }
}
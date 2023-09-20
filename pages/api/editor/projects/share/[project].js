import prisma from "@/lib/prisma";

export default async function handler (req, res) {
    const { project } = req.query;

    const obj = await prisma.project.findUnique({
        where: {
            identifier: project
        },
        include: {
            files: true
        }
    });

    if (obj.language == 'html') {
        res.setHeader('Content-Type', 'text/html');
        return res.send(obj.files[0].content);
    }

    res.json(obj);
}
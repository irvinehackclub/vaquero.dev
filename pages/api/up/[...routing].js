import prisma from "@/lib/prisma";
import { generate } from "@/lib/projectIds";
import { setCookie } from 'cookies-next';

export default async function handler (req, res) {
    const { routing: [project, ...route] } = req.query;

    const obj = await prisma.project.findUnique({
        where: {
            identifier: project
        },
        include: {
            files: true
        }
    });

    setCookie('vaqprojid', generate(obj), { req, res, httpOnly: false });

    if (obj.language == 'html') {
        res.setHeader('Content-Type', 'text/html');
        return res.send(obj.files[0].content);
    }

    res.json(obj);
}
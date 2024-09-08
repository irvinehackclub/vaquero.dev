import { languages } from "@/lib/languages";
import prisma from "@/lib/prisma";
import CodeExec from "code-exec";

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

    const result = await CodeExec.with(languages[obj.language].runtime, "editor.vaquero.dev/api/code").run(
        new CodeExec.File(languages[obj.language].entryPoint, obj.files[0].content)
    )

    res.json(result);
}
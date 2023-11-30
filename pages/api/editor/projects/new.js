import { clerkClient } from "@clerk/nextjs";
import { languages } from "@/lib/languages";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function (req, res) {
    const { userId } = getAuth(req);

    const { webName, terminalName, terminalLanguage, type } = req.body;

    const user = userId ? await clerkClient.users.getUser(userId) : null;

    const prepend = user?.username || user?.firstName || Math.floor(Math.random() * 100)

    const name = type == 'web' ? webName : terminalName;
    const language = type == 'web' ? 'html' : terminalLanguage;

    const obj = await prisma.project.create({
        data: {
            name,
            language,
            identifier: prepend + "_" + name.toLowerCase().split(' ').join('_').split('').filter(char => char.match(/[a-z0-9_]/)).join('') || ('project' + Math.random().toString(36).substring(7)),
            description: "New Project",
            ownerId: userId,
            files: {
                create: {
                    content: languages[language].starter,
                    path: languages[language].entryPoint
                }
            }
        },
        
    });

    console.log(obj);
    res.redirect('/edit/' + obj.identifier);
}
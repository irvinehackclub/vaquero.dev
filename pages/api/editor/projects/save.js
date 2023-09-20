import { languages } from "@/lib/languages";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function (req, res) {
    const auth = getAuth(req);

    const { identifier, code, language } = req.body;

    const obj = await prisma.project.update({
        where: {
            identifier
        },
        data: {
            language: language,
            files: {
                update: {
                    data: {
                        content: code
                    }
                }
            }
        },
        
    });

    console.log(obj);
    res.redirect('/edit/' + obj.identifier);
}
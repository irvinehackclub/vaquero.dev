import { languages } from "@/lib/languages";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function (req, res) {
    const auth = getAuth(req);

    const { code, id } = req.body;

    const obj = await prisma.file.update({
        where: {
            id
        },
        data: {
            content: code
        },
        
    });

    console.log(obj);
    res.json({
        success: true
    })
}
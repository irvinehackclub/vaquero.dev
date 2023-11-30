import prisma from "@/lib/prisma";

export default async function handler (req, res) {
    const { oldIdentifier, newIdentifier } = req.body;

    let success = false;
    try {
        const obj = await prisma.project.update({
            where: {
                identifier: oldIdentifier
            },
            data: {
                identifier: newIdentifier
            }
        });
        success = true;
    } catch (err) {
        console.error(err);
    }

    res.json({
        success
    });
}
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed, must be POST' });

    await prisma.interest.create({
        data: {
            name: req.body.name,
            grade: req.body.grade,
            skillLevel: req.body.skillLevel,
            phoneNumber: req.body.phoneNumber
        }
    });

    res.status(200).json({ success: true });
}
import { validate } from "@/lib/api";
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    const project = validate(req.headers.authorization);
    if (!project) return res.status(401).json({ error: "Unauthorized" });

    const { key } = req.body;
    if (!key) return res.status(400).json({ error: "Missing key" });

    res.status(200).json({
        value: await kv.get(`${project}:${key}`)
    });
}
import { validate } from "@/lib/api";
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    const project = validate(req.headers.authorization);
    if (!project) return res.status(401).json({ error: "Unauthorized" });
    
    const { key } = req.params;
    if (!key) return res.status(400).json({ error: "Missing key" });

    const { value } = req.body;
    if (!value) return res.status(400).json({ error: "Missing value" });

    res.status(200).json({
        result: await kv.set(`${project}:${key}`, value)
    });
}
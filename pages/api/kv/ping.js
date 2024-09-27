import { validate } from "@/lib/api";

export default async function handler(req, res) {
    res.status(200).json({ project: validate(req.headers.authorization) });
}
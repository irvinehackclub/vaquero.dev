import { verify } from "@/lib/projectIds";

export default async function handler (req, res) {
    const id = req.body?.id || req.query?.id || req.params?.id;

    res.json({
        id,
        ...(await verify(id))
    });
}
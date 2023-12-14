import { verify } from "@/lib/projectIds";

export default function handler (req, res) {
    const id = req.body?.id || req.query?.id || req.params?.id;

    res.json({
        id,
        success: verify(id)
    });
}
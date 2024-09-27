import { issue } from "@/lib/api";

export default async function execute (req, res) {
    console.log("INPUT:" + req.body);
    const body = JSON.parse(req.body);
    body.files = body.files.map(file => {
        try {
            if (file.name == "__vaquero__runtime.json") {
                const json = JSON.parse(file.content);
                file.content = JSON.stringify({
                    ...json,
                    apiKey: issue(json.project)
                })
            }
        } catch (err) {
            console.error("A", err);
        }

        return file;
    });
    const output = await fetch('https://piston.ian.hackclub.app/api/v2/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
        body: JSON.stringify(req.body)
    }).then(r => r.json());

    console.log("OUTPUT:", output);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(output);
}
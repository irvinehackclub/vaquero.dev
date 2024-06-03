export default async function execute (req, res) {
    console.log("INPUT:" + req.body);
    const output = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
        body: req.body
    }).then(r => r.json());

    console.log("OUTPUT:", output);

    res.json(output);
}
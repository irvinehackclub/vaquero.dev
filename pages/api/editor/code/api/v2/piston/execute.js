export default async function execute (req, res) {
    console.log("INPUT:" + req.body);
    const output = await fetch('https://piston.ian.hackclub.app/api/v2/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
        body: req.body
    }).then(r => r.json());

    console.log("OUTPUT:", output);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(output);
}
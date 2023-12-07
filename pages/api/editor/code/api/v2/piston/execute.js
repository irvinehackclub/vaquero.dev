export default async function execute (req, res) {
    console.log(req.body);
    return await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
        body: JSON.stringify(req.body)
    }).then(r => r.text()).then(r => res.send(r));
}
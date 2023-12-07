export default async function execute (req, res) {
    return await fetch('http://emkc.org/api/v2/piston/execute/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(r => r.json()).then(r => res.json(r));
}
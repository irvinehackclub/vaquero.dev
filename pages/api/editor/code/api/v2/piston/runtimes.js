export default async function runtimes (req, res) {
    return await fetch('http://emkc.org/api/v2/piston/runtimes/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.json()).then(r => res.json(r));
}
export default async function runtimes (req, res) {
    return await fetch('https://emkc.org/api/v2/piston/runtimes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.text()).then(r => res.send(r));
}
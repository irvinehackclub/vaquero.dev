export default async function runtimes (req, res) {
    const output = await fetch('https://emkc.org/api/v2/piston/runtimes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
    }).then(r => r.json());

    console.log("OUTPUT:" + output);

    res.json(output);
}

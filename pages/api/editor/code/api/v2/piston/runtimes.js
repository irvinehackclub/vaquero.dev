export default async function runtimes (req, res) {
    const output = await fetch('https://piston.ian.hackclub.app/api/v2/piston/runtimes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.4.5'
        },
    }).then(r => r.json());

    console.log("OUTPUT:" + output);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(output);
}

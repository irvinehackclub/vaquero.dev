import CodeExec from 'code-exec'

function escape (source, begin, end) {
    const raw = source.match(new RegExp(`<<${begin}>>.*?<<${end}>>`, 'g')) || [];

    return {
        raw,
        stripped: raw.map(match => match.substring(`<<${begin}>>`.length, match.length - `<<${begin}>>`.length))
    }
}

export default async function execute ({
    language,
    code,
    request,
    source
}) {
    const runtime = CodeExec.with(language.runtime, "editor.vaquero.dev/api/code")
    const begin = crypto.randomUUID();
    const end = crypto.randomUUID();

    const result = await runtime.run([
        new CodeExec.File(language.entryPoint, code),
        ...Object.entries(language.stdlib).map(([file, content]) => new CodeExec.File(file, content)),
        new CodeExec.File("__vaquero__runtime.json", JSON.stringify({
            README: "Please read __vaquero__runtime.json documentation at vaquero.dev/docs/request",
            request,
            source,
            escape: {
                begin,
                end
            }
        }))
    ]);

    const escaped = escape(result.output, begin, end);
    let { output } = result;

    for (const raw of escaped.raw) {
        output = output.split(raw).join("");
    }

    result.output = output;
    result.escaped = escaped.stripped.join("");

    console.log(result);

    return result;
}

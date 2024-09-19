import CodeExec from 'code-exec'

export default async function execute ({
    language,
    code,
    request,
    source
}) {
    const runtime = CodeExec.with(language.runtime, "editor.vaquero.dev/api/code")
    
    const output = await runtime.run([
        new CodeExec.File(language.entryPoint, code),
        ...Object.entries(language.stdlib).map(([file, content]) => new CodeExec.File(file, content)),
        new CodeExec.File("__vaquero__runtime.json", JSON.stringify({
            README: "Please read __vaquero__runtime.json documentation at vaquero.dev/docs/request",
            request,
            source
        }))
    ]);

    return output;
}
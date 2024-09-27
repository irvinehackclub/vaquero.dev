import execute from "@/lib/execute";
import { languages } from "@/lib/languages";
import prisma from "@/lib/prisma";
import { generate } from "@/lib/projectIds";
import CodeExec from "code-exec";
import { setCookie } from 'cookies-next';
import * as util from "util";

export default async function handler (req, res) {
    const { routing: [project, ...route] } = req.query;

    try {

        const obj = await prisma.project.findUnique({
            where: {
                identifier: project
            },
            include: {
                files: true
            }
        });

        setCookie('vaqprojid', generate(obj), { req, res, httpOnly: false });

        if (obj.language == 'html') {
            res.setHeader('Content-Type', 'text/html');
            return res.send(obj.files[0].content);
        }
        
        const runtime = CodeExec.with(languages[obj.language].runtime, "editor.vaquero.dev/api/code");
        const request = {
            headers: req.headers,
            method: req.method,
            url: req.url,
            body: (req.body instanceof ReadableStream) ? null : req.body
        }
        runtime.stdin = JSON.stringify({
            README: "Please read STDIN documentation at vaquero.dev/docs/stdin",
            ...request
        });
        const result = await execute({
            language: languages[obj.language],
            code: obj.files[0].content, 
            request,
            source: "request",
            project: obj.identifier
        });
        console.log(result)
    
        res.send(result.output);

    } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'text/html');
        return res.send(/*html*/`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project Not Found</title>
                <link rel="favicon" href="/favicon.png" />
                <link rel="icon" href="/favicon.png" />
                <link rel="shortcut icon" href="/favicon.png" />
                <style>
                    html, body {
                        width: 100%;
                        height: 100%;
                        margin: 0px;
                        padding: 0px;
                    }
            
                    body {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 16px;
                        padding: 30px;
                        font-family: system-ui, sans-serif;
                    }
                </style>
            </head>
            <body>
                <img src="/sad-cowboy-dino.png" style="max-width: 300px; width: 100%;" />
                <h2 style="max-width: 500px;">This dinosaur couldn't locate that project.</h2>
            </body>
            </html>
        `);
    }
}
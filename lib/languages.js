export const languages = {
  html: {
    name: "HTML",
    editor: "html",
    entryPoint: "index.html",
    resources: "/resources/html",
    customRuntime: ({ code, style, url }) => (
      <iframe src={url} style={{
        ...style,
        border: 'none',
        background: 'white'
      }} />
    ),
    starter: /*html*/`<!DOCTYPE html>
<html>
  <head>
    <title>My Webpage</title>
    <style>



    </style>
  </head>
  <body>
  

    <script>


    </script>
  </body>
</html>`,
    icon: "https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png"
  },
  javascript: {
    name: 'JavaScript',
    editor: 'javascript',
    entryPoint: 'index.js',
    runtime: 'node-js',
    starter: `console.log("Hello, world!");`,
    stdlib: {
      "vaquero.js": /*js*/`
        import fs from "fs";
        export class Router {
          constructor(req = Vaquero.runtime.request || {}) {
            this.req = req;
            if (!this.req.url) {
              if (Vaquero.runtime.source == "editor") this.req.url = "editor";
              else this.req.url = "/";
            }
            this.routes = {};
          }
    
          get res () {
            return {
              send (content) {
                console.log(content);
              }
            }
          }
    
          get (route, callback) {
            this.routes[route] = { callback };
          }
    
          async run () {
            for (const route in this.routes) {
              let match = false;
              if (route == this.req.url) match = true;
              if (route.endsWith("*") && this.req.url.startsWith(route.substring(0, route.length - 1))) match = true;
              
              if (match) {
                if (this.routes[Error]) {
                  try {
                    return await this.#route(route);
                  } catch (err) {
                    await this.routes[Error].callback(err, this.req, this.res);
                  }
                } else {
                  return await this.#route(route);
                }
              }
            }
          }
    
          #route (route) {
            return this.routes[route].callback(this.req,    this.res);
          }
    
          error (callback) {
            this.get(Error, callback);
          }

          editor (callback) {
            this.get("editor", callback);
          }
        }

        export class Vaquero {
          static Router = Router;

          static get runtime () {
            try {
              const runtimeFile = fs.readFileSync("__vaquero__runtime.json", 'utf-8');
              return JSON.parse(runtimeFile);
            } catch (err) {
              return {};
            }
          }
        }

        export default Vaquero;
      `,
      "package.json": JSON.stringify({
        type: "module"
      })
    },
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  },
  typescript: {
    name: 'TypeScript',
    editor: 'typescript',
    entryPoint: 'index.ts',
    runtime: 'deno-ts',
    starter: `console.log("Hello, world!");`,
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
  },
  python: {
    name: 'Python',
    editor: 'python',
    entryPoint: 'main.py',
    runtime: 'python3',
    starter: `print("Hello, world!")`,
  },
  bash: {
    name: 'Bash',
    editor: 'bash',
    entryPoint: 'script.sh',
    runtime: 'sh',
    starter: `echo "Hello, world!"`,
    icon: "https://cloud-t3lu41126-hack-club-bot.vercel.app/0bash_dark-1331550886960171470.png"
  },
  java: {
    name: "Java",
    editor: 'java',
    entryPoint: "Main.java",
    runtime: "java",
    starter: `class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
  },
  ruby: {
    name: "Ruby",
    editor: "ruby",
    entryPoint: "main.rb",
    runtime: "ruby",
    starter: `puts "Hello, world!"`,
  }
}
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
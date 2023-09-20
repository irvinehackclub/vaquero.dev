import Editor from "@/components/Editor"

export default function Playground () {
    return (
        <Editor showLanguageSwitcher load={async () => {
            const code = localStorage.getItem("code");
            const language = localStorage.getItem("language");

            if (!code || !language) return {
                code: "console.log('Hello, world!')",
                language: "javascript"
            }

            return {
                code, language
            }
        }} save={async ({ code, language }) => {
            localStorage.setItem("code", code);
            localStorage.setItem("language", language);
        }} editorName="Playground" explicitSave={code => {
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
              
                element.style.display = 'none';
                document.body.appendChild(element);
              
                element.click();
              
                document.body.removeChild(element);
              }

              download("code.html", code);
              
        }} />
    )
}
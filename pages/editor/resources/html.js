import { Card, Code, Text } from "@geist-ui/core";

export default function HTML () {
    return (
        <div style={{
            padding: "1rem"
        }}>
            <Text h2>HTML Resources</Text>
            <Text h3>Syntax</Text>
            <Text>HTML is composed of tags. Each tag is contained inside of other tags. Here's an example:</Text>
            <Code block lang="html">{`<p>
    Hello, <strong>world!</strong>
</p>`}</Code>
            <Text>In this example, the <Code>{'<p>'}</Code> element wraps around the <Code>{'<strong>'}</Code> element, along with some text.</Text>
            <Card>
                <Text>Remember that in HTML, every tag has an <strong>opening</strong> and a <strong>closing</strong> tag.</Text>
            </Card>
            <Text>The opening tag is a left arrow bracket (<Code>{'<'}</Code>), the tag name, and a right arrow bracket (<Code>{'>'}</Code>).</Text>
            <Text>The closing tag is similar, but it begins with a slash (<Code>{'/'}</Code>) to denote that it is the closing.</Text>
            <Text h3>Tags</Text>
            <Text>There are many tags in HTML, but here are some common ones:</Text>
            <Card>
                <Text h4>Text Formatting Tags</Text>
                <Code block lang="html">{`<p>Paragraph</p>
<strong>Strong</strong>
<em>Emphasis</em>
<code>Code</code>
<mark>Highlight</mark>
<small>Small</small>

<h1>Heading (Size 1 - Largest)</h1>
<h2>Heading (Size 2)</h2>
<h3>Heading (Size 3)</h3>
<h4>Heading (Size 4)</h4>
<h5>Heading (Size 5)</h5>
<h6>Heading (Size 6 - Smallest)</h6>`}</Code>
            </Card>
            <Card my={2}>
                <Text h4>Content Tags</Text>
                <Code block lang="html">{`<img src="https://example.com/link-to-image.png">Paragraph</img>
<a href="https://example.com">Link</a>
<video src="https://example.com/link-to-video.mp4"></video>
<audio src="https://example.com/link-to-audio.mp3"></audio>
<blockquote>Quote</blockquote>`}</Code>
            </Card>
            <Text h3>Attributes</Text>
            <Text>You may have noticed that some tags, like the image (<Code>{'<img>'}</Code>) tag require additional information in order to work. This information can be passed through <strong>attributes</strong>.</Text>
            <Text>Attributes can be defined with the name of the attribute, and equals sign (<Code>{'='}</Code>), and then the value surrounded by quotes. Here's an example:</Text>
            <Code block lang="html">{`<img src="https://example.com/link-to-image.png">`}</Code>
            <Text h3>Styling</Text>
            <Text>Why not add some pizzazz to your website? Using the <Code>{'style'}</Code> attribute, you can define stylistic attributes for a certain tag. For example:</Text>
            <Code block lang="html">{`<p style="color: red; font-size: 24px;">
    This text is red and 24px!
</p>`}</Code>
            <Card>
                <Text>Remember that the <Code>{'style'}</Code> attribute is a string (surrounded by quotes), and each style is separated by a semicolon (<Code>{';'}</Code>).</Text>
            </Card>
            <Text>Here's a list of common styles you can set:</Text>
            <Code block lang="html">{`color: red; /* Text color */
background-color: blue; /* Background color */
font-size: 24px; /* Font size */
font-family: Arial; /* Font family */
border: 1px solid black; /* Border (1px thick, solid, black) */`}</Code>
            <Text h2>Digging Deeper</Text>
            <Text>HTML is a vast language, and there's much more to learn. Here are some resources to help you as you continue your journey:</Text>
            <Card>
                <Text h4>MDN Web Docs</Text>
                <Text>MDN Web Docs is a comprehensive resource for web development. They have a great guide on HTML that you can find <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">here</a>.</Text>
            </Card>
            <Card mt={1}>
                <Text h4>W3Schools</Text>
                <Text>W3Schools is another great resource for learning web development. They have a tutorial on HTML that you can find <a href="https://www.w3schools.com/html/" target="_blank">here</a>.</Text>
            </Card>
            <Card mt={1}>
                <Text h4>Codecademy</Text>
                <Text>Codecademy is a platform that offers interactive coding lessons. They have a course on HTML that you can find <a href="https://www.codecademy.com/learn/learn-html" target="_blank">here</a>.</Text>
            </Card>
        </div>
    )
}
import { Text, Heading, Button, useColorMode, VStack, Center } from "@chakra-ui/react";
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

const code = `## Title

\`\`\`jsx
function Demo() {
  return <div>demo</div>
}
\`\`\`

\`\`\`bash
# Not dependent on uiw.
npm install @codemirror/lang-markdown --save
npm install @codemirror/language-data --save
\`\`\`

[weisit ulr](https://uiwjs.github.io/react-codemirror/)

\`\`\`go
package main
import "fmt"
func main() {
  fmt.Println("Hello, 世界")
}
\`\`\`
`;
export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Center h='100vh'>
      <VStack spacing={4}>
      <Heading>SiPasta is Working on It</Heading>
      <Text fontSize="xl" textAlign='center' mx={4}>
        SiPasta is a lightweight, open-source, and free alternative to the popular Pastebin service.
      </Text>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <CodeMirror
      value={code}
      height="200px"
      theme={colorMode === 'light' ? githubLight : githubDark}
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
    </VStack>
    </Center>
  );
}

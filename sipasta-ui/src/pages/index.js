import {
  Text,
  Heading,
  Button,
  useColorMode,
  VStack,
  Center,
} from "@chakra-ui/react";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { CodeEditor } from "src/components/CodeEditor";

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
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Heading>SiPasta is Working on It</Heading>
        <Text fontSize="xl" textAlign="center" mx={4}>
          SiPasta is a lightweight, open-source, and free alternative to the
          popular Pastebin service.
        </Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <CodeEditor
          value={code}
          height="200px"
          theme={colorMode === "light" ? githubLight : githubDark}
        />
      </VStack>
    </Center>
  );
}

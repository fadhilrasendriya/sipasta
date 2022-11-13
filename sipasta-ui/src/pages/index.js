import {
  useColorMode,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { CodeEditor } from "src/components/CodeEditor";
import { NavBar } from "src/components/NavBar";

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
    <Flex h="100vh" w="100vw">
      <NavBar />
        <Box flex={1} style={{
          overflow: 'auto',
        }
        }>
        <CodeEditor
          value={code}
          width="100%"
          height="100vh"
          viewMode={colorMode}
        />
        </Box>
    </Flex>
  );
}

import { useColorMode, Flex, Box } from "@chakra-ui/react";
import { CodeEditorProvider } from "src/contexts/CodeEditorContext";
import { CodeEditor } from "src/components/CodeEditor";
import { NavBar } from "src/components/NavBar";

export default function Home() {
  const { colorMode } = useColorMode();
  return (
    <CodeEditorProvider>
      <Flex h="100vh" w="100vw">
        <NavBar isNew/>
        <Box
          flex={1}
          style={{
            overflow: "auto",
          }}
        >
          <CodeEditor width="100%" height="100vh" viewMode={colorMode} />
        </Box>
      </Flex>
    </CodeEditorProvider>
  );
}

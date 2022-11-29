import { useColorMode, Flex, Box } from "@chakra-ui/react";
import { CodeEditorProvider } from "src/contexts/CodeEditorContext";
import { CodeEditor } from "src/components/CodeEditor";
import { NavBar } from "src/components/NavBar";
import { useRouter } from "next/router";

export default function Home() {
  const { colorMode } = useColorMode();
  const router = useRouter()
  const {
    query: { 
      pasteValue,
     },
  } = router
  return (
    <CodeEditorProvider>
      <Flex h="100vh" w="100vw" style={{
        backgroundImage: `url("/rpk-bg.png")`,
        backgroundSize: "cover"
      }
      }>
        <NavBar isNew/>
        <Box
          flex={1}
          style={{
            overflow: "auto",
            opacity: colorMode === "light" ? 1 : 0.9,
          }}
        >
          <CodeEditor data={pasteValue} width="100%" height="100vh" viewMode={colorMode}/>
        </Box>
      </Flex>
    </CodeEditorProvider>
  );
}

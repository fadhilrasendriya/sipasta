import {
  Box,
  Button,
  Center,
  useColorMode,
  Heading,
  VStack,
  IconButton,
  HStack,
  Container,
  Icon,
  color,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaPaste } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { signIn } from "src/utils/auth";

export default function Login() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "teal.600" : "teal.200";
  return (
    <Center h="100vh">
      <Box w="400px" h="400px" bg="Menu" p="10">
        <Center h="100%">
          <VStack verticalAlign="middle">
            <Icon as={FaPaste} color={color} w={30} h={30}></Icon>
            <Heading color={color} size="md" pt="10px" pb="50px">
              Welcome to SiPasta!
            </Heading>
            <HStack>
              <IconButton
                colorScheme="teal"
                variant="ghost"
                icon={colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
                onClick={toggleColorMode}
              ></IconButton>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<FcGoogle />}
                onClick={signIn}
              >
                Sign in with Google
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

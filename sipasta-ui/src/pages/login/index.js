import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Icon,
  Divider,
  useToast
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaPaste } from "react-icons/fa";
import { signIn } from "src/utils/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const handleSignIn = async () => {
    try {
      await signIn();
      toast({
        title: "Login Success",
        position: "top-right",
        description: "You have been logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Login failed",
        position: "top-right",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Center h="100vh">
      <Box bg="Menu" p={10} borderWidth="1px" borderRadius="lg">
        <Center h="100%">
          <VStack verticalAlign="middle">
            <Icon as={FaPaste} w={30} h={30}></Icon>
            <Heading size="md">Welcome to SiPasta!</Heading>
            <Divider />
            <Button
              colorScheme="gray"
              leftIcon={<FcGoogle />}
              onClick={handleSignIn}
            >
              Sign in with Google
            </Button>
            <Button
              colorScheme="teal"
              variant="link"
              onClick={() => router.push("/")}
            >
              Continue as guest
            </Button>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

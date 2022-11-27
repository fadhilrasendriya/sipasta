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
import { initializeApp } from "firebase/app";
import { FcGoogle } from "react-icons/fc";
import { FaPaste } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  projectId: "sipasta",
  authDomain: "sipasta.firebaseapp.com",
  apiKey: "AIzaSyA6_Q_OLEFzirQ9QvyA0saGbw7uDth83lw",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function signIn(setToken) {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("accessToken", token);
      setToken(token);
      // // The signed-in user info.
      // const user = result.user;
      // console.log(user);
    })
    .catch((error) => {
      console.log(error);
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // // ...
      // console.log(credential);
    });
}

function signOut() {
  signOut(auth)
    .then(() => {
      useEffect(() => {
        localStorage.removeItem("accessToken");
      });
    })
    .catch((error) => {
      // An error happened.
    });
}

export default function Login() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [token, setToken] = useState("");
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
                onClick={() => signIn(setToken)}
              >
                Sign in with Google
              </Button>
            </HStack>
            <Container>{token}</Container>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

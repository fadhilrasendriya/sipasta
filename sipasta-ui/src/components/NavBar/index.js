import {
  VStack,
  Flex,
  Spacer,
  Divider,
  useColorMode,
  Modal,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  MdPostAdd,
  MdMenu,
  MdLogin,
  MdLightMode,
  MdDarkMode,
  MdSave,
  MdEdit,
  MdLogout,
} from "react-icons/md";
import { NavigationButton } from "src/components/NavBar/NavigationButton";
import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { useCodeEditorContext } from "src/contexts/CodeEditorContext";
import { getToken, signOut } from "src/utils/auth";

// export context to check navbar state and useState
export const NavBarContext = createContext();

export const NavBar = ({ isNew }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { value } = useCodeEditorContext();
  const [ getId, setId ] = useState("");
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isOpened, setisOpened] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const moveToHome = () => {
    router.push("/");
  };

  const handleLogout = async () => {
    signOut();
    toast({
      title: "Logout Success",
      position: "top-right",
      description: "You have been logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/login");
  };


  const createNewPaste = async () => {
    setIsSaveLoading(true);
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/texts/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization" : localStorage.getItem("authorization")
        },
        body: JSON.stringify({
          id: getId,
          text: value,
        }),
      }
    );
    const data = await res.json();
    router.push(`/${data.id}`);
  };

  const moveToHomeWithExistingPaste = () => {
    router.push(
      {
        pathname: "/",
        query: {
          pasteValue: value,
        },
      },
      "/"
    );
  };

  return (
    <>
    <NavBarContext.Provider value={isOpen}>
      <Flex
        direction="column"
        p={1}
        bg="Menu"
        h="100%"
        style={{
          width: isOpen ? "250px" : "56px",
          transition: "width 0.25s",
        }}
      >
        <VStack spacing={1} align="stretch">
          <NavigationButton
            onClick={() => setIsOpen(!isOpen)}
            icon={<MdMenu />}
          >
            SiPasta
          </NavigationButton>
          <Divider />
          <VStack spacing={1} align="stretch">
            <NavigationButton
              onClick={() => setisOpened(!isOpened)}
              icon={<MdMenu />}
            >
              SiPasta
            </NavigationButton>
            <Divider />
            <VStack spacing={1} align="stretch">
              <NavigationButton
                icon={<MdSave />}
                isDisabled={!isNew}
                isLoading={isSaveLoading}
                onClick={onOpen}
              >
                {" "}
                Save Paste{" "}
              </NavigationButton>
              <NavigationButton icon={<MdPostAdd />} onClick={moveToHome}>
                New Paste
              </NavigationButton>
              <NavigationButton
                icon={<MdEdit />}
                isDisabled={isNew}
                onClick={isNew ? moveToHome : moveToHomeWithExistingPaste}
              >
                {" "}
                Edit Paste{" "}
              </NavigationButton>
            </VStack>
          </VStack>
          <Spacer />
          <VStack spacing={1} align="stretch">
            <NavigationButton
              icon={colorMode == "dark" ? <MdLightMode /> : <MdDarkMode />}
              onClick={toggleColorMode}
            >
              {" "}
              {colorMode == "dark" ? "Light Mode" : "Dark Mode"}{" "}
            </NavigationButton>
            <NavigationButton
              icon={getToken() == null ? <MdLogin /> : <MdLogout />}
              onClick={
                getToken() == null
                  ? () => router.push("/login")
                  : handleLogout
              }
              colorScheme={getToken() == null ? "teal" : "red"}
            >
              {getToken() == null ? 'Login' : 'Logout'}
            </NavigationButton>
          </VStack>
        </VStack>
        <Spacer />
        <VStack spacing={1} align="stretch">
          <NavigationButton
            icon={colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
            onClick={toggleColorMode}
          >
            {" "}
            {colorMode === "dark" ? "Light Mode" : "Dark Mode"}{" "}
          </NavigationButton>
          <NavigationButton icon={<MdLogin />}>Login</NavigationButton>
        </VStack>
      </Flex>
    </NavBarContext.Provider>
    </>
  );
};

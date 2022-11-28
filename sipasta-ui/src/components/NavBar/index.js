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
  const [getId, setId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/texts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization" : getToken(),
          },
          body: JSON.stringify({
            id: getId,
            text: value,
          }),
        }
      )
      const data = await res.json();
      toast({
        title: 'Pasta Saved',
        position: 'top-right',
        description: "Your pasta has been saved",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push(`/${data.id}`);

    } catch (error) {
      toast({
        title: 'Pasta Save Failed',
        position: 'top-right',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsSaveLoading(false);
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
      <NavBarContext.Provider value={isOpened}>
        <Flex
          direction="column"
          p={1}
          bg="Menu"
          h="100%"
          style={{
            width: isOpened ? "250px" : "56px",
            transition: "width 0.25s",
          }}
        >
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
        </Flex>
      </NavBarContext.Provider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Your Pasta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={getId}
              onChange={(e) => setId(e.target.value)}
              placeholder={
                getToken() == null
                  ? "Please Login to determine pasta name"
                  : "Pasta Name"
              }
              disabled={getToken() == null}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={createNewPaste} isLoading={isSaveLoading} variant="ghost">
              Save Pasta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

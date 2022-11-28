import { VStack, Flex, Spacer, Divider, useColorMode, useToast } from "@chakra-ui/react";
import {
  MdPostAdd,
  MdMenu,
  MdLogin,
  MdLightMode,
  MdDarkMode,
  MdSave,
  MdEdit,
} from "react-icons/md";
import { NavigationButton } from "src/components/NavBar/NavigationButton";
import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { useCodeEditorContext } from "src/contexts/CodeEditorContext";

// export context to check navbar state and useState
export const NavBarContext = createContext();

export const NavBar = ({ isNew, data, setIsNew }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { value } = useCodeEditorContext();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const moveToHome = () => {
    router.push("/");
  };

  const createNewPaste = async () => {
    setIsSaveLoading(true);
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/collections/paste/records`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
        }),
      }
    );
    const data = await res.json();
    toast({
      title: 'New Paste Saved',
      description: "We've created your paste for you.",
      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })
    router.push(`/${data.id}`);
  };

  const savePaste = async () => {
    setIsSaveLoading(true);
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/collections/paste/records/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
        }),
      }
    )
    setIsSaveLoading(false);
    setIsNew(false);
    toast({
      title: 'Paste Saved',
      description: "We've updated your paste for you.",
      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })
  };

  return (
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
              icon={<MdSave />}
              isDisabled={!isNew}
              onClick={data?.id ? savePaste : createNewPaste}
              isLoading={isSaveLoading}
            >
              {" "}
              Save Paste{" "}
            </NavigationButton>
            <NavigationButton icon={<MdPostAdd />} onClick={moveToHome}>
              New Paste
            </NavigationButton>
            <NavigationButton icon={<MdEdit />} isDisabled={isNew} onClick={
              () => {
                setIsNew(!isNew);
              }
            }>
              {" "}
              Edit Paste{" "}
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
  );
};

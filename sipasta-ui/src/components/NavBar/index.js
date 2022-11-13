import { VStack, Flex, Spacer, Divider, useColorMode } from "@chakra-ui/react";
import {
  MdPostAdd,
  MdQuestionAnswer,
  MdMenu,
  MdLogin,
  MdLightMode,
  MdDarkMode,
  MdSave,
  MdEdit,
} from "react-icons/md";
import { NavigationButton } from "src/components/NavBar/NavigationButton";
import { createContext, useState } from "react";

// export context to check navbar state and useState
export const NavBarContext = createContext();

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
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
            <NavigationButton icon={<MdSave />}> Save Paste </NavigationButton>
            <NavigationButton icon={<MdPostAdd />}>New Paste</NavigationButton>
            <NavigationButton icon={<MdEdit />}> Edit Paste </NavigationButton>
            <NavigationButton icon={<MdQuestionAnswer />}>FAQ</NavigationButton>
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

import {
    Button, Slide
} from "@chakra-ui/react";
import { NavBarContext } from ".";
import { useContext } from "react";

export const NavigationButton = ({icon, ...props}) => {
    const isOpen = useContext(NavBarContext);
    return (
        <Button
            iconSpacing={isOpen ? 2 : 0}
            leftIcon={icon}
            colorScheme="teal"
            variant="ghost"
            justifyContent="left"
            {...props}
        >
            {isOpen? props.children : null}
        </Button>
    )
}
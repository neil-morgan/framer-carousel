import React from "react";
import {Button, Flex} from "@chakra-ui/react";
import FramedPositions from "./FramedPositions";
import Icon from "../Icon";

interface NavigatorProps {
    activeItem: number;
    constraint: number;
    handleDecrementClick: () => void;
    handleDotClick: (index: number) => void;
    handleFocus: () => void;
    handleIncrementClick: () => void;
    isDisabled: boolean;
    navIcon?: string;
    navSize: number;
    positions: number[];
}

const Navigator: React.FC<NavigatorProps> = ({
    activeItem,
    constraint,
    handleDecrementClick,
    handleDotClick,
    handleFocus,
    handleIncrementClick,
    isDisabled,
    navIcon,
    navSize,
    positions
}: NavigatorProps) => {
    const spacing = navSize * 2;

    const positionsProps = {
        activeItem,
        constraint,
        handleDotClick,
        navSize,
        positions
    };

    return isDisabled ? (
        <></>
    ) : (
        <Flex w="full" justify="center" mt={navSize}>
            <Button
                disabled={activeItem === 0}
                onClick={handleDecrementClick}
                onFocus={handleFocus}
                transition="400ms ease"
                variant="link"
                minW={0}
                mr={spacing}
            >
                <Icon style={`${navIcon}-left`} />
            </Button>

            <FramedPositions {...positionsProps} />

            <Button
                disabled={activeItem === positions.length - constraint}
                onClick={handleIncrementClick}
                onFocus={handleFocus}
                transition="400ms ease"
                variant="link"
                zIndex={2}
                minW={0}
                ml={spacing}
            >
                <Icon style={`${navIcon}-right`} />
            </Button>
        </Flex>
    );
};

export default Navigator;

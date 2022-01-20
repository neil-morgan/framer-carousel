import React from "react";
import {HStack, Button, Flex} from "@chakra-ui/react";

interface NavigatorProps {
    handleDecrementClick: () => void;
    handleIncrementClick: () => void;
    handleDotClick: (index: number) => void;
    handleFocus: () => void;
    activeItem: number;
    constraint: number;
    isDisabled: boolean;
    positions: number[];
    gap: number;
}

const Navigator: React.FC<NavigatorProps> = ({
    handleDecrementClick,
    handleIncrementClick,
    handleDotClick,
    handleFocus,
    activeItem,
    constraint,
    isDisabled,
    positions,
    gap
}: NavigatorProps) => {
    const spacing = gap * 2;

    return isDisabled ? (
        <></>
    ) : (
        <Flex w="full" justify="center" mt={spacing} pb={gap}>
            <Button
                disabled={activeItem === 0}
                onClick={handleDecrementClick}
                onFocus={handleFocus}
                transition="400ms ease"
                color="gray.200"
                variant="link"
                minW={0}
                mr={spacing}
            >
                Left
            </Button>

            <HStack
                position="relative"
                spacing={spacing}
                _before={{
                    transform: `translateY(-50%) translateX(${activeItem * (spacing * 2)}px)`,
                    w: `${spacing * constraint + spacing * constraint}px`,
                    transition: "ease-in-out 400ms",
                    pointerEvents: "none",
                    left: `-${spacing / 2}px`,
                    position: "absolute",
                    background: "#00000050",
                    content: "''",
                    top: "50%",
                    rounded: 3,
                    h: "28px"
                }}
            >
                {positions.map((_, index) => (
                    <Flex
                        position="relative"
                        zIndex={1}
                        onClick={() => handleDotClick(index)}
                        justify="space-between"
                        key={index}
                        bg="#fff000"
                        as="button"
                        rounded={2}
                        h={`${spacing}px`}
                        w={`${spacing}px`}
                    />
                ))}
            </HStack>

            <Button
                disabled={activeItem === positions.length - constraint}
                onClick={handleIncrementClick}
                onFocus={handleFocus}
                transition="400ms ease"
                color="gray.200"
                variant="link"
                zIndex={2}
                minW={0}
                ml={spacing}
            >
                Right
            </Button>
        </Flex>
    );
};

export default Navigator;

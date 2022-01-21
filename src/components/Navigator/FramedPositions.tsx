import React from "react";
import {HStack, Flex} from "@chakra-ui/react";

interface FramedPositionsProps {
    activeItem: number;
    constraint: number;
    handleDotClick: (index: number) => void;
    navSize: number;
    positions: number[];
}

const FramedPositions: React.FC<FramedPositionsProps> = ({
    activeItem,
    constraint,
    handleDotClick,
    navSize,
    positions
}) => {
    const spacing = navSize * 2;

    return (
        <HStack
            position="relative"
            spacing={spacing}
            //todo: cnsider using framer-motion here to mimic slider motion
            _before={{
                transform: `translateY(-50%) translateX(${activeItem * (spacing * 2)}px)`,
                w: `${spacing * constraint * 2}px`,
                transition: "ease-in-out 400ms",
                pointerEvents: "none",
                left: `-${spacing / 2}px`,
                position: "absolute",
                background: "#00000050",
                content: "''",
                top: "50%",
                rounded: 3,
                h: `${navSize * 3}px`
            }}
        >
            s
            {positions.map((_, index) => (
                <Flex
                    position="relative"
                    zIndex={1}
                    onClick={() => handleDotClick(index)}
                    justify="space-between"
                    key={index}
                    bg="#000"
                    as="button"
                    border="none"
                    outline="none"
                    rounded={2}
                    h={`${spacing}px`}
                    w={`${spacing}px`}
                />
            ))}
        </HStack>
    );
};

export default FramedPositions;

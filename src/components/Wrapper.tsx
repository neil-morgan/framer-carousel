import React, {FC, useEffect, useRef} from "react";
import {Flex, Box} from "@chakra-ui/react";
import {WrapperProps} from "types";
import Navigator from "components/Navigator";
import {useResizeObserver} from "hooks";

const Wrapper: FC = ({
    activeItem,
    children,
    constraint,
    itemGap,
    isDisabled,
    itemWidth,
    navSize,
    navIcon,
    positions,
    setActiveItem,
    setConstraint,
    setIsDisabled,
    setItemWidth,
    setMultiplier,
    setTrackIsActive
}: WrapperProps) => {
    const wrapperRef = useRef<null | HTMLDivElement>(null);
    const {width} = useResizeObserver(wrapperRef);

    const handleFocus = () => setTrackIsActive(true);

    const handleDecrementClick = () => {
        setTrackIsActive(true);
        if (activeItem !== 0) setActiveItem((prev: number) => prev - 1);
    };

    const handleIncrementClick = () => {
        setTrackIsActive(true);
        if (activeItem !== positions.length - constraint) setActiveItem((prev: number) => prev + 1);
        // TODO: test if it works with: setActiveItem(activeItem + 1);
    };

    const handleDotClick = (index: number) => {
        setTrackIsActive(true);
        setActiveItem(
            index > positions.length - constraint ? positions.length - constraint : index
        );
    };

    useEffect(() => {
        setItemWidth(Math.round(width) / 3);
        setIsDisabled(false);
        setMultiplier(0.35);
        setConstraint(3);
        setActiveItem(0);
    }, [
        positions.length,
        setActiveItem,
        setConstraint,
        setIsDisabled,
        setItemWidth,
        setMultiplier,
        width
    ]);

    const navigatorProps = {
        activeItem,
        constraint,
        handleDecrementClick,
        handleDotClick,
        handleFocus,
        handleIncrementClick,
        isDisabled,
        itemWidth,
        navSize,
        navIcon,
        positions
    };

    return (
        <Flex direction="column" px={itemGap}>
            <Box
                {...(!isDisabled && {_active: {cursor: "grabbing"}, cursor: "grab"})}
                ref={wrapperRef}
                position="relative"
                overflow="hidden"
                w="100%"
                _before={{
                    position: "absolute",
                    pr: {base: 1, md: 3},
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    left: 0,
                    top: 0
                }}
                _after={{
                    position: "absolute",
                    pl: {base: 1, md: 3},
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    right: 0,
                    top: 0
                }}
            >
                {children}
            </Box>
            <Navigator {...navigatorProps} />
        </Flex>
    );
};

export default Wrapper;

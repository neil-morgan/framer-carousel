import React, {FC, ReactNode, useMemo, useState} from "react";
import {CoreProps} from "types";
import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Track from "components/Track";

const ChakraCarousel: FC = ({
    children,
    itemGap = 4,
    navIcon = "arrow",
    navSize = 8,
    navPosition = "bottom-center"
}: CoreProps) => {
    const [trackIsActive, setTrackIsActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [multiplier, setMultiplier] = useState(0.35);
    const [activeItem, setActiveItem] = useState(0);
    const [constraint, setConstraint] = useState(0);
    const [itemWidth, setItemWidth] = useState(3);

    const positions = useMemo(
        () => children.map((_: string, index: number) => -Math.abs(itemWidth * index)),
        [children, itemWidth]
    );

    const wrapperProps = {
        activeItem,
        children,
        constraint,
        isDisabled,
        itemGap,
        itemWidth,
        navIcon,
        navPosition,
        navSize,
        positions,
        setActiveItem,
        setConstraint,
        setIsDisabled,
        setItemWidth,
        setMultiplier,
        setTrackIsActive
    };

    const trackProps = {
        activeItem,
        constraint,
        isDisabled,
        itemWidth,
        multiplier,
        positions,
        setActiveItem,
        setTrackIsActive,
        trackIsActive
    };

    const itemProps = {
        activeItem,
        constraint,
        itemGap,
        itemWidth,
        positions,
        setActiveItem,
        setTrackIsActive,
        trackIsActive
    };

    return (
        <Wrapper {...wrapperProps}>
            <Track {...trackProps}>
                {children.map((child: ReactNode, index: number) => (
                    <Item {...itemProps} index={index} key={index}>
                        {child}
                    </Item>
                ))}
            </Track>
        </Wrapper>
    );
};

export default ChakraCarousel;

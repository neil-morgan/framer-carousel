import React, {FC, ReactNode, useMemo, useState} from "react";
import {CoreProps} from "types";
import Item from "components/Item";
import Container from "components/Container";
import Track from "components/Track";

const FramerCarousel: FC = ({
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
        <Container {...wrapperProps}>
            <Track {...trackProps}>
                {children.map((child: ReactNode, index: number) => {
                    const currentItemProps = {...itemProps, itemIndex: index};
                    return (
                        <Item {...currentItemProps} key={index}>
                            {child}
                        </Item>
                    );
                })}
            </Track>
        </Container>
    );
};

export default FramerCarousel;

import React, {FC, ReactNode, useMemo, useState} from "react";
import {CoreProps} from "types";
import Item from "components/item";
import Container from "components/container";
import Track from "components/track";

const FramerCarousel: FC = ({children, gap = 4}: CoreProps) => {
    const [currentItem, setActiveItem] = useState(0);
    const [division, setDivision] = useState(3);
    const [isActive, setIsActive] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);
    const [velocityMultiplier, setVelocityMultiplier] = useState(0.35);

    const itemPositions = useMemo(
        () => children.map((_: string, index: number) => -Math.abs(itemWidth * index)),
        [children, itemWidth]
    );

    const containerProps = {
        division,
        gap,
        itemPositions,
        setActiveItem,
        setDivision,
        setItemWidth,
        setVelocityMultiplier
    };

    const trackProps = {
        currentItem,
        division,
        itemWidth,
        velocityMultiplier,
        itemPositions,
        setActiveItem,
        setIsActive,
        isActive
    };

    const itemProps = {
        currentItem,
        division,
        gap,
        itemWidth,
        itemPositions,
        setActiveItem,
        setIsActive,
        isActive
    };

    return (
        <Container {...containerProps}>
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

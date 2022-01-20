import React, {useState, useMemo} from "react";

import Item from "./components/Item";
import Wrapper from "./components/Wrapper";
import Track from "./components/Track";

interface CarouselProps {
    children: React.ReactNode[];
    gap: number;
}

const ChakraCarousel: React.FC<CarouselProps> = ({children, gap = 4}: CarouselProps) => {
    const [trackIsActive, setTrackIsActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [multiplier, setMultiplier] = useState(0.35);
    const [activeItem, setActiveItem] = useState(0);
    const [constraint, setConstraint] = useState(0);
    const [itemWidth, setItemWidth] = useState(3);

    const itemLength = children.length;

    const positions = useMemo(
        () => children.map((_, index) => -Math.abs(itemWidth * index)),
        [children, itemWidth]
    );

    const wrapperProps = {
        activeItem,
        children,
        constraint,
        gap,
        isDisabled,
        itemLength,
        itemWidth,
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
        gap,
        itemWidth,
        positions,
        setActiveItem,
        setTrackIsActive,
        trackIsActive
    };

    return (
        <Wrapper {...wrapperProps}>
            <Track {...trackProps}>
                {children.map((child, index) => (
                    <Item {...itemProps} index={index} key={index}>
                        {child}
                    </Item>
                ))}
            </Track>
        </Wrapper>
    );
};

export default ChakraCarousel;

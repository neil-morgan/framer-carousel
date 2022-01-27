import React, {FC, ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {useResizeObserver} from "hooks";
import {CoreProps} from "types";
import Item from "components/item";
import Track from "components/track";

const FramerCarousel: FC = ({children, gap = 4}: CoreProps) => {
    const outerContainer = useRef<null | HTMLDivElement>(null);
    const innerContainer = useRef<null | HTMLDivElement>(null);

    const {width} = useResizeObserver(innerContainer);
    const [currentItem, setCurrentItem] = useState(0);
    const [division, setDivision] = useState(3);
    const [isActive, setIsActive] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);
    const [velocityMultiplier, setVelocityMultiplier] = useState(0.35);

    const itemPositions = useMemo(
        () => children.map((_: string, index: number) => -Math.abs(itemWidth * index)),
        [children, itemWidth]
    );

    useEffect(() => {
        setItemWidth(Math.round(width) / division);
        setVelocityMultiplier(0.35);
        setDivision(3);
    }, [division, itemPositions.length, setItemWidth, setVelocityMultiplier, width]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (outerContainer.current === null || undefined) return;
            setIsActive(outerContainer.current.contains(event.target as Node));
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (isActive) {
                event.preventDefault();
                //todo: see if can tidy up here
                if (
                    currentItem < itemPositions.length - division &&
                    (event.key === "ArrowRight" || event.key === "ArrowUp")
                )
                    setCurrentItem(currentItem + 1);

                if (currentItem > 0 && (event.key === "ArrowLeft" || event.key === "ArrowDown"))
                    setCurrentItem(currentItem - 1);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [currentItem, division, isActive, itemPositions.length]);

    const trackProps = {
        currentItem,
        division,
        itemWidth,
        velocityMultiplier,
        itemPositions,
        setCurrentItem,
        setIsActive,
        isActive
    };

    const itemProps = {
        currentItem,
        division,
        gap,
        itemWidth,
        itemPositions,
        setCurrentItem,
        setIsActive,
        isActive
    };

    return (
        <div
            className="container"
            ref={outerContainer}
            style={{paddingTop: `${gap / 2}px`, paddingBottom: `${gap / 2}px`}}
        >
            <div
                className="container-inner"
                ref={innerContainer}
                style={{marginLeft: `-${gap / 2}px`, width: `calc(100% + ${gap}px)`}}
            >
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
            </div>
        </div>
    );
};

export default FramerCarousel;

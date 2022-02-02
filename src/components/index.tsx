import {Item} from "components/item";
import {Track} from "components/track";
import {useResizeObserver} from "hooks";
import React, {useEffect, useMemo, useRef, useState} from "react";
import type {ReactElement, ReactNode} from "react";
import type {CoreProps} from "types";
import {getVelocityMultiplier} from "utils";

export function FramerCarousel({
    children,
    gap = 4,
    radius = 7,
    velocityMaxMultiplier = 0.35,
    velocityMaxWidth = 1200,
    velocityMinMultiplier = 0.65,
    velocityMinWidth = 600,
    responsive = {
        0: {items: 1, gap: 4},
        600: {items: 3, gap: 8}
    }
}: CoreProps): ReactElement {
    const outerContainer = useRef<HTMLDivElement | null>(null);
    const innerContainer = useRef<HTMLDivElement | null>(null);

    const {width} = useResizeObserver(innerContainer);
    const [currentItem, setCurrentItem] = useState(0);
    const [division, setDivision] = useState(3);
    const [isActive, setIsActive] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);

    // eslint-disable-next-line no-console
    console.log(responsive);

    const itemPositions = useMemo(
        () => children.map((_: string, index: number) => -Math.abs(itemWidth * index)),
        [children, itemWidth]
    );

    const velocityMultiplier = getVelocityMultiplier(
        velocityMaxMultiplier,
        velocityMaxWidth,
        velocityMinMultiplier,
        velocityMinWidth,
        width
    );

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (outerContainer.current === null) {
                return;
            }
            setIsActive(outerContainer.current.contains(event.target as Node));
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (isActive) {
                const {code} = event;

                if (
                    (code === "ArrowRight" || code === "ArrowUp" || code === "Space") &&
                    currentItem < itemPositions.length - division
                ) {
                    event.preventDefault();
                    setCurrentItem(currentItem + 1);
                }

                if ((code === "ArrowLeft" || code === "ArrowDown") && currentItem > 0) {
                    event.preventDefault();
                    setCurrentItem(currentItem - 1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [currentItem, division, isActive, itemPositions.length]);

    useEffect(() => {
        setItemWidth(Math.round(width) / division);
        setDivision(3);
    }, [division, setItemWidth, width]);

    const trackProps = {
        currentItem,
        division,
        innerContainer,
        itemPositions,
        setCurrentItem,
        velocityMultiplier
    };

    const itemProps = {
        currentItem,
        gap,
        itemWidth,
        radius,
        itemPositions,
        division,
        setCurrentItem
    };

    return (
        <div className="container" ref={outerContainer} style={{borderRadius: `${radius}px`}}>
            <div
                className="container-inner"
                ref={innerContainer}
                style={{marginLeft: `-${gap / 2}px`, width: `calc(100% + ${gap}px)`}}
            >
                <Track {...trackProps}>
                    {children.map((child: ReactNode, index: number) => {
                        const currentItemProps = {...itemProps, itemIndex: index};
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Item key={index} {...currentItemProps}>
                                {child}
                            </Item>
                        );
                    })}
                </Track>
            </div>
        </div>
    );
}

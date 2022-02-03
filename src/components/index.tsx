import {Item} from "components/item";
import {Track} from "components/track";
import {useResizeObserver} from "hooks";
import React, {useEffect, useMemo, useRef, useState} from "react";
import type {ReactElement, ReactNode} from "react";
import type {CoreProps} from "types";
import {getVelocityMultiplier} from "utils";
import {v4 as uuidv4} from "uuid";

export function FramerCarousel({
    children,
    radius = 7,
    velocityMaxMultiplier = 0.35,
    velocityMaxWidth = 1200,
    velocityMinMultiplier = 0.35,
    velocityMinWidth = 600
}: // responsive = {
//     0: {items: 1, gap: 3},
//     640: {items: 2, gap: 4},
//     768: {items: 3, gap: 5},
//     1024: {items: 4, gap: 6}
// }
CoreProps): ReactElement {
    const innerContainer = useRef<HTMLDivElement | null>(null);
    const outerContainer = useRef<HTMLDivElement | null>(null);

    const {width} = useResizeObserver(innerContainer);
    const [currentItem, setCurrentItem] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);
    const items = 2;
    const gap = 20;
    // const {items, gap} = responsive[useBreakpoints(responsive).active];

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
                    currentItem < itemPositions.length - items
                ) {
                    event.preventDefault();
                    setCurrentItem((prev) => prev + 1);
                }

                if ((code === "ArrowLeft" || code === "ArrowDown") && currentItem > 0) {
                    event.preventDefault();
                    setCurrentItem((prev) => prev - 1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [currentItem, items, isActive, itemPositions.length]);

    useEffect(() => {
        setItemWidth(Math.round(width) / items);
    }, [items, setItemWidth, width]);

    const trackProps = {
        currentItem,
        items,
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
        items,
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
                            <Item key={uuidv4()} {...currentItemProps}>
                                {child}
                            </Item>
                        );
                    })}
                </Track>
            </div>
        </div>
    );
}

import {Item} from "components/item";
import {Track} from "components/track";
import {useResizeObserver} from "hooks";
import React, {useEffect, useMemo, useRef, useState} from "react";
import type {ReactElement, ReactNode} from "react";
import type {CoreProps} from "types";
import {defaultProps, getVelocityMultiplier, getBreakpointProps} from "utils";
import {v4 as uuidv4} from "uuid";

export function FramerCarousel({
    children,
    radius = defaultProps.radius,
    velocityMaxMultiplier = defaultProps.velocityMaxMultiplier,
    velocityMaxWidth = defaultProps.velocityMaxWidth,
    velocityMinMultiplier = defaultProps.velocityMinMultiplier,
    velocityMinWidth = defaultProps.velocityMinWidth,
    responsive = defaultProps.responsive
}: CoreProps): ReactElement {
    const innerContainer = useRef<HTMLDivElement | null>(null);
    const outerContainer = useRef<HTMLDivElement | null>(null);

    const {width} = useResizeObserver(innerContainer);
    const [currentItem, setCurrentItem] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);
    const {items, gap} = responsive[getBreakpointProps(responsive).active];

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

                if (
                    (code === "ArrowLeft" || code === "ArrowDown" || code === "Backspace") &&
                    currentItem > 0
                ) {
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
        <div
            className="container"
            ref={outerContainer}
            style={{
                marginLeft: `-${gap * 0.66}px`,
                width: `calc(100% + ${gap * 2 * 0.66}px)`,
                padding: `${gap * 0.66}px`
            }}
        >
            {/* maybe another element here for radius */}
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

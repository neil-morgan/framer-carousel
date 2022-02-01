import type {PanInfo} from "framer-motion";
import {useAnimation, motion, useMotionValue} from "framer-motion";
import type {ReactElement} from "react";
import React, {useCallback, useEffect, useState} from "react";
import type {TrackProps} from "types";

export function Track({
    children,
    currentItem,
    division,
    innerContainer,
    itemPositions,
    setCurrentItem,
    velocityMultiplier
}: TrackProps): ReactElement {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);

    const updateCarouselPosition = useCallback(
        () =>
            controls.start({
                x: itemPositions[currentItem],
                transition: {
                    stiffness: 400,
                    type: "spring",
                    damping: 60,
                    mass: 3
                }
            }),
        [controls, currentItem, itemPositions]
    );

    const handleDragEnd = (_event: DragEvent, info: PanInfo) => {
        const distance = info.offset.x;
        const velocity = info.velocity.x * velocityMultiplier;

        const extrapolatedItemPosition =
            dragStartPosition +
            (velocity < 0 || distance < 0
                ? Math.min(velocity, distance)
                : Math.max(velocity, distance));

        const closestItemPosition = itemPositions.reduce(
            (prev, curr) =>
                Math.abs(curr - extrapolatedItemPosition) <
                Math.abs(prev - extrapolatedItemPosition)
                    ? curr
                    : prev,
            0
        );

        const newItemPosition =
            closestItemPosition < itemPositions[itemPositions.length - division]
                ? itemPositions.length - division
                : itemPositions.indexOf(closestItemPosition);

        if (newItemPosition === currentItem) {
            void updateCarouselPosition();
        } else {
            setCurrentItem(newItemPosition);
        }
    };

    const handleDragStart = () => {
        setDragStartPosition(itemPositions[currentItem]);
    };

    useEffect(
        () => void updateCarouselPosition(),
        [controls, currentItem, itemPositions, updateCarouselPosition]
    );

    return (
        <motion.div
            animate={controls}
            className="track"
            drag="x"
            dragConstraints={innerContainer}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            style={{x}}
        >
            {children}
        </motion.div>
    );
}

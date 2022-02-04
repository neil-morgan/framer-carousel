import type {PanInfo} from "framer-motion";
import {useAnimation, motion, useMotionValue} from "framer-motion";
import type {ReactElement} from "react";
import React, {useCallback, useEffect, useState} from "react";
import type {TrackProps} from "types";

export function Track({
    children,
    currentItem,
    items,
    innerContainer,
    itemPositions,
    setCurrentItem,
    velocityMultiplier
}: TrackProps): ReactElement {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);

    const updateCarouselPosition = useCallback(() => {
        void controls.start({
            x: itemPositions[currentItem],
            transition: {
                stiffness: 400,
                type: "spring",
                damping: 60,
                mass: 3
            }
        });
    }, [controls, currentItem, itemPositions]);

    // TODO: Refine to reduce/remove minimum drag distance needed to change current item

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
            closestItemPosition < itemPositions[itemPositions.length - items]
                ? itemPositions.length - items
                : itemPositions.indexOf(closestItemPosition);

        if (newItemPosition === currentItem) {
            updateCarouselPosition();
        } else {
            setCurrentItem(newItemPosition);
        }
    };

    const handleDragStart = () => {
        setDragStartPosition(itemPositions[currentItem]);
    };

    useEffect(() => {
        updateCarouselPosition();
    }, [updateCarouselPosition]);

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

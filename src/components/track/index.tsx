import React, {FC, useEffect, useState} from "react";
import {useAnimation, motion, useMotionValue, PanInfo} from "framer-motion";
import {TrackProps} from "types";

const Track: FC = ({
    children,
    currentItem,
    division,
    innerContainer,
    itemPositions,
    setCurrentItem,
    velocityMultiplier
}: TrackProps) => {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);

    const handleDragEnd = (_event: DragEvent, info: PanInfo) => {
        const dragDistance = info.offset.x;
        const dragVelocity = info.velocity.x * velocityMultiplier;

        const extrapolatedPosition =
            dragStartPosition +
            (dragVelocity < 0 || dragDistance < 0
                ? Math.min(dragVelocity, dragDistance)
                : Math.max(dragVelocity, dragDistance));

        const closestItemPosition = itemPositions.reduce(
            (prev, curr) =>
                Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition)
                    ? curr
                    : prev,
            0
        );

        setCurrentItem(
            closestItemPosition < itemPositions[itemPositions.length - division]
                ? itemPositions.length - division
                : itemPositions.indexOf(closestItemPosition)
        );
    };

    const handleDragStart = () => setDragStartPosition(itemPositions[currentItem]);

    useEffect(() => {
        const updateCarouselPosition = async () =>
            controls.start({
                x: itemPositions[currentItem],
                transition: {
                    damping: 60,
                    mass: 3,
                    stiffness: 400,
                    type: "spring"
                }
            });
        void updateCarouselPosition();
    }, [controls, currentItem, itemPositions]);

    return (
        <motion.div
            animate={controls}
            className="track"
            drag={"x"}
            dragConstraints={innerContainer}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            style={{x}}
        >
            {children}
        </motion.div>
    );
};

export default Track;

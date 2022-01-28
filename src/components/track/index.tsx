import React, {FC, useEffect, useState, useMemo} from "react";
import {useAnimation, motion, useMotionValue, PanInfo} from "framer-motion";
import {TrackProps} from "types";

const Track: FC = ({
    children,
    currentItem,
    division,
    itemPositions,
    itemWidth,
    setCurrentItem,
    innerContainer,
    velocityMultiplier
}: TrackProps) => {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);

    const transitionProps = useMemo(
        () => ({
            stiffness: 400,
            type: "spring",
            damping: 60,
            mass: 3
        }),
        []
    );

    const handleDragStart = () => setDragStartPosition(itemPositions[currentItem]);

    //todo: tidy this func
    const handleDragEnd = (_event: DragEvent, info: PanInfo) => {
        const distance = info.offset.x;
        const velocity = info.velocity.x * velocityMultiplier;
        const direction = velocity < 0 || distance < 0 ? 1 : -1;

        const extrapolatedPosition =
            dragStartPosition +
            (direction === 1 ? Math.min(velocity, distance) : Math.max(velocity, distance));

        const closestPosition = itemPositions.reduce(
            (prev, curr) =>
                Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition)
                    ? curr
                    : prev,
            0
        );

        //todo: look at simplifying this
        if (closestPosition < itemPositions[itemPositions.length - division]) {
            setCurrentItem(itemPositions.length - division);
            //if end of arr
            void controls.start({
                x: itemPositions[itemPositions.length - division],
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        } else {
            setCurrentItem(itemPositions.indexOf(closestPosition));
            void controls.start({
                x: closestPosition,
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        }
    };

    useEffect(() => {
        const updateCarouselPosition = async () =>
            controls.start({
                x: itemPositions[currentItem],
                transition: {
                    ...transitionProps
                }
            });
        void updateCarouselPosition();
    }, [controls, currentItem, itemPositions, transitionProps]);

    return itemWidth ? (
        <motion.div
            animate={controls}
            className="track"
            style={{x}}
            drag={"x"}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            dragConstraints={innerContainer}
        >
            {children}
        </motion.div>
    ) : (
        <></>
    );
};

export default Track;

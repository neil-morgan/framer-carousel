import React, {useCallback, FC, useEffect, useState, useRef, useMemo} from "react";
import {useAnimation, motion, useMotionValue, PanInfo} from "framer-motion";
import {TrackProps} from "types";

const Track: FC = ({
    children,
    currentItem,
    division,
    isActive,
    itemPositions,
    itemWidth,
    setActiveItem,
    setIsActive,
    velocityMultiplier
}: TrackProps) => {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const node = useRef<null | HTMLDivElement>(null);

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

    const handleDragEnd = (_event: DragEvent, info: PanInfo) => {
        const distance = info.offset.x;
        const velocity = info.velocity.x * velocityMultiplier;
        const direction = velocity < 0 || distance < 0 ? 1 : -1;

        const extrapolatedPosition =
            dragStartPosition +
            (direction === 1 ? Math.min(velocity, distance) : Math.max(velocity, distance));

        const closestPosition = itemPositions.reduce((prev, curr) => {
            return Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition)
                ? curr
                : prev;
        }, 0);

        if (closestPosition < itemPositions[itemPositions.length - division]) {
            setActiveItem(itemPositions.length - division);
            void controls.start({
                x: itemPositions[itemPositions.length - division],
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        } else {
            setActiveItem(itemPositions.indexOf(closestPosition));
            void controls.start({
                x: closestPosition,
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        }
    };

    const handleResize = useCallback(
        () =>
            controls.start({
                x: itemPositions[currentItem],
                transition: {
                    ...transitionProps
                }
            }),
        [currentItem, controls, itemPositions, transitionProps]
    );

    const handleClick = useCallback(
        (event) => {
            if (node.current === null || undefined) return;
            setIsActive(node.current.contains(event.target));
        },
        [setIsActive]
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (isActive) {
                if (
                    currentItem < itemPositions.length - division &&
                    (event.key === "ArrowRight" || event.key === "ArrowUp")
                ) {
                    event.preventDefault();
                    setActiveItem((prev) => prev + 1);
                }

                if (currentItem > 0 && (event.key === "ArrowLeft" || event.key === "ArrowDown")) {
                    event.preventDefault();
                    setActiveItem((prev) => prev - 1);
                }
            }
        },
        [setActiveItem, isActive, currentItem, division, itemPositions]
    );

    useEffect(() => {
        void handleResize();

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick, handleResize, handleKeyDown, itemPositions]);

    return itemWidth ? (
        <div ref={node}>
            <motion.div
                animate={controls}
                className="track"
                drag={"x"}
                dragConstraints={node}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                style={{x}}
            >
                {children}
            </motion.div>
        </div>
    ) : (
        <></>
    );
};

export default Track;

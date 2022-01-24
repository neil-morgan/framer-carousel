import React, {useCallback, FC, useEffect, useState, useRef, useMemo} from "react";
import {useAnimation, motion, useMotionValue, PanInfo} from "framer-motion";
import {TrackProps} from "types";

const Track: FC = ({
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    isDisabled,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    children
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

    const handleDragStart = () => setDragStartPosition(positions[activeItem]);

    const handleDragEnd = (_event: DragEvent, info: PanInfo) => {
        if (isDisabled) {
            return;
        }

        const distance = info.offset.x;
        const velocity = info.velocity.x * multiplier;
        const direction = velocity < 0 || distance < 0 ? 1 : -1;

        const extrapolatedPosition =
            dragStartPosition +
            (direction === 1 ? Math.min(velocity, distance) : Math.max(velocity, distance));

        const closestPosition = positions.reduce((prev, curr) => {
            return Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition)
                ? curr
                : prev;
        }, 0);

        if (closestPosition < positions[positions.length - constraint]) {
            setActiveItem(positions.length - constraint);
            void controls.start({
                x: positions[positions.length - constraint],
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        } else {
            setActiveItem(positions.indexOf(closestPosition));
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
                x: positions[activeItem],
                transition: {
                    ...transitionProps
                }
            }),
        [activeItem, controls, positions, transitionProps]
    );

    const handleClick = useCallback(
        (event) => {
            if (node.current === null || undefined) return;
            setTrackIsActive(node.current.contains(event.target));
        },
        [setTrackIsActive]
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (trackIsActive && !isDisabled) {
                if (
                    (activeItem < positions.length - constraint && event.key === "ArrowRight") ||
                    event.key === "ArrowUp"
                ) {
                    event.preventDefault();
                    setActiveItem((prev) => prev + 1);
                }

                if ((activeItem > 0 && event.key === "ArrowLeft") || event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveItem((prev) => prev - 1);
                }
            }
        },
        [setActiveItem, trackIsActive, isDisabled, activeItem, constraint, positions]
    );

    useEffect(() => {
        void handleResize();

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick, handleResize, handleKeyDown, positions]);

    return itemWidth ? (
        <div ref={node}>
            <motion.div
                drag={"x"}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                dragConstraints={node}
                animate={controls}
                style={{
                    x,
                    display: "flex",
                    minWidth: "min-content",
                    flexWrap: "nowrap",
                    justifyContent: "center"
                }}
            >
                {children}
            </motion.div>
        </div>
    ) : (
        <></>
    );
};

export default Track;

import React from "react";

export default interface TrackProps {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    itemPositions: number[];
    itemWidth: number;
    innerContainer: React.MutableRefObject<HTMLDivElement>;
    setCurrentItem: (item: number | ((prev: number) => number)) => void;
    velocityMultiplier: number;
}

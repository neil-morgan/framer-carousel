import React from "react";

export default interface TrackProps {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    innerContainer: React.MutableRefObject<HTMLDivElement>;
    itemPositions: number[];
    setCurrentItem: (item: number | ((prev: number) => number)) => void;
    velocityMultiplier: number;
}

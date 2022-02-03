import type {MutableRefObject} from "react";

export type TrackProps = {
    children: React.ReactNode;
    currentItem: number;
    items: number;
    innerContainer: MutableRefObject<HTMLDivElement | null>;
    itemPositions: number[];
    setCurrentItem: (item: number | ((prev: number) => number)) => void;
    velocityMultiplier: number;
};

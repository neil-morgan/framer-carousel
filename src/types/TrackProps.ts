import type {MutableRefObject} from "react";

export type TrackProps = {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    innerContainer: MutableRefObject<HTMLDivElement | null>;
    itemPositions: number[];
    setCurrentItem: (item: number | ((prev: number) => number)) => void;
    velocityMultiplier: number;
};

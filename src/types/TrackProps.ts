export default interface TrackProps {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    itemPositions: number[];
    itemWidth: number;
    setCurrentItem: (item: number | ((prev: number) => number)) => void;
    velocityMultiplier: number;
}

export default interface TrackProps {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    isActive: boolean;
    isDisabled: boolean;
    itemPositions: number[];
    itemWidth: number;
    setActiveItem: (item: number | ((prev: number) => number)) => void;
    setIsActive: (active: boolean) => void;
    velocityMultiplier: number;
}

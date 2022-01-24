export default interface TrackProps {
    setTrackIsActive: (active: boolean) => void;
    trackIsActive: boolean;
    setActiveItem: (item: number | ((prev: number) => number)) => void;
    isDisabled: boolean;
    activeItem: number;
    constraint: number;
    multiplier: number;
    itemWidth: number;
    positions: number[];
    children: React.ReactNode;
}

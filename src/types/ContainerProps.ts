export default interface WrapperProps {
    setTrackIsActive: (active: boolean) => void;
    setIsDisabled: (disabled: boolean) => void;
    setMultiplier: (multiplier: number) => void;
    setActiveItem: (item: number | ((prev: number) => number)) => void;
    setConstraint: (constraint: number) => void;
    setItemWidth: (width: number) => void;
    activeItem: number;
    constraint: number;
    itemWidth: number;
    navIcon: string;
    navSize: number;
    navPosition: string;
    positions: number[];
    children: React.ReactNode;
    itemGap: number;
}

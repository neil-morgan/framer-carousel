export default interface ItemProps {
    setTrackIsActive: (active: boolean) => void;
    setActiveItem: (item: number) => void;
    activeItem: number;
    constraint: number;
    itemWidth: number;
    positions: number[];
    children: React.ReactNode;
    itemIndex: number;
    itemGap: number;
}

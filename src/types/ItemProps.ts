export default interface ItemProps {
    setIsActive: (active: boolean) => void;
    setActiveItem: (item: number) => void;
    currentItem: number;
    division: number;
    itemWidth: number;
    itemPositions: number[];
    children: React.ReactNode;
    itemIndex: number;
    gap: number;
}

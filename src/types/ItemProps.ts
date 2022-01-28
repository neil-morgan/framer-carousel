export default interface ItemProps {
    children: React.ReactNode;
    currentItem: number;
    division: number;
    gap: number;
    itemIndex: number;
    itemPositions: number[];
    itemWidth: number;
    radius: number;
    setCurrentItem: (item: number) => void;
    setIsActive: (active: boolean) => void;
}

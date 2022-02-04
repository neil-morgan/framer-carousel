export type ItemProps = {
    children: React.ReactNode;
    currentItem: number;
    items: number;
    gap: number;
    itemIndex: number;
    itemPositions: number[];
    itemWidth: number;
    radius: number;
    setCurrentItem: (item: number) => void;
};

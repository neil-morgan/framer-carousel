export default interface WrapperProps {
    children: React.ReactNode;
    division: number;
    gap: number;
    itemPositions: number[];
    setDivision: (division: number) => void;
    setItemWidth: (width: number) => void;
    setVelocityMultiplier: (multiplier: number) => void;
}

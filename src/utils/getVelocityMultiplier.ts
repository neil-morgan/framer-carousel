export const getVelocityMultiplier = (
    maxMulti: number,
    maxWidth: number,
    minMulti: number,
    minWidth: number,
    width: number
): number => {
    if (width >= maxWidth) {
        return maxMulti;
    }

    if (width <= minWidth) {
        return minMulti;
    }

    return minMulti + ((width - minWidth) / (maxWidth - minWidth)) * (maxMulti - minMulti);
};

import {buildMediaQueries, buildBreakpoints} from "utils";

type UseBreakpointsReturn = {
    active: number;
} & {
    [K in string]: boolean | number;
};

export const useBreakpoints = (
    responsive: Record<string, Record<string, number>>
): UseBreakpointsReturn => {
    const mediaQueries = buildMediaQueries(responsive);
    const breakpoints = buildBreakpoints(mediaQueries);
    const active = Object.keys(breakpoints).find((key) => breakpoints[key] === true);
    return {
        ...breakpoints,
        active: Number(active) || 0
    };
};

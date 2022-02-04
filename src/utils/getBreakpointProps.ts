import {buildBreakpoints} from "./buildBreakpoints";
import {buildMediaQueries} from "./buildMediaQueries";

type UseBreakpointsReturn = {
    active: number;
} & {
    [K in string]: boolean | number;
};

export const getBreakpointProps = (
    responsive: Record<string, Record<string, number>>
): UseBreakpointsReturn => {
    const breakpoints = buildBreakpoints(buildMediaQueries(responsive));
    const active = Object.keys(breakpoints).find((key) => breakpoints[key]);
    return {
        ...breakpoints,
        active: Number(active) || 0
    };
};

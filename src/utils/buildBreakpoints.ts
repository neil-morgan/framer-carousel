import {useMediaQuery} from "../hooks";

type BuildBreakpointsReturn = Record<string, string | number>;

export const buildBreakpoints = (queries: Record<string, string>): BuildBreakpointsReturn => {
    let newBreakpoints = {active: 0};
    Object.keys(queries).forEach((query) => {
        newBreakpoints = {
            ...newBreakpoints,
            [query]: useMediaQuery(queries[query])
        };
    });
    return newBreakpoints;
};

import {useMediaQuery} from "hooks";

export const buildBreakpoints = (queries: object): object => {
    let newBreakpoints = {active: 0};
    Object.keys(queries).forEach((query) => {
        newBreakpoints = {
            ...newBreakpoints,
            [query]: useMediaQuery(queries[query])
        };
    });

    return newBreakpoints;
};

import {buildMediaQuery} from "./buildMediaQuery";

type BuildMediaQueriesReturn = Record<string, string>;

export const buildMediaQueries = (
    bps: Record<string, Record<string, number>>
): BuildMediaQueriesReturn => {
    // convert bps obj to arr of numbers
    const keys = Object.keys(bps).map((i) => Number(i));

    let mediaQueries = {};
    keys.forEach((bp) => {
        mediaQueries = {
            ...mediaQueries,
            [bp]: buildMediaQuery(keys, bp)
        };
    });

    return mediaQueries;
};

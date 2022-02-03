import {buildMediaQuery} from "./buildMediaQuery";

export const buildMediaQueries = (bps: object): object => {
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

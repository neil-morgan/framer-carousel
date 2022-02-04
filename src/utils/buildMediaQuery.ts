import {getNextKey, getPrevKey} from "./keys";

export const buildMediaQuery = (keys: number[], key: number): string => {
    if (key === 0) {
        if (!getPrevKey(keys, key) && !getNextKey(keys, key)) {
            return `(min-width: 0px)`;
        }

        if (!getPrevKey(keys, key)) {
            return `(max-width: ${getNextKey(keys, key)}px)`;
        }
    }

    if (!getNextKey(keys, key)) {
        return `(min-width: ${Number(key) + 1}px)`;
    }

    return `(min-width: ${Number(key) + 1}px) and (max-width: ${getNextKey(keys, key)}px)`;
};

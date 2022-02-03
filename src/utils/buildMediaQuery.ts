import {getNextKey, getPrevKey} from "./keys";

export const buildMediaQuery = (keys: number[], key: number): string => {
    if (!getPrevKey(keys, key) && key === 0) {
        return `(max-width: ${getNextKey(keys, key)}px)`;
    }

    if (!getNextKey(keys, key)) {
        return `(min-width: ${Number(key) + 1}px)`;
    }
    return `(min-width: ${Number(key) + 1}px) and (max-width: ${getNextKey(keys, key)}px)`;
};

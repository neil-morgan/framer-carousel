export const getPrevKey = (keys: number[], key: number): number => keys[keys.indexOf(key) - 1];
export const getNextKey = (keys: number[], key: number): number => keys[keys.indexOf(key) + 1];

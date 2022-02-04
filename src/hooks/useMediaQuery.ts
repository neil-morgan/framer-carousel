import {useEffect, useState} from "react";

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
    useEffect(
        () => {
            const mediaQuery = window.matchMedia(query);
            setMatches(mediaQuery.matches);
            const handler = (event: MediaQueryListEvent) => {
                setMatches(event.matches);
            };
            window.matchMedia(query).addEventListener("change", handler);

            return () => {
                mediaQuery.removeEventListener("change", handler);
            };
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // Empty array ensures effect is only run on mount and unmount
    );
    return matches;
};

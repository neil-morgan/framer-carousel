import type {RefObject} from "react";
import {useEffect, useState} from "react";
import ResizeObserver from "resize-observer-polyfill";

type BoundingRect = Omit<DOMRectReadOnly, "toJSON">;

export const useResizeObserver = <T extends HTMLElement>(target: RefObject<T>): BoundingRect => {
    const [state, setState] = useState<BoundingRect>({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0
    });

    useEffect(() => {
        if (!target.current) {
            return;
        }
        const observer = new ResizeObserver(([entry]: ResizeObserverEntry[]) => {
            setState(entry.contentRect);
        });
        observer.observe(target.current);
        return () => {
            observer.disconnect();
        };
    }, [target]);

    return state;
};

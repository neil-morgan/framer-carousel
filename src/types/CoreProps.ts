import type {ReactNode} from "react";

export type CoreProps = {
    children: ReactNode[];
    gap?: number;
    radius?: number;
    responsive?: object;
    velocityMaxMultiplier: number;
    velocityMaxWidth: number;
    velocityMinMultiplier: number;
    velocityMinWidth: number;
};

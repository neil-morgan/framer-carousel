import type {ReactNode} from "react";

export type CoreProps = {
    children: ReactNode[];
    gap?: number;
    radius?: number;
    responsive?: Record<string, Record<string, number>>;
    velocityMaxMultiplier: number;
    velocityMaxWidth: number;
    velocityMinMultiplier: number;
    velocityMinWidth: number;
};

import type {ReactNode} from "react";

export type CoreProps = {
    children: ReactNode[];
    gap?: number;
    radius?: number;
    velocityMaxMultiplier: number;
    velocityMaxWidth: number;
    velocityMinMultiplier: number;
    velocityMinWidth: number;
};

import {ReactNode} from "react";

export default interface CoreProps {
    children: ReactNode[];
    itemGap?: number;
    navIcon?: string;
    navPosition?: string;
    navSize?: number;
}

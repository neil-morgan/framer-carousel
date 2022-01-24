import React, {FC, useEffect, useRef} from "react";
import {useResizeObserver} from "hooks";
import {ContainerProps} from "types";

const Container: FC = ({
    children,
    itemGap,
    positions,
    setActiveItem,
    setConstraint,
    setIsDisabled,
    setItemWidth,
    setMultiplier
}: ContainerProps) => {
    const ContainerRef = useRef<null | HTMLDivElement>(null);
    const {width} = useResizeObserver(ContainerRef);

    useEffect(() => {
        setItemWidth(Math.round(width) / 3);
        setIsDisabled(false);
        setMultiplier(0.35);
        setConstraint(3);
        setActiveItem(0);
    }, [
        positions.length,
        setActiveItem,
        setConstraint,
        setIsDisabled,
        setItemWidth,
        setMultiplier,
        width
    ]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: `${itemGap}px`,
                paddingRight: `${itemGap}px`
            }}
        >
            <div
                ref={ContainerRef}
                style={{position: "relative", overflow: "hidden", width: "100%"}}
            >
                {children}
            </div>
        </div>
    );
};

export default Container;

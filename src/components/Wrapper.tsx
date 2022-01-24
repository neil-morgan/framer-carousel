import React, {FC, useEffect, useRef} from "react";
import {WrapperProps} from "types";
import {useResizeObserver} from "hooks";

const Wrapper: FC = ({
    children,
    itemGap,
    isDisabled,
    positions,
    setActiveItem,
    setConstraint,
    setIsDisabled,
    setItemWidth,
    setMultiplier
}: WrapperProps) => {
    const wrapperRef = useRef<null | HTMLDivElement>(null);
    const {width} = useResizeObserver(wrapperRef);

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
                {...(!isDisabled && {_active: {cursor: "grabbing"}, cursor: "grab"})}
                ref={wrapperRef}
                style={{position: "relative", overflow: "hidden", width: "100%"}}
            >
                {children}
            </div>
        </div>
    );
};

export default Wrapper;

import React, {FC, useEffect, useRef} from "react";
import {useResizeObserver} from "hooks";
import {ContainerProps} from "types";

const Container: FC = ({
    children,
    division,
    gap,
    itemPositions,
    setDivision,
    setItemWidth,
    setVelocityMultiplier
}: ContainerProps) => {
    const ref = useRef<null | HTMLDivElement>(null);
    const {width} = useResizeObserver(ref);

    useEffect(() => {
        setItemWidth(Math.round(width) / division);
        setDivision(3);
        setVelocityMultiplier(0.35);
    }, [division, itemPositions.length, setDivision, setItemWidth, setVelocityMultiplier, width]);

    return (
        <div
            className="container"
            style={{
                paddingTop: `${gap / 2}px`,
                paddingBottom: `${gap / 2}px`
            }}
        >
            <div
                className="container-inner"
                ref={ref}
                style={{
                    marginLeft: `-${gap / 2}px`,
                    width: `calc(100% + ${gap}px)`
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Container;

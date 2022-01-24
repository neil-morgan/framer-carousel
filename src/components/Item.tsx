import React, {FC, useState} from "react";
import {ItemProps} from "types";

const Item: FC = ({
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    children,
    itemIndex,
    itemGap
}: ItemProps) => {
    const [userDidTab, setUserDidTab] = useState(false);
    const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => setTrackIsActive(true);

    const handleBlur: React.FocusEventHandler<HTMLDivElement> = () => {
        if (userDidTab && itemIndex + 1 === positions.length) setTrackIsActive(false);
        setUserDidTab(false);
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) =>
        event.key === "Tab" &&
        activeItem !== positions.length - constraint &&
        setActiveItem(itemIndex);

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) =>
        event.key === "Tab" && setUserDidTab(true);

    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
            style={{width: `${itemWidth}px`}}
        >
            <div style={{flex: 1, paddingLeft: `${itemGap}px`, paddingRight: `${itemGap}px`}}>
                {children}
            </div>
        </div>
    );
};

export default Item;

import React, {FC, FocusEventHandler, KeyboardEventHandler, useState} from "react";
import {ItemProps} from "types";

const Item: FC = ({
    setIsActive,
    setCurrentItem,
    currentItem,
    division,
    itemWidth,
    itemPositions,
    children,
    itemIndex,
    gap
}: ItemProps) => {
    const [userDidTab, setUserDidTab] = useState(false);

    //todo: tidy up
    const handleFocus: FocusEventHandler<HTMLDivElement> = () => setIsActive(true);

    const handleBlur: FocusEventHandler<HTMLDivElement> = () => {
        if (userDidTab && itemIndex + 1 === itemPositions.length) setIsActive(false);
        setUserDidTab(false);
    };

    const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) =>
        event.key === "Tab" &&
        currentItem !== itemPositions.length - division &&
        setCurrentItem(itemIndex);

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === "Tab") setUserDidTab(true);
    };

    return (
        <div
            className="item"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            role="button"
            style={{
                width: `${itemWidth}px`
            }}
            tabIndex={0}
        >
            <div
                className="item-inner"
                style={{
                    paddingLeft: `${gap / 2}px`,
                    paddingRight: `${gap / 2}px`
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Item;

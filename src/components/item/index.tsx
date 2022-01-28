import React, {FC, useRef, useEffect} from "react";
import {ItemProps} from "types";

const Item: FC = ({
    children,
    currentItem,
    setCurrentItem,
    gap,
    itemIndex,
    itemWidth,
    setIsActive,
    radius
}: ItemProps) => {
    const currentItemRef = useRef<null | HTMLDivElement>(null);

    const handleFocus = () => {
        setIsActive(true);
        if (itemIndex === 0) setCurrentItem(0);
    };

    useEffect(() => {
        if (currentItem === itemIndex) currentItemRef?.current?.focus();
    }, [currentItem, itemIndex]);

    return (
        <div
            className="item"
            ref={currentItemRef}
            onFocus={handleFocus}
            role="button"
            style={{
                width: `${itemWidth}px`,
                paddingLeft: `${gap / 2}px`,
                paddingRight: `${gap / 2}px`
            }}
            tabIndex={0}
        >
            <div className="item-inner" style={{borderRadius: `${radius}px`}}>
                {children}
            </div>
        </div>
    );
};

export default Item;

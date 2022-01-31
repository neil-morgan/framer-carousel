import React, {FC, KeyboardEventHandler, useRef, useEffect} from "react";
import {ItemProps} from "types";

const Item: FC = ({
    children,
    currentItem,
    gap,
    itemIndex,
    itemWidth,
    radius,
    itemPositions,
    division,
    setCurrentItem
}: ItemProps) => {
    const currentItemRef = useRef<null | HTMLDivElement>(null);

    const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === "Tab") {
            if (currentItem < itemPositions.length - division) {
                setCurrentItem(itemIndex);
            }
            if (itemIndex === 0) {
                setCurrentItem(0);
            }
        }
    };

    useEffect(() => {
        if (currentItem === itemIndex) currentItemRef?.current?.focus();
    }, [currentItem, itemIndex]);

    return (
        <div
            id={itemIndex.toString()}
            className="item"
            ref={currentItemRef}
            onKeyUp={handleKeyUp}
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

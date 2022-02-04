import type {ReactElement, KeyboardEventHandler} from "react";
import React, {useRef} from "react";
import type {ItemProps} from "types";

export function Item({
    children,
    currentItem,
    gap,
    itemIndex,
    itemWidth,
    itemPositions,
    items,
    setCurrentItem
}: ItemProps): ReactElement {
    const currentItemRef = useRef<null | HTMLDivElement>(null);

    const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === "Tab") {
            if (currentItem < itemPositions.length - items) {
                setCurrentItem(itemIndex);
            }
            if (itemIndex === 0) {
                setCurrentItem(0);
            }
        }
    };

    // !BAD
    // useEffect(() => {
    //     if (currentItem === itemIndex) {
    //         currentItemRef.current?.focus();
    //     }
    // }, [currentItem, itemIndex]);

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
            <div className="item-inner">{children}</div>
        </div>
    );
}

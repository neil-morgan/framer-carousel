import React, {useState} from "react";

interface ItemProps {
    setTrackIsActive: (active: boolean) => void;
    setActiveItem: (item: number) => void;
    activeItem: number;
    constraint: number;
    itemWidth: number;
    positions: number[];
    children: React.ReactNode;
    index: number;
    itemGap: number;
}

const Item: React.FC<ItemProps> = ({
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    children,
    index,
    itemGap
}: ItemProps) => {
    const [userDidTab, setUserDidTab] = useState(false);
    const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => setTrackIsActive(true);

    const handleBlur: React.FocusEventHandler<HTMLDivElement> = () => {
        if (userDidTab && index + 1 === positions.length) setTrackIsActive(false);
        setUserDidTab(false);
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) =>
        event.key === "Tab" && activeItem !== positions.length - constraint && setActiveItem(index);

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) =>
        event.key === "Tab" && setUserDidTab(true);

    return (
        <div
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

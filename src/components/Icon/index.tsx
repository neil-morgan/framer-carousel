import React from "react";
import {chakra} from "@chakra-ui/react";

interface IconProps {
    style: string;
}

const paths = {
    "arrow-left":
        "M16.05,9.4H5.3989l5.0254-5.0254a.6.6,0,0,0-.8486-.8486l-6.0495,6.05a.602.602,0,0,0,0,.8492l6.05,6.049a.6.6,0,1,0,.8486-.8476L5.3989,10.6H16.05a.6.6,0,0,0,0-1.2Z",
    "arrow-right":
        "M16.6032,10.2292a.6023.6023,0,0,0-.13-.6539L10.4243,3.5259a.6.6,0,0,0-.8486.8486L14.6011,9.4H3.95a.6.6,0,1,0,0,1.2H14.6011L9.5757,15.626a.6.6,0,0,0,.8486.8476l6.0489-6.0489A.5994.5994,0,0,0,16.6032,10.2292Z",
    "chevron-left":
        "M12.5254,16.6494a.5975.5975,0,0,1-.4238-.1758L6.0508,10.4243a.6.6,0,0,1,0-.8486l6.0508-6.05a.6.6,0,0,1,.8476.8486L7.3237,10l5.6255,5.626a.6.6,0,0,1-.4238,1.0234Z",
    "chevron-right":
        "M7.4751,16.6494a.6.6,0,0,1-.4243-1.0234L12.6768,10,7.0508,4.3745a.6.6,0,1,1,.8486-.8486l6.05,6.05a.6.6,0,0,1,0,.8486l-6.05,6.0493A.5986.5986,0,0,1,7.4751,16.6494Z"
};

const Icon: React.FC<IconProps> = ({style}: IconProps) => (
    <chakra.svg
        display="block"
        fill="currentColor"
        height="1em"
        lineHeight="1em"
        viewBox="0 0 20 20"
        width="1em"
    >
        <path d={paths[style]} />
    </chakra.svg>
);

export default Icon;

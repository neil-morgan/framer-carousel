import React, {useEffect, useRef} from "react";
import {Box} from "@chakra-ui/react";

export type Props = {
    test?: object;
};

const ChakraCarousel: React.FC<Props> = ({test = {}}) => {
    const wrapperRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (wrapperRef.current === null || undefined) return;
        console.log(wrapperRef.current.offsetWidth);
    }, []);

    return (
        <Box w="full" {...test} ref={wrapperRef}>
            test
        </Box>
    );
};

export default ChakraCarousel;

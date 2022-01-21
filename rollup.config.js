import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const config = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
            strict: false
        }
    ],
    plugins: typescript({objectHashIgnoreUnknownHack: false}),
    external: [
        "react",
        "react-dom",
        "@chakra-ui/react",
        "@emotion/react",
        "@emotion/styled",
        "framer-motion",
        "resize-observer-polyfill"
    ]
};

export default config;

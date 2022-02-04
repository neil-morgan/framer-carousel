import sass from "rollup-plugin-sass";
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
    plugins: [sass({insert: true}), typescript({objectHashIgnoreUnknownHack: false})],
    external: ["react", "react-dom", "framer-motion", "resize-observer-polyfill", "uuid"]
};

// eslint-disable-next-line import/no-default-export
export default config;

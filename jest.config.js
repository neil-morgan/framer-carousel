/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ["./src/utils/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
    coverageDirectory: "./coverage",
    coverageReporters: ["text", "text-summary", "lcov"],
    coverageThreshold: {
        global: {
            lines: 90
        }
    }
};

import {buildMediaQuery, buildMediaQueries, getVelocityMultiplier} from ".";

const velocityMaxMultiplier = 0.35;
const velocityMaxWidth = 1200;
const velocityMinMultiplier = 0.65;
const velocityMinWidth = 600;

describe("getVelocityMultiplier func", () => {
    it("should return 0.35 if passed 1200", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                1200
            )
        ).toBe(0.35);
    });

    it("should return 0.35 if passed 1201", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                1201
            )
        ).toBe(0.35);
    });

    it("should return 0.5 if passed 900", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                900
            )
        ).toBe(0.5);
    });

    it("should return 0.65 if passed 600", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                600
            )
        ).toBe(0.65);
    });

    it("should return 0.65 if passed 599", () => {
        expect(
            getVelocityMultiplier(
                velocityMaxMultiplier,
                velocityMaxWidth,
                velocityMinMultiplier,
                velocityMinWidth,
                599
            )
        ).toBe(0.65);
    });
});

describe("buildMediaQuery func", () => {
    it("should return min: 0 if passed 0 with array length 1", () => {
        expect(buildMediaQuery([0], 0)).toBe("(min-width: 0px)");
    });

    it("should return max: 640 if passed 0 with array length 2", () => {
        expect(buildMediaQuery([0, 640], 0)).toBe("(max-width: 640px)");
    });

    it("should return min: 641 if passed 640 with array length 2", () => {
        expect(buildMediaQuery([0, 640], 640)).toBe("(min-width: 641px)");
    });

    it("should return max: 640 if passed 0 with array length 3", () => {
        expect(buildMediaQuery([0, 640, 960], 0)).toBe("(max-width: 640px)");
    });

    it("should return min: 641, max: 960 if passed 640 with array length 3", () => {
        expect(buildMediaQuery([0, 640, 960], 640)).toBe(
            "(min-width: 641px) and (max-width: 960px)"
        );
    });

    it("should return min: 961 if passed 960", () => {
        expect(buildMediaQuery([0, 640, 960], 960)).toBe("(min-width: 961px)");
    });
});

describe("buildMediaQueries func", () => {
    it("should return correct query if passed object of length 1", () => {
        expect(
            buildMediaQueries({
                "0": {}
            })
        ).toStrictEqual({
            "0": "(min-width: 0px)"
        });
    });

    it("should return correct queries if passed object of length 2", () => {
        expect(
            buildMediaQueries({
                "0": {},
                "640": {}
            })
        ).toStrictEqual({
            "0": "(max-width: 640px)",
            "640": "(min-width: 641px)"
        });
    });

    it("should return correct queries if passed object of length 3", () => {
        expect(
            buildMediaQueries({
                "0": {},
                "640": {},
                "960": {}
            })
        ).toStrictEqual({
            "0": "(max-width: 640px)",
            "640": "(min-width: 641px) and (max-width: 960px)",
            "960": "(min-width: 961px)"
        });
    });
});

// describe("buildBreakpoints func", () => {
//     it("should return correct breakpoints object", () => {
//         expect(
//             buildBreakpoints({
//                 "0": "(max-width: 640px)",
//                 "640": "(min-width: 641px) and (max-width: 960px)",
//                 "960": "(min-width: 961px)"
//             })
//         ).toBe({
//             "0": false,
//             "640": false,
//             "960": true,
//             active: 960
//         });
//     });
// });
